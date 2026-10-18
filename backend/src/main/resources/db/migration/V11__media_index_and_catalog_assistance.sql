CREATE TABLE uploaded_media_assets (
 id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
 user_id integer NOT NULL REFERENCES users(id),
 url text NOT NULL UNIQUE CHECK(url LIKE 'https://%'),
 fingerprint char(64) NOT NULL,
 perceptual_hash bit(64) NOT NULL,
 average_red smallint NOT NULL CHECK(average_red BETWEEN 0 AND 255),
 average_green smallint NOT NULL CHECK(average_green BETWEEN 0 AND 255),
 average_blue smallint NOT NULL CHECK(average_blue BETWEEN 0 AND 255),
 width integer NOT NULL CHECK(width>0),
 height integer NOT NULL CHECK(height>0),
 created_at timestamp without time zone NOT NULL DEFAULT(now() AT TIME ZONE 'UTC')
);
CREATE INDEX idx_media_owner_time ON uploaded_media_assets(user_id,created_at DESC);
CREATE TABLE image_searches (
 id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
 user_id integer NOT NULL REFERENCES users(id),
 fingerprint char(64) NOT NULL,
 match_count integer NOT NULL CHECK(match_count>=0),
 created_at timestamp without time zone NOT NULL DEFAULT(now() AT TIME ZONE 'UTC')
);
CREATE INDEX idx_image_search_owner_time ON image_searches(user_id,created_at DESC);
CREATE TABLE catalog_assistance (
 id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
 user_id integer NOT NULL REFERENCES users(id),
 request_key varchar(36) NOT NULL,
 question text NOT NULL CHECK(length(question) BETWEEN 1 AND 1000),
 catalog_query text NOT NULL,
 product_ids jsonb NOT NULL CHECK(jsonb_typeof(product_ids)='array'),
 response text NOT NULL,
 created_at timestamp without time zone NOT NULL DEFAULT(now() AT TIME ZONE 'UTC'),
 UNIQUE(user_id,request_key)
);
