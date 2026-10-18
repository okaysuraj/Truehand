-- These timestamps describe events observed by this application; no historical publication date is inferred.
ALTER TABLE products ADD COLUMN catalog_announced_at timestamp;
CREATE INDEX idx_products_announced ON products(catalog_announced_at,id) WHERE catalog_announced_at IS NOT NULL;
ALTER TABLE notification_preferences ADD COLUMN catalog_updates_since timestamp;
ALTER TABLE notifications ADD COLUMN event_key varchar(200);
CREATE UNIQUE INDEX idx_notifications_event ON notifications(user_id,event_key);
ALTER TABLE product_alerts ADD COLUMN activation_version bigint NOT NULL DEFAULT 1 CHECK (activation_version>0);
