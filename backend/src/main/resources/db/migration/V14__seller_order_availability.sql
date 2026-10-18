CREATE TABLE seller_settings (
 user_id integer PRIMARY KEY REFERENCES users(id),
 accepting_orders boolean NOT NULL DEFAULT true,
 accepting_commissions boolean NOT NULL DEFAULT true,
 availability_notice varchar(2000),
 updated_at timestamp NOT NULL DEFAULT (now() AT TIME ZONE 'UTC')
);
CREATE UNIQUE INDEX uq_platform_settings_singleton ON platform_settings((true));
