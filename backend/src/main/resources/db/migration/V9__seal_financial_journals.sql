-- A posted journal may only receive entries in the transaction that creates it.
-- Balanced late inserts could otherwise alter a previously reconciled journal.
ALTER TABLE financial_journals ADD COLUMN creation_transaction xid8 NOT NULL DEFAULT pg_current_xact_id();
CREATE FUNCTION prevent_late_financial_entry() RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
 IF NOT EXISTS(SELECT 1 FROM financial_journals WHERE id=NEW.journal_id AND creation_transaction=pg_current_xact_id()) THEN
  RAISE EXCEPTION 'Posted financial journals are sealed; post a new journal';
 END IF;
 RETURN NEW;
END $$;
CREATE TRIGGER sealed_financial_entry BEFORE INSERT ON financial_entries FOR EACH ROW EXECUTE FUNCTION prevent_late_financial_entry();
