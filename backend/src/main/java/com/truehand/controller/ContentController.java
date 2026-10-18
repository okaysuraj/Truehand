package com.truehand.controller;

import com.truehand.service.MarketplaceFeatureService;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class ContentController {

    private final MarketplaceFeatureService features;
    private final JdbcTemplate jdbc;

    @GetMapping("/community/content/{slug}")
    public Object content(@PathVariable String slug) {
        return features.query(
            "select slug,title,body,version,updated_at from content_pages where slug=? and status='PUBLISHED'",
            slug
        );
    }

    @GetMapping("/admin/content")
    public Object all() {
        features.admin();
        return features.query("select * from content_pages order by slug limit 200");
    }

    @PostMapping("/admin/content")
    @Transactional
    public Object save(@RequestBody Map<String, Object> body) {
        features.admin();
        String slug = features.text(body, "slug", 100),
            state = features.text(body, "status", 20);
        if (
            !slug.matches("[a-z0-9-]+") || !java.util.Set.of("DRAFT", "PUBLISHED").contains(state)
        ) throw new IllegalArgumentException("Invalid content slug or status");
        var result = features.one(
            "insert into content_pages(slug,title,body,status,edited_by) values(?,?,?,?,?) on conflict(slug) do update set title=excluded.title,body=excluded.body,status=excluded.status,edited_by=excluded.edited_by,version=content_pages.version+1,updated_at=now() at time zone 'UTC' returning *",
            slug,
            features.text(body, "title", 200),
            features.text(body, "body", 100000),
            state,
            features.userId()
        );
        features.audit("SAVE", "CONTENT", slug, Map.of("version", result.get("version")));
        return result;
    }

    @GetMapping("/seller/studio")
    public Object studio() {
        return features.query("select * from seller_studios where seller_id=?", features.userId());
    }

    @PostMapping("/seller/studio")
    public Object studio(@RequestBody Map<String, Object> body) {
        return features.one(
            "insert into seller_studios(seller_id,street_address,city,state,postal_code,pickup_instructions) values(?,?,?,?,?,?) on conflict(seller_id) do update set street_address=excluded.street_address,city=excluded.city,state=excluded.state,postal_code=excluded.postal_code,pickup_instructions=excluded.pickup_instructions,updated_at=now() at time zone 'UTC' returning *",
            features.userId(),
            features.text(body, "streetAddress", 255),
            features.text(body, "city", 100),
            features.text(body, "state", 100),
            features.text(body, "postalCode", 6),
            body.getOrDefault("pickupInstructions", "")
        );
    }

    @GetMapping("/admin/subscription-plans")
    public Object plans() {
        features.admin();
        return features.query("select * from seller_subscription_plans order by id");
    }

    @PostMapping("/admin/subscription-plans")
    public Object plan(@RequestBody Map<String, Object> body) {
        features.admin();
        int days = features.integer(body, "durationDays");
        if (days > 366) throw new IllegalArgumentException("Duration cannot exceed 366 days");
        return features.one(
            "insert into seller_subscription_plans(name,amount,duration_days,description,active) values(?,?,?,?,?) returning *",
            features.text(body, "name", 100),
            features.amount(body, "amount"),
            days,
            features.text(body, "description", 10000),
            Boolean.TRUE.equals(body.get("active"))
        );
    }

    @GetMapping("/sellers/plans")
    public Object publicPlans() {
        return features.query(
            "select id,name,amount,duration_days,description from seller_subscription_plans where active=true order by id"
        );
    }

    @GetMapping("/products/sponsored")
    public Object sponsored() {
        return features.query(
            "select p.id,p.name,p.description,p.image_url,p.price,p.stock_quantity,c.starts_at,c.ends_at from product_campaigns c join products p on p.id=c.product_id where c.active=true and c.starts_at<=now() at time zone 'UTC' and c.ends_at>now() at time zone 'UTC' and p.approval_status='APPROVED' and p.is_available=true and (p.seller_id is null or exists(select 1 from users u where u.id=p.seller_id and u.is_active=true)) order by c.id desc limit 100"
        );
    }

    @GetMapping("/admin/product-campaigns")
    public Object campaigns() {
        features.admin();
        return features.query(
            "select c.id,p.name,c.product_id,c.starts_at,c.ends_at,c.payment_reference,c.active from product_campaigns c join products p on p.id=c.product_id order by c.id desc limit 200"
        );
    }

    @PostMapping("/admin/product-campaigns")
    public Object campaign(@RequestBody Map<String, Object> body) {
        features.admin();
        return features.one(
            "insert into product_campaigns(product_id,starts_at,ends_at,payment_reference,approved_by,active) values(?,?::timestamp,?::timestamp,?,?,?) returning *",
            features.integer(body, "productId"),
            features.text(body, "startsAt", 30),
            features.text(body, "endsAt", 30),
            features.text(body, "paymentReference", 100),
            features.userId(),
            Boolean.TRUE.equals(body.get("active"))
        );
    }
}
