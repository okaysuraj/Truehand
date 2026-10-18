CREATE TABLE product_import_jobs (
 id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
 seller_id integer NOT NULL REFERENCES users(id),
 request_key varchar(36) NOT NULL,
 file_sha256 char(64) NOT NULL,
 created_product_ids jsonb NOT NULL CHECK(jsonb_typeof(created_product_ids)='array'),
 created_at timestamp without time zone NOT NULL DEFAULT(now() AT TIME ZONE 'UTC'),
 UNIQUE(seller_id,request_key)
);
