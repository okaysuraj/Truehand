ALTER TABLE addresses ADD COLUMN latitude numeric(10,7) CHECK(latitude BETWEEN -90 AND 90);
ALTER TABLE addresses ADD COLUMN longitude numeric(10,7) CHECK(longitude BETWEEN -180 AND 180);
ALTER TABLE addresses ADD CONSTRAINT ck_address_coordinates CHECK((latitude IS NULL)=(longitude IS NULL));
CREATE TABLE delivery_messages (
 id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
 order_id integer NOT NULL REFERENCES orders(id),
 author_id integer NOT NULL REFERENCES users(id),
 body text NOT NULL CHECK(length(body) BETWEEN 1 AND 2000),
 created_at timestamp without time zone NOT NULL DEFAULT (now() AT TIME ZONE 'UTC')
);
CREATE INDEX idx_delivery_message_order ON delivery_messages(order_id,id DESC);
CREATE TABLE order_events (
 id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
 order_id integer NOT NULL REFERENCES orders(id),
 event_key varchar(150) NOT NULL,
 status varchar(50) NOT NULL,
 message text NOT NULL,
 created_at timestamp without time zone NOT NULL DEFAULT (now() AT TIME ZONE 'UTC'),
 UNIQUE(order_id,event_key)
);
CREATE INDEX idx_order_event_history ON order_events(order_id,id);
CREATE TABLE delivery_route_stops (
 route_id integer NOT NULL REFERENCES delivery_routes(id),
 order_id integer NOT NULL REFERENCES orders(id),
 position integer NOT NULL CHECK(position>=0),
 PRIMARY KEY(route_id,order_id),
 UNIQUE(route_id,position)
);
