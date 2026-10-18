ALTER TABLE order_items ADD COLUMN cancelled_before_shipment_quantity integer NOT NULL DEFAULT 0
 CHECK (cancelled_before_shipment_quantity>=0 AND cancelled_before_shipment_quantity<=quantity);
CREATE OR REPLACE FUNCTION guard_return_quantity() RETURNS trigger LANGUAGE plpgsql AS $$
DECLARE expected integer; received integer;
BEGIN
 SELECT quantity-cancelled_before_shipment_quantity INTO expected FROM order_items WHERE id=NEW.order_item_id FOR UPDATE;
 SELECT coalesce(sum(quantity),0) INTO received FROM return_receipts WHERE order_item_id=NEW.order_item_id;
 IF received+NEW.quantity>expected THEN RAISE EXCEPTION 'Return exceeds shipped purchased quantity'; END IF;
 RETURN NEW;
END $$;
CREATE FUNCTION guard_cancelled_quantity() RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
 IF NEW.cancelled_before_shipment_quantity+coalesce((SELECT sum(quantity) FROM return_receipts WHERE order_item_id=NEW.id),0)>NEW.quantity THEN
  RAISE EXCEPTION 'Cancelled and physically returned quantities exceed purchased quantity';
 END IF;
 RETURN NEW;
END $$;
CREATE TRIGGER enforce_cancelled_quantity BEFORE UPDATE OF quantity,cancelled_before_shipment_quantity ON order_items FOR EACH ROW EXECUTE FUNCTION guard_cancelled_quantity();
