CREATE TABLE notification_preferences (
    user_id integer PRIMARY KEY REFERENCES users(id),
    preferences jsonb NOT NULL,
    updated_at timestamp without time zone NOT NULL DEFAULT (now() AT TIME ZONE 'UTC'),
    CONSTRAINT notification_preferences_object CHECK (jsonb_typeof(preferences) = 'object')
);
CREATE TABLE device_tokens (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id integer NOT NULL REFERENCES users(id),
    token text NOT NULL UNIQUE,
    platform varchar(10) NOT NULL CHECK (platform IN ('ANDROID','IOS','WEB')),
    updated_at timestamp without time zone NOT NULL DEFAULT (now() AT TIME ZONE 'UTC')
);
CREATE TABLE browsing_history (
    user_id integer NOT NULL REFERENCES users(id),
    product_id integer NOT NULL REFERENCES products(id),
    viewed_at timestamp without time zone NOT NULL DEFAULT (now() AT TIME ZONE 'UTC'),
    PRIMARY KEY (user_id, product_id)
);
CREATE INDEX idx_history_user_time ON browsing_history(user_id, viewed_at DESC);
CREATE TABLE product_alerts (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id integer NOT NULL REFERENCES users(id),
    product_id integer NOT NULL REFERENCES products(id),
    type varchar(10) NOT NULL CHECK (type IN ('PRICE','STOCK')),
    threshold numeric(19,2),
    active boolean NOT NULL DEFAULT true,
    created_at timestamp without time zone NOT NULL DEFAULT (now() AT TIME ZONE 'UTC'),
    UNIQUE (user_id, product_id, type),
    CHECK ((type = 'PRICE' AND threshold > 0) OR (type = 'STOCK' AND threshold IS NULL))
);
CREATE INDEX idx_alerts_active_product ON product_alerts(product_id) WHERE active;
CREATE TABLE customer_collections (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id integer NOT NULL REFERENCES users(id),
    name varchar(100) NOT NULL CHECK (length(trim(name)) > 0),
    created_at timestamp without time zone NOT NULL DEFAULT (now() AT TIME ZONE 'UTC'),
    UNIQUE(user_id, name)
);
CREATE TABLE collection_products (
    collection_id bigint NOT NULL REFERENCES customer_collections(id) ON DELETE CASCADE,
    product_id integer NOT NULL REFERENCES products(id),
    PRIMARY KEY(collection_id, product_id)
);
CREATE TABLE saved_products (
    user_id integer NOT NULL REFERENCES users(id),
    product_id integer NOT NULL REFERENCES products(id),
    saved_at timestamp without time zone NOT NULL DEFAULT (now() AT TIME ZONE 'UTC'),
    PRIMARY KEY(user_id, product_id)
);
CREATE TABLE comparison_products (
    user_id integer NOT NULL REFERENCES users(id),
    product_id integer NOT NULL REFERENCES products(id),
    PRIMARY KEY(user_id, product_id)
);
CREATE TABLE product_media (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    product_id integer NOT NULL REFERENCES products(id),
    image_url text NOT NULL CHECK (image_url LIKE 'https://%'),
    position integer NOT NULL CHECK (position >= 0),
    UNIQUE(product_id, position)
);
CREATE TABLE banners (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title varchar(200) NOT NULL CHECK (length(trim(title)) > 0),
    image_url text NOT NULL CHECK (image_url LIKE 'https://%'),
    target_path text NOT NULL CHECK (target_path LIKE '/%' AND target_path NOT LIKE '//%'),
    active boolean NOT NULL DEFAULT false,
    position integer NOT NULL DEFAULT 0 CHECK (position >= 0),
    created_at timestamp without time zone NOT NULL DEFAULT (now() AT TIME ZONE 'UTC')
);
CREATE TABLE support_messages (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    request_id integer NOT NULL REFERENCES support_requests(id),
    author_id integer NOT NULL REFERENCES users(id),
    body text NOT NULL CHECK (length(trim(body)) BETWEEN 1 AND 10000),
    attachment_url text CHECK (attachment_url IS NULL OR attachment_url LIKE 'https://%'),
    created_at timestamp without time zone NOT NULL DEFAULT (now() AT TIME ZONE 'UTC')
);
CREATE INDEX idx_support_messages_request ON support_messages(request_id, id);
CREATE TABLE commission_requests (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id integer NOT NULL REFERENCES users(id),
    seller_id integer NOT NULL REFERENCES users(id),
    subject varchar(200) NOT NULL CHECK (length(trim(subject)) > 0),
    description text NOT NULL CHECK (length(trim(description)) BETWEEN 1 AND 10000),
    budget numeric(19,2) NOT NULL CHECK (budget > 0),
    quoted_amount numeric(19,2) CHECK (quoted_amount > 0),
    status varchar(20) NOT NULL DEFAULT 'REQUESTED' CHECK (status IN ('REQUESTED','QUOTED','ACCEPTED','DECLINED','CANCELED','COMPLETED')),
    created_at timestamp without time zone NOT NULL DEFAULT (now() AT TIME ZONE 'UTC'),
    updated_at timestamp without time zone NOT NULL DEFAULT (now() AT TIME ZONE 'UTC'),
    CHECK (user_id <> seller_id)
);
CREATE INDEX idx_commissions_customer ON commission_requests(user_id, id DESC);
CREATE INDEX idx_commissions_seller ON commission_requests(seller_id, id DESC);
CREATE TABLE post_likes (
    post_id integer NOT NULL REFERENCES artisan_posts(id),
    user_id integer NOT NULL REFERENCES users(id),
    PRIMARY KEY(post_id, user_id)
);
CREATE TABLE post_comments (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    post_id integer NOT NULL REFERENCES artisan_posts(id),
    user_id integer NOT NULL REFERENCES users(id),
    body text NOT NULL CHECK (length(trim(body)) BETWEEN 1 AND 2000),
    created_at timestamp without time zone NOT NULL DEFAULT (now() AT TIME ZONE 'UTC')
);
CREATE INDEX idx_comments_post ON post_comments(post_id, id);
CREATE TABLE admin_audit_events (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    actor_id integer NOT NULL REFERENCES users(id),
    action varchar(100) NOT NULL,
    resource_type varchar(100) NOT NULL,
    resource_id varchar(100) NOT NULL,
    details jsonb NOT NULL DEFAULT '{}',
    created_at timestamp without time zone NOT NULL DEFAULT (now() AT TIME ZONE 'UTC')
);
CREATE INDEX idx_admin_audit_time ON admin_audit_events(created_at DESC, id DESC);
CREATE TABLE commission_rates (
    category_id integer PRIMARY KEY REFERENCES categories(id),
    percentage numeric(5,2) NOT NULL CHECK (percentage BETWEEN 0 AND 100),
    updated_at timestamp without time zone NOT NULL DEFAULT (now() AT TIME ZONE 'UTC')
);
