ALTER TABLE promo_codes ADD COLUMN seller_id integer REFERENCES users(id);
ALTER TABLE promo_codes ADD COLUMN minimum_subtotal numeric(19,2) NOT NULL DEFAULT 0 CHECK (minimum_subtotal >= 0);
ALTER TABLE promo_codes ADD COLUMN maximum_uses integer CHECK (maximum_uses > 0);
ALTER TABLE promo_codes ADD COLUMN maximum_uses_per_customer integer CHECK (maximum_uses_per_customer > 0);
ALTER TABLE promo_codes ADD COLUMN valid_from timestamp;
ALTER TABLE promo_codes ADD CONSTRAINT ck_promo_window CHECK (valid_from IS NULL OR valid_from < valid_until);
CREATE INDEX idx_promo_owner ON promo_codes(seller_id,id);
ALTER TABLE order_items ADD COLUMN discount_amount numeric(19,2) NOT NULL DEFAULT 0;
ALTER TABLE order_items ADD CONSTRAINT ck_order_line_discount CHECK (discount_amount >= 0 AND discount_amount <= price_at_purchase * quantity);
CREATE TABLE promo_redemptions (
 id bigserial PRIMARY KEY,
 promo_id integer NOT NULL REFERENCES promo_codes(id),
 order_id integer NOT NULL UNIQUE REFERENCES orders(id),
 user_id integer NOT NULL REFERENCES users(id),
 discount_amount numeric(19,2) NOT NULL CHECK (discount_amount > 0),
 status varchar(16) NOT NULL DEFAULT 'RESERVED' CHECK (status IN ('RESERVED','PAID','CANCELED','REFUNDED')),
 created_at timestamp NOT NULL DEFAULT (now() AT TIME ZONE 'UTC'),
 updated_at timestamp NOT NULL DEFAULT (now() AT TIME ZONE 'UTC')
);
CREATE INDEX idx_promo_redemptions_usage ON promo_redemptions(promo_id,user_id,status);
