CREATE TABLE delivery_exceptions (
 id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
 order_id integer NOT NULL REFERENCES orders(id),
 reported_by integer NOT NULL REFERENCES users(id),
 reason varchar(40) NOT NULL CHECK(reason IN ('RECIPIENT_UNAVAILABLE','INCORRECT_ADDRESS','ACCESS_BLOCKED','DAMAGED_ITEM','VEHICLE_ISSUE','OTHER')),
 details text NOT NULL CHECK(length(details) BETWEEN 1 AND 2000),
 image_url text CHECK(image_url IS NULL OR image_url LIKE 'https://%'),
 status varchar(20) NOT NULL DEFAULT 'OPEN' CHECK(status IN ('OPEN','RESOLVED')),
 resolution text,
 resolved_by integer REFERENCES users(id),
 created_at timestamp without time zone NOT NULL DEFAULT(now() AT TIME ZONE 'UTC'),
 resolved_at timestamp without time zone,
 CHECK((status='OPEN' AND resolution IS NULL AND resolved_by IS NULL AND resolved_at IS NULL) OR (status='RESOLVED' AND resolution IS NOT NULL AND resolved_by IS NOT NULL AND resolved_at IS NOT NULL))
);
CREATE INDEX idx_delivery_exception_owner ON delivery_exceptions(reported_by,id DESC);
CREATE INDEX idx_delivery_exception_queue ON delivery_exceptions(status,id);
