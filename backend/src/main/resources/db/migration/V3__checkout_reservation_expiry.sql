-- Payment intent cancellation/reconciliation must succeed before releasing inventory.
ALTER TABLE orders ADD COLUMN payment_expires_at timestamp(6) without time zone;
CREATE INDEX idx_unpaid_checkout_expiry ON orders (payment_expires_at, id)
    WHERE status = 'PENDING' AND payment_status = 'PENDING';
