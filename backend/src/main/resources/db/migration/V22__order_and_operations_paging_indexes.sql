-- Stable pages need a tie-breaker when many rows share a creation timestamp.
CREATE INDEX idx_orders_owner_history ON orders(user_id,created_at DESC,id DESC);
CREATE INDEX idx_orders_admin_history ON orders(created_at DESC,id DESC);
CREATE INDEX idx_order_items_seller_history ON order_items(seller_id_snapshot,order_id,id DESC);
CREATE INDEX idx_users_registration_history ON users(created_at DESC,id DESC);
CREATE INDEX idx_users_role_history ON users(role,created_at DESC,id DESC);
CREATE INDEX idx_seller_kyc_queue ON seller_profiles(kyc_status,id DESC);
CREATE INDEX idx_delivery_kyc_queue ON delivery_personnel(kyc_status,id DESC);
CREATE INDEX idx_payout_admin_history ON payout_requests(requested_at DESC,id DESC);
CREATE INDEX idx_support_dispute_queue ON support_requests(type,id DESC);
