CREATE TABLE content_pages (
 slug varchar(100) PRIMARY KEY CHECK(slug ~ '^[a-z0-9-]+$'),
 title varchar(200) NOT NULL,
 body text NOT NULL CHECK(length(body) BETWEEN 1 AND 100000),
 status varchar(20) NOT NULL CHECK(status IN ('DRAFT','PUBLISHED')),
 version integer NOT NULL DEFAULT 1 CHECK(version>0),
 edited_by integer NOT NULL REFERENCES users(id),
 updated_at timestamp without time zone NOT NULL DEFAULT (now() AT TIME ZONE 'UTC')
);
CREATE TABLE seller_subscription_plans (
 id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
 name varchar(100) NOT NULL UNIQUE,
 amount numeric(19,2) NOT NULL CHECK(amount>0),
 duration_days integer NOT NULL CHECK(duration_days BETWEEN 1 AND 366),
 description text NOT NULL,
 active boolean NOT NULL DEFAULT false,
 created_at timestamp without time zone NOT NULL DEFAULT (now() AT TIME ZONE 'UTC')
);
CREATE TABLE subscription_purchases (
 id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
 seller_id integer NOT NULL REFERENCES users(id),
 plan_id integer NOT NULL REFERENCES seller_subscription_plans(id),
 plan_name varchar(100) NOT NULL,
 amount numeric(19,2) NOT NULL CHECK(amount>0),
 duration_days integer NOT NULL CHECK(duration_days BETWEEN 1 AND 366),
 checkout_key varchar(100) NOT NULL,
 provider_session_id varchar(100) UNIQUE,
 provider_payment_id varchar(100) UNIQUE,
 status varchar(25) NOT NULL CHECK(status IN ('CREATED','PAID','EXPIRED')),
 created_at timestamp without time zone NOT NULL DEFAULT (now() AT TIME ZONE 'UTC'),
 paid_at timestamp without time zone,
 UNIQUE(seller_id,checkout_key)
);
CREATE TABLE seller_studios (
 seller_id integer PRIMARY KEY REFERENCES users(id),
 street_address varchar(255) NOT NULL,
 city varchar(100) NOT NULL,
 state varchar(100) NOT NULL,
 postal_code varchar(6) NOT NULL CHECK(postal_code ~ '^[1-9][0-9]{5}$'),
 latitude numeric(10,7) CHECK(latitude BETWEEN -90 AND 90),
 longitude numeric(10,7) CHECK(longitude BETWEEN -180 AND 180),
 pickup_instructions text,
 CHECK((latitude IS NULL)=(longitude IS NULL)),
 updated_at timestamp without time zone NOT NULL DEFAULT (now() AT TIME ZONE 'UTC')
);
CREATE TABLE product_campaigns (
 id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
 product_id integer NOT NULL REFERENCES products(id),
 starts_at timestamp without time zone NOT NULL,
 ends_at timestamp without time zone NOT NULL CHECK(ends_at>starts_at),
 payment_reference varchar(100) NOT NULL,
 approved_by integer NOT NULL REFERENCES users(id),
 active boolean NOT NULL DEFAULT false
);
