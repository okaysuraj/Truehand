ALTER TABLE product_variants ADD COLUMN is_active boolean NOT NULL DEFAULT true;
ALTER TABLE product_variants ADD CONSTRAINT uq_variant_product_id UNIQUE(product_id,id);
ALTER TABLE cart_items ADD COLUMN variant_id integer;
ALTER TABLE order_items ADD COLUMN variant_id integer;
ALTER TABLE order_items ADD COLUMN variant_sku_snapshot varchar(255);
ALTER TABLE order_items ADD COLUMN variant_description_snapshot varchar(255);
ALTER TABLE cart_items ADD CONSTRAINT fk_cart_variant FOREIGN KEY(product_id,variant_id) REFERENCES product_variants(product_id,id);
ALTER TABLE order_items ADD CONSTRAINT fk_order_variant FOREIGN KEY(product_id,variant_id) REFERENCES product_variants(product_id,id);
DROP INDEX uq_cart_product;
CREATE UNIQUE INDEX uq_cart_base_product ON cart_items(cart_id,product_id) WHERE variant_id IS NULL;
CREATE UNIQUE INDEX uq_cart_variant ON cart_items(cart_id,variant_id) WHERE variant_id IS NOT NULL;
CREATE TABLE order_fulfillments (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    order_id integer NOT NULL REFERENCES orders(id),
    seller_id integer NOT NULL REFERENCES users(id),
    status varchar(25) NOT NULL DEFAULT 'CONFIRMED' CHECK(status IN ('CONFIRMED','PROCESSING','SHIPPED','DELIVERED','CANCELED')),
    shipped_at timestamp without time zone,
    created_at timestamp without time zone NOT NULL DEFAULT (now() AT TIME ZONE 'UTC'),
    UNIQUE(order_id,seller_id)
);
CREATE INDEX idx_fulfillments_seller_status ON order_fulfillments(seller_id,status,id DESC);
CREATE TABLE fulfillment_checks (
    fulfillment_id bigint NOT NULL REFERENCES order_fulfillments(id),
    check_key varchar(30) NOT NULL CHECK(check_key IN ('PRODUCT','PACKAGING','ADDRESS','LABEL')),
    checked_by integer NOT NULL REFERENCES users(id),
    checked_at timestamp without time zone NOT NULL DEFAULT (now() AT TIME ZONE 'UTC'),
    PRIMARY KEY(fulfillment_id,check_key)
);
CREATE TABLE delivery_evidence (
    delivery_id integer PRIMARY KEY REFERENCES deliveries(id),
    uploaded_by integer NOT NULL REFERENCES users(id),
    image_url text NOT NULL CHECK(image_url LIKE 'https://%'),
    recipient_name varchar(100) NOT NULL,
    notes text,
    captured_at timestamp without time zone NOT NULL DEFAULT (now() AT TIME ZONE 'UTC')
);
