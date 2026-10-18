CREATE TABLE tax_documents (
 id bigserial PRIMARY KEY,
 order_id integer NOT NULL REFERENCES orders(id),
 seller_id integer NOT NULL REFERENCES users(id),
 invoice_number varchar(100) NOT NULL,
 invoice_date date NOT NULL,
 supplier_gstin varchar(15) NOT NULL,
 taxable_amount numeric(19,2) NOT NULL CHECK (taxable_amount >= 0),
 igst numeric(19,2) NOT NULL CHECK (igst >= 0),
 cgst numeric(19,2) NOT NULL CHECK (cgst >= 0),
 sgst numeric(19,2) NOT NULL CHECK (sgst >= 0),
 total_amount numeric(19,2) NOT NULL CHECK (total_amount > 0 AND total_amount=taxable_amount+igst+cgst+sgst),
 document_url text NOT NULL CHECK (document_url LIKE 'https://%'),
 recorded_by integer NOT NULL REFERENCES users(id),
 created_at timestamp NOT NULL DEFAULT (now() AT TIME ZONE 'UTC'),
 UNIQUE(seller_id,invoice_number), UNIQUE(order_id,seller_id),
 CHECK (igst=0 OR (cgst=0 AND sgst=0))
);
CREATE INDEX idx_tax_documents_order ON tax_documents(order_id);
CREATE TABLE return_receipts (
 id bigserial PRIMARY KEY,
 order_item_id integer NOT NULL REFERENCES order_items(id),
 quantity integer NOT NULL CHECK (quantity > 0),
 disposition varchar(20) NOT NULL CHECK (disposition IN ('RESTOCKED','DAMAGED','QUARANTINED')),
 receipt_reference varchar(100) NOT NULL,
 condition_notes varchar(2000) NOT NULL,
 image_url text CHECK (image_url IS NULL OR image_url LIKE 'https://%'),
 received_by integer NOT NULL REFERENCES users(id),
 received_at timestamp NOT NULL DEFAULT (now() AT TIME ZONE 'UTC'),
 UNIQUE(order_item_id,receipt_reference)
);
CREATE FUNCTION guard_return_quantity() RETURNS trigger LANGUAGE plpgsql AS $$
DECLARE bought integer; received integer;
BEGIN
 SELECT quantity INTO bought FROM order_items WHERE id=NEW.order_item_id FOR UPDATE;
 SELECT coalesce(sum(quantity),0) INTO received FROM return_receipts WHERE order_item_id=NEW.order_item_id;
 IF received+NEW.quantity>bought THEN RAISE EXCEPTION 'Received return quantity exceeds purchased quantity'; END IF;
 RETURN NEW;
END $$;
CREATE TRIGGER enforce_return_quantity BEFORE INSERT ON return_receipts FOR EACH ROW EXECUTE FUNCTION guard_return_quantity();

CREATE FUNCTION prevent_receipt_mutation() RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN RAISE EXCEPTION 'Recorded return receipts are immutable'; END $$;
CREATE TRIGGER immutable_return_receipts BEFORE UPDATE OR DELETE ON return_receipts FOR EACH ROW EXECUTE FUNCTION prevent_receipt_mutation();
