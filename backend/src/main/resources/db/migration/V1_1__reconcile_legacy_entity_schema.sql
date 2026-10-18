-- Existing Hibernate-managed databases can be baselined at V1 only after review.
-- They predate these V1 columns. Reconcile them before V2 references the columns.
-- Fresh databases already have them; preserve existing rows and column values.
ALTER TABLE addresses ADD COLUMN IF NOT EXISTS full_name varchar(255);
ALTER TABLE addresses ADD COLUMN IF NOT EXISTS phone varchar(255);

ALTER TABLE deliveries ADD COLUMN IF NOT EXISTS otp_hash varchar(255);
ALTER TABLE deliveries ADD COLUMN IF NOT EXISTS otp_issued_at timestamp(6) without time zone;
ALTER TABLE deliveries ADD COLUMN IF NOT EXISTS otp_expires_at timestamp(6) without time zone;
ALTER TABLE deliveries ADD COLUMN IF NOT EXISTS otp_attempts integer;
ALTER TABLE deliveries ADD COLUMN IF NOT EXISTS otp_verified_at timestamp(6) without time zone;

ALTER TABLE orders ADD COLUMN IF NOT EXISTS delivery_address_snapshot text;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS payment_intent_id varchar(255) UNIQUE;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS checkout_key varchar(255) UNIQUE;

ALTER TABLE order_items ADD COLUMN IF NOT EXISTS product_name_snapshot varchar(255);
ALTER TABLE order_items ADD COLUMN IF NOT EXISTS image_url_snapshot text;

ALTER TABLE payout_requests ADD COLUMN IF NOT EXISTS bank_account_id integer;
ALTER TABLE payout_requests ADD COLUMN IF NOT EXISTS request_key varchar(255) UNIQUE;

ALTER TABLE products ADD COLUMN IF NOT EXISTS sale_price numeric(19,2);
ALTER TABLE products ADD COLUMN IF NOT EXISTS sale_starts_at timestamp(6) without time zone;
ALTER TABLE products ADD COLUMN IF NOT EXISTS sale_ends_at timestamp(6) without time zone;

ALTER TABLE support_requests ADD COLUMN IF NOT EXISTS description text;
ALTER TABLE support_requests ADD COLUMN IF NOT EXISTS order_id integer;
ALTER TABLE users ADD COLUMN IF NOT EXISTS bio text;
