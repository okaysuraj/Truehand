CREATE INDEX idx_notifications_owned_paging ON notifications(user_id,created_at DESC,id DESC);
CREATE INDEX idx_products_seller_paging ON products(seller_id,id);
CREATE INDEX idx_products_moderation_paging ON products(approval_status,id);

UPDATE products p SET
    review_count=(SELECT count(*) FROM reviews r WHERE r.product_id=p.id),
    average_rating=COALESCE((SELECT avg(r.rating)::double precision FROM reviews r WHERE r.product_id=p.id),0);

-- Serialize ratings for each product, including moves, before changing a review.
CREATE FUNCTION lock_review_products() RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
    IF TG_OP='INSERT' THEN
        PERFORM id FROM products WHERE id=NEW.product_id FOR UPDATE;
    ELSIF TG_OP='DELETE' THEN
        PERFORM id FROM products WHERE id=OLD.product_id FOR UPDATE;
    ELSE
        PERFORM id FROM products WHERE id IN(OLD.product_id,NEW.product_id) ORDER BY id FOR UPDATE;
    END IF;
    IF TG_OP='DELETE' THEN RETURN OLD; END IF;
    RETURN NEW;
END;
$$;
CREATE FUNCTION refresh_review_aggregates() RETURNS trigger LANGUAGE plpgsql AS $$
DECLARE changed_id integer;
BEGIN
    IF TG_OP='DELETE' THEN changed_id=OLD.product_id; ELSE changed_id=NEW.product_id; END IF;
    UPDATE products p SET review_count=(SELECT count(*) FROM reviews r WHERE r.product_id=changed_id),
        average_rating=COALESCE((SELECT avg(r.rating)::double precision FROM reviews r WHERE r.product_id=changed_id),0)
        WHERE p.id=changed_id;
    IF TG_OP='UPDATE' AND OLD.product_id IS DISTINCT FROM NEW.product_id THEN
        UPDATE products p SET review_count=(SELECT count(*) FROM reviews r WHERE r.product_id=OLD.product_id),
            average_rating=COALESCE((SELECT avg(r.rating)::double precision FROM reviews r WHERE r.product_id=OLD.product_id),0)
            WHERE p.id=OLD.product_id;
    END IF;
    RETURN NULL;
END;
$$;
CREATE TRIGGER review_product_lock BEFORE INSERT OR UPDATE OR DELETE ON reviews FOR EACH ROW EXECUTE FUNCTION lock_review_products();
CREATE TRIGGER review_product_aggregate AFTER INSERT OR UPDATE OR DELETE ON reviews FOR EACH ROW EXECUTE FUNCTION refresh_review_aggregates();
