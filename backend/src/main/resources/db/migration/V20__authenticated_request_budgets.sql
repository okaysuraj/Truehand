CREATE TABLE api_rate_windows (
    user_id integer NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    bucket varchar(20) NOT NULL CHECK(bucket IN('GENERAL','MEDIA','PAYMENTS')),
    attempts integer NOT NULL CHECK(attempts>0),
    window_started_at timestamp without time zone NOT NULL DEFAULT (clock_timestamp() AT TIME ZONE 'UTC'),
    PRIMARY KEY(user_id,bucket)
);
