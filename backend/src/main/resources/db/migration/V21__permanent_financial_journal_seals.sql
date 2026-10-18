-- Transaction IDs are cluster-local and may be reused after a logical restore.
-- Persist the posted state so restoring a journal cannot make it writable again.
ALTER TABLE financial_journals ADD COLUMN sealed boolean NOT NULL DEFAULT true;
ALTER TABLE financial_journals ALTER COLUMN sealed SET DEFAULT false;

CREATE FUNCTION protect_financial_journal() RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
 IF TG_OP='UPDATE' THEN
  IF NOT OLD.sealed AND NEW.sealed
     AND OLD.creation_transaction=pg_current_xact_id()
     AND (to_jsonb(NEW)-'sealed')=(to_jsonb(OLD)-'sealed') THEN
   RETURN NEW;
  END IF;
 END IF;
 RAISE EXCEPTION 'Financial records are immutable; post a reversal';
END $$;
DROP TRIGGER immutable_journal ON financial_journals;
CREATE TRIGGER immutable_journal BEFORE UPDATE OR DELETE ON financial_journals
 FOR EACH ROW EXECUTE FUNCTION protect_financial_journal();

CREATE OR REPLACE FUNCTION prevent_late_financial_entry() RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
 IF NOT EXISTS(SELECT 1 FROM financial_journals
   WHERE id=NEW.journal_id AND NOT sealed AND creation_transaction=pg_current_xact_id()) THEN
  RAISE EXCEPTION 'Posted financial journals are sealed; post a new journal';
 END IF;
 RETURN NEW;
END $$;

CREATE FUNCTION seal_financial_journal() RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
 IF NOT EXISTS(SELECT 1 FROM financial_entries WHERE journal_id=NEW.id)
    OR (SELECT sum(debit-credit) FROM financial_entries WHERE journal_id=NEW.id)<>0 THEN
  RAISE EXCEPTION 'Financial journal must contain balanced entries';
 END IF;
 UPDATE financial_journals SET sealed=true WHERE id=NEW.id AND NOT sealed;
 RETURN NULL;
END $$;
CREATE CONSTRAINT TRIGGER journal_seal AFTER INSERT ON financial_journals
 DEFERRABLE INITIALLY DEFERRED FOR EACH ROW EXECUTE FUNCTION seal_financial_journal();
