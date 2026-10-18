ALTER TABLE bank_accounts ADD COLUMN encrypted_account_number text;
ALTER TABLE bank_accounts ADD COLUMN verification_reference varchar(100);
ALTER TABLE bank_accounts ADD COLUMN verified_by integer REFERENCES users(id);
ALTER TABLE bank_accounts ADD COLUMN verified_at timestamp without time zone;
ALTER TABLE payout_requests ADD COLUMN transfer_reference varchar(100);
ALTER TABLE payout_requests ADD COLUMN transfer_receipt_url text;
ALTER TABLE payout_requests ADD COLUMN settled_by integer REFERENCES users(id);
ALTER TABLE payout_requests ADD COLUMN settled_at timestamp without time zone;
CREATE UNIQUE INDEX uq_payout_transfer_reference ON payout_requests(transfer_reference) WHERE transfer_reference IS NOT NULL;
CREATE TABLE financial_journals (
 id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
 event_key varchar(150) NOT NULL UNIQUE,
 description text NOT NULL,
 created_at timestamp without time zone NOT NULL DEFAULT (now() AT TIME ZONE 'UTC')
);
CREATE TABLE financial_entries (
 id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
 journal_id bigint NOT NULL REFERENCES financial_journals(id),
 account varchar(100) NOT NULL,
 debit numeric(19,2) NOT NULL DEFAULT 0 CHECK(debit>=0),
 credit numeric(19,2) NOT NULL DEFAULT 0 CHECK(credit>=0),
 CHECK((debit>0 AND credit=0) OR (credit>0 AND debit=0))
);
CREATE INDEX idx_financial_account ON financial_entries(account,journal_id);
CREATE FUNCTION check_journal_balanced() RETURNS trigger LANGUAGE plpgsql AS $$
DECLARE target bigint;
BEGIN
 IF TG_TABLE_NAME='financial_journals' THEN target := NEW.id;
 ELSE target := NEW.journal_id;
 END IF;
 IF NOT EXISTS(SELECT 1 FROM financial_entries WHERE journal_id=target) OR (SELECT sum(debit-credit) FROM financial_entries WHERE journal_id=target)<>0 THEN
  RAISE EXCEPTION 'Financial journal must contain balanced entries';
 END IF;
 RETURN NULL;
END $$;
CREATE CONSTRAINT TRIGGER journal_balance AFTER INSERT ON financial_journals DEFERRABLE INITIALLY DEFERRED FOR EACH ROW EXECUTE FUNCTION check_journal_balanced();
CREATE CONSTRAINT TRIGGER entry_balance AFTER INSERT ON financial_entries DEFERRABLE INITIALLY DEFERRED FOR EACH ROW EXECUTE FUNCTION check_journal_balanced();
CREATE FUNCTION prevent_financial_mutation() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN RAISE EXCEPTION 'Financial records are immutable; post a reversal'; END $$;
CREATE TRIGGER immutable_journal BEFORE UPDATE OR DELETE ON financial_journals FOR EACH ROW EXECUTE FUNCTION prevent_financial_mutation();
CREATE TRIGGER immutable_entry BEFORE UPDATE OR DELETE ON financial_entries FOR EACH ROW EXECUTE FUNCTION prevent_financial_mutation();
ALTER TABLE order_items ADD COLUMN seller_id_snapshot integer REFERENCES users(id);
ALTER TABLE order_items ADD COLUMN seller_net_amount numeric(19,2) CHECK(seller_net_amount>=0);
ALTER TABLE order_items ADD COLUMN commission_amount numeric(19,2) CHECK(commission_amount>=0);
CREATE TABLE order_settlements (
 order_id integer PRIMARY KEY REFERENCES orders(id),
 journal_id bigint NOT NULL REFERENCES financial_journals(id),
 settled_at timestamp without time zone NOT NULL DEFAULT (now() AT TIME ZONE 'UTC')
);
CREATE TABLE seller_debts (
 user_id integer PRIMARY KEY REFERENCES users(id),
 amount numeric(19,2) NOT NULL CHECK(amount>=0),
 updated_at timestamp without time zone NOT NULL DEFAULT (now() AT TIME ZONE 'UTC')
);
CREATE TABLE refund_requests (
 id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
 order_id integer NOT NULL UNIQUE REFERENCES orders(id),
 user_id integer NOT NULL REFERENCES users(id),
 reason text NOT NULL CHECK(length(reason) BETWEEN 1 AND 2000),
 amount numeric(19,2) NOT NULL CHECK(amount>0),
 status varchar(25) NOT NULL CHECK(status IN ('REQUESTED','PROCESSING','SUCCEEDED','FAILED','REJECTED')),
 provider_reference varchar(100) UNIQUE,
 reviewed_by integer REFERENCES users(id),
 review_note text,
 created_at timestamp without time zone NOT NULL DEFAULT (now() AT TIME ZONE 'UTC'),
 updated_at timestamp without time zone NOT NULL DEFAULT (now() AT TIME ZONE 'UTC')
);
CREATE INDEX idx_refunds_state ON refund_requests(status,id);
ALTER TABLE seller_profiles ALTER COLUMN bank_account_number TYPE text;
ALTER TABLE seller_profiles ALTER COLUMN pan_number TYPE text;
