ALTER TABLE device_tokens ADD COLUMN provider varchar(12) NOT NULL DEFAULT 'EXPO' CHECK (provider IN ('EXPO','FIREBASE'));
ALTER TABLE device_tokens ADD COLUMN active boolean NOT NULL DEFAULT true;
CREATE TABLE notification_dispatches (
 id bigserial PRIMARY KEY,
 event_key varchar(200) NOT NULL,
 user_id integer NOT NULL REFERENCES users(id),
 channel varchar(10) NOT NULL CHECK (channel IN ('EMAIL','PUSH')),
 device_id bigint REFERENCES device_tokens(id),
 recipient_key varchar(100) NOT NULL,
 category varchar(40),
 mandatory boolean NOT NULL DEFAULT false,
 encrypted_payload text NOT NULL,
 status varchar(24) NOT NULL DEFAULT 'QUEUED' CHECK (status IN ('QUEUED','SENDING','TICKETED','PROVIDER_ACCEPTED','FAILED','CANCELED','EXPIRED')),
 attempts integer NOT NULL DEFAULT 0 CHECK (attempts >= 0),
 next_attempt_at timestamp NOT NULL DEFAULT (now() AT TIME ZONE 'UTC'),
 lease_until timestamp,
 lease_token uuid,
 lease_previous_status varchar(24),
 expires_at timestamp,
 provider_reference varchar(250),
 last_error varchar(200),
 created_at timestamp NOT NULL DEFAULT (now() AT TIME ZONE 'UTC'),
 updated_at timestamp NOT NULL DEFAULT (now() AT TIME ZONE 'UTC'),
 UNIQUE(event_key,user_id,channel,recipient_key),
 CHECK ((channel='EMAIL' AND device_id IS NULL) OR (channel='PUSH' AND device_id IS NOT NULL))
);
CREATE INDEX idx_dispatch_due ON notification_dispatches(next_attempt_at,id) WHERE status IN ('QUEUED','TICKETED','SENDING');
CREATE INDEX idx_dispatch_user ON notification_dispatches(user_id,id DESC);
