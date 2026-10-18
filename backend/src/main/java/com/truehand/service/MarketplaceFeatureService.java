package com.truehand.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.truehand.security.AccessPolicy;
import java.math.BigDecimal;
import java.util.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

/** Account collections, community workflows, and shared record access for marketplace features. */
@Service
@Transactional
@RequiredArgsConstructor
public class MarketplaceFeatureService {

    private final JdbcTemplate jdbc;
    private final AccessPolicy access;
    private final ProductService products;
    private final ObjectMapper mapper;
    private final CommercePolicyService policies;
    private final NotificationDispatchService dispatches;

    public Integer userId() {
        return access.currentUser().getId();
    }

    public void admin() {
        if (!"ADMIN".equals(access.currentUser().getRole())) throw new ResponseStatusException(
            HttpStatus.FORBIDDEN,
            "Administrator access required"
        );
    }

    @Transactional(readOnly = true)
    public org.springframework.data.domain.Page<Map<String, Object>> page(
        String selection,
        String from,
        String order,
        org.springframework.data.domain.Pageable pageable,
        Object... args
    ) {
        // SQL fragments come only from server-owned queries; values remain bound parameters.
        var bounded = com.truehand.controller.PagedResponses.bounded(pageable);
        long total = jdbc.queryForObject("select count(*) " + from, Long.class, args);
        var parameters = new ArrayList<Object>(Arrays.asList(args));
        parameters.add(bounded.getPageSize());
        parameters.add(bounded.getOffset());
        var rows = query(
            "select " + selection + " " + from + " order by " + order + " limit ? offset ?",
            parameters.toArray()
        );
        return new org.springframework.data.domain.PageImpl<>(rows, bounded, total);
    }

    public List<Map<String, Object>> query(String sql, Object... args) {
        return jdbc.query(
            sql,
            (rs, index) -> {
                var row = new LinkedHashMap<String, Object>();
                var metadata = rs.getMetaData();
                for (int column = 1; column <= metadata.getColumnCount(); column++) {
                    String key = metadata.getColumnLabel(column);
                    String[] words = key.split("_");
                    StringBuilder name = new StringBuilder(words[0]);
                    for (int word = 1; word < words.length; word++) name.append(
                        Character.toUpperCase(words[word].charAt(0))
                    ).append(words[word].substring(1));
                    Object value = rs.getObject(column);
                    if (value instanceof java.sql.Timestamp time) value = time.toLocalDateTime();
                    row.put(name.toString(), value);
                }
                return row;
            },
            args
        );
    }

    public Map<String, Object> one(String sql, Object... args) {
        return query(sql, args)
            .stream()
            .findFirst()
            .orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND, "Record not found")
            );
    }

    public String text(Map<String, ?> body, String field, int maximum) {
        Object raw = body.get(field);
        if (
            !(raw instanceof String value) || value.trim().isEmpty() || value.length() > maximum
        ) throw new IllegalArgumentException("Valid " + field + " is required");
        return value.trim();
    }

    public Integer integer(Map<String, ?> body, String field) {
        try {
            var value = new BigDecimal(String.valueOf(body.get(field)));
            int result = value.intValueExact();
            if (result < 1) throw new ArithmeticException();
            return result;
        } catch (Exception failure) {
            throw new IllegalArgumentException("Valid " + field + " is required");
        }
    }

    public BigDecimal amount(Map<String, ?> body, String field) {
        try {
            var result = new BigDecimal(String.valueOf(body.get(field)));
            if (
                result.signum() <= 0 || result.scale() > 2 || result.precision() > 15
            ) throw new ArithmeticException();
            return result;
        } catch (Exception failure) {
            throw new IllegalArgumentException("Valid " + field + " is required");
        }
    }

    public String https(String value) {
        try {
            var uri = java.net.URI.create(value);
            if (
                !"https".equals(uri.getScheme()) ||
                uri.getHost() == null ||
                uri.getUserInfo() != null
            ) throw new IllegalArgumentException();
            return value;
        } catch (Exception failure) {
            throw new IllegalArgumentException("An HTTPS URL is required");
        }
    }

    private void lockUser() {
        one("select id from users where id=? for no key update", userId());
    }

    public void publicProduct(int id) {
        var product = products.getProduct(id);
        if (
            !"APPROVED".equals(product.getStatus()) ||
            !Boolean.TRUE.equals(product.getIsAvailable())
        ) throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Product not found");
    }

    public void audit(String action, String resource, Object id, Object details) {
        try {
            jdbc.update(
                "insert into admin_audit_events(actor_id,action,resource_type,resource_id,details) values (?,?,?,?,cast(? as jsonb))",
                userId(),
                action,
                resource,
                String.valueOf(id),
                mapper.writeValueAsString(details)
            );
        } catch (com.fasterxml.jackson.core.JsonProcessingException failure) {
            throw new IllegalArgumentException("Invalid audit details");
        }
    }

    public Map<String, Map<String, Boolean>> preferences(int id) {
        access.requireOwner(id);
        var rows = query(
            "select preferences::text as preferences,catalog_updates_since from notification_preferences where user_id=?",
            id
        );
        if (rows.isEmpty()) {
            var defaults = new LinkedHashMap<String, Map<String, Boolean>>();
            for (String category : List.of("orderUpdates", "promotions", "messages", "newArrivals"))
                defaults.put(category, Map.of("email", false, "push", false, "sms", false));
            return savePreferences(id, defaults);
        }
        try {
            Map<String, Map<String, Boolean>> saved = mapper.readValue(
                (String) rows.get(0).get("preferences"),
                new TypeReference<>() {}
            );
            if (
                rows.get(0).get("catalogUpdatesSince") == null && catalogEnabled(saved)
            ) return savePreferences(id, saved);
            return saved;
        } catch (com.fasterxml.jackson.core.JsonProcessingException failure) {
            throw new IllegalStateException("Invalid persisted preferences", failure);
        }
    }

    private boolean catalogEnabled(Map<String, Map<String, Boolean>> body) {
        var category = body.get("newArrivals");
        return (
            category != null &&
            (Boolean.TRUE.equals(category.get("email")) ||
                Boolean.TRUE.equals(category.get("push")))
        );
    }

    public Map<String, Map<String, Boolean>> savePreferences(
        int id,
        Map<String, Map<String, Boolean>> body
    ) {
        access.requireOwner(id);
        if (
            body == null ||
            !body.keySet().equals(Set.of("orderUpdates", "promotions", "messages", "newArrivals"))
        ) throw new IllegalArgumentException("All notification categories are required");
        for (var entry : body.values())
            if (
                entry == null ||
                !entry.keySet().equals(Set.of("email", "push", "sms")) ||
                entry.values().stream().anyMatch(Objects::isNull)
            ) throw new IllegalArgumentException("All notification channels require a boolean");
        if (
            body
                .values()
                .stream()
                .anyMatch(entry -> Boolean.TRUE.equals(entry.get("sms")))
        ) throw new IllegalArgumentException("SMS notifications are currently unavailable");
        jdbc.queryForObject("select id from users where id=? for update", Integer.class, id);
        var prior = query(
            "select catalog_updates_since from notification_preferences where user_id=?",
            id
        );
        Object baseline = catalogEnabled(body)
            ? !prior.isEmpty() && prior.get(0).get("catalogUpdatesSince") != null
                ? prior.get(0).get("catalogUpdatesSince")
                : java.time.LocalDateTime.now(java.time.ZoneOffset.UTC)
            : null;
        try {
            jdbc.update(
                "insert into notification_preferences(user_id,preferences,catalog_updates_since) values (?,cast(? as jsonb),?) on conflict(user_id) do update set preferences=excluded.preferences,catalog_updates_since=excluded.catalog_updates_since,updated_at=now() at time zone 'UTC'",
                id,
                mapper.writeValueAsString(body),
                baseline
            );
            return body;
        } catch (com.fasterxml.jackson.core.JsonProcessingException failure) {
            throw new IllegalArgumentException("Invalid preferences");
        }
    }

    public void viewed(int id) {
        publicProduct(id);
        jdbc.update(
            "insert into browsing_history(user_id,product_id) values (?,?) on conflict(user_id,product_id) do update set viewed_at=now() at time zone 'UTC'",
            userId(),
            id
        );
    }

    public List<com.truehand.dto.ProductDTO> recent(int id) {
        access.requireOwner(id);
        return query(
            "select h.product_id from browsing_history h join products p on p.id=h.product_id where h.user_id=? and p.approval_status='APPROVED' and p.is_available=true and (p.seller_id is null or exists(select 1 from users u where u.id=p.seller_id and u.is_active=true)) order by h.viewed_at desc limit 50",
            id
        )
            .stream()
            .map(row -> products.getProduct((Integer) row.get("productId")))
            .toList();
    }

    public List<Map<String, Object>> alerts() {
        return query(
            "select a.*,p.name as product_name,p.image_url,p.price from product_alerts a join products p on p.id=a.product_id where a.user_id=? order by a.id desc limit 100",
            userId()
        );
    }

    public Map<String, Object> saveAlert(Map<String, Object> body) {
        lockUser();
        int product = integer(body, "productId");
        publicProduct(product);
        String type = text(body, "type", 10);
        if (!Set.of("PRICE", "STOCK").contains(type)) throw new IllegalArgumentException(
            "Use PRICE or STOCK"
        );
        BigDecimal threshold = "PRICE".equals(type) ? amount(body, "threshold") : null;
        long other = jdbc.queryForObject(
            "select count(*) from product_alerts where user_id=? and not(product_id=? and type=?)",
            Long.class,
            userId(),
            product,
            type
        );
        if (other >= 100) throw new IllegalArgumentException(
            "Remove an old alert before saving another"
        );
        return one(
            "insert into product_alerts(user_id,product_id,type,threshold) values (?,?,?,?) on conflict(user_id,product_id,type) do update set threshold=excluded.threshold,active=true,activation_version=product_alerts.activation_version+1 returning *",
            userId(),
            product,
            type,
            threshold
        );
    }

    public void deleteAlert(long id) {
        if (
            jdbc.update("delete from product_alerts where id=? and user_id=?", id, userId()) != 1
        ) throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Alert not found");
    }

    public List<Map<String, Object>> collections() {
        return query(
            "select c.*,count(cp.product_id) as product_count from customer_collections c left join collection_products cp on cp.collection_id=c.id where c.user_id=? group by c.id order by c.id desc limit 100",
            userId()
        );
    }

    public Map<String, Object> createCollection(Map<String, Object> body) {
        return one(
            "insert into customer_collections(user_id,name) values (?,?) returning *",
            userId(),
            text(body, "name", 100)
        );
    }

    private void ownCollection(long id) {
        one("select id from customer_collections where id=? and user_id=?", id, userId());
    }

    public List<com.truehand.dto.ProductDTO> collectionProducts(long id) {
        ownCollection(id);
        return productRows(
            "select p.id from products p join collection_products cp on cp.product_id=p.id where cp.collection_id=? and p.approval_status='APPROVED' and p.is_available=true limit 100",
            id
        );
    }

    public void collectionProduct(long id, int product, boolean add) {
        ownCollection(id);
        if (add) {
            publicProduct(product);
            jdbc.update(
                "insert into collection_products(collection_id,product_id) values (?,?) on conflict do nothing",
                id,
                product
            );
        } else jdbc.update(
            "delete from collection_products where collection_id=? and product_id=?",
            id,
            product
        );
    }

    public void deleteCollection(long id) {
        ownCollection(id);
        jdbc.update("delete from customer_collections where id=?", id);
    }

    private String choiceTable(String kind) {
        if (!Set.of("saved", "compare").contains(kind)) throw new IllegalArgumentException(
            "Invalid list"
        );
        return "saved".equals(kind) ? "saved_products" : "comparison_products";
    }

    private List<com.truehand.dto.ProductDTO> productRows(String sql, Object... args) {
        return query(sql, args)
            .stream()
            .map(row -> products.getProduct((Integer) row.get("id")))
            .toList();
    }

    public List<com.truehand.dto.ProductDTO> choices(String kind) {
        String table = choiceTable(kind);
        return productRows(
            "select p.id from products p join " +
                table +
                " s on s.product_id=p.id where s.user_id=? and p.approval_status='APPROVED' and p.is_available=true order by p.id limit 100",
            userId()
        );
    }

    public void choice(String kind, int product, boolean add) {
        String table = choiceTable(kind);
        lockUser();
        if (add) {
            publicProduct(product);
            int count = jdbc.queryForObject(
                "select count(*) from " + table + " where user_id=?",
                Integer.class,
                userId()
            );
            boolean exists = Boolean.TRUE.equals(
                jdbc.queryForObject(
                    "select exists(select 1 from " + table + " where user_id=? and product_id=?)",
                    Boolean.class,
                    userId(),
                    product
                )
            );
            if ("compare".equals(kind) && count >= 4 && !exists) throw new IllegalArgumentException(
                "Compare at most four products"
            );
            jdbc.update(
                "insert into " + table + "(user_id,product_id) values (?,?) on conflict do nothing",
                userId(),
                product
            );
        } else jdbc.update(
            "delete from " + table + " where user_id=? and product_id=?",
            userId(),
            product
        );
    }

    public List<Map<String, Object>> banners(boolean all) {
        if (all) admin();
        return query(
            "select * from banners " +
                (all ? "" : "where active=true ") +
                "order by position,id limit 100"
        );
    }

    public Map<String, Object> saveBanner(Map<String, Object> body) {
        admin();
        String target = text(body, "targetPath", 500);
        if (!target.startsWith("/") || target.startsWith("//")) throw new IllegalArgumentException(
            "Use an application path"
        );
        var result = one(
            "insert into banners(title,image_url,target_path,active,position) values (?,?,?,?,?) returning *",
            text(body, "title", 200),
            https(text(body, "imageUrl", 2000)),
            target,
            Boolean.TRUE.equals(body.get("active")),
            0
        );
        audit("CREATE", "BANNER", result.get("id"), Map.of());
        return result;
    }

    public void deleteBanner(long id) {
        admin();
        if (
            jdbc.update("delete from banners where id=?", id) != 1
        ) throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Banner not found");
        audit("DELETE", "BANNER", id, Map.of());
    }

    private Map<String, Object> ownRequest(int id) {
        var request = one("select id,user_id,status from support_requests where id=?", id);
        access.requireOwner((Integer) request.get("userId"));
        return request;
    }

    public List<Map<String, Object>> messages(int id) {
        ownRequest(id);
        return query(
            "select m.id,m.body,m.attachment_url,m.created_at,u.first_name,u.last_name,u.role from support_messages m join users u on u.id=m.author_id where request_id=? order by m.id limit 500",
            id
        );
    }

    public Map<String, Object> message(int id, Map<String, Object> body) {
        var request = ownRequest(id);
        if (
            Set.of("RESOLVED", "CLOSED").contains(request.get("status"))
        ) throw new IllegalArgumentException("This request is closed");
        String attachment =
            body.get("attachmentUrl") instanceof String value && !value.isBlank()
                ? https(value)
                : null;
        var result = one(
            "insert into support_messages(request_id,author_id,body,attachment_url) values (?,?,?,?) returning id,body,attachment_url,created_at",
            id,
            userId(),
            text(body, "body", 10000),
            attachment
        );
        jdbc.update(
            "update support_requests set last_update=? where id=?",
            java.time.LocalDate.now(java.time.ZoneOffset.UTC).toString(),
            id
        );
        int recipient = (Integer) request.get("userId");
        if (recipient != userId()) dispatches.message(
            recipient,
            "support-message:" + result.get("id"),
            "TrueHand support message",
            Map.of(
                "supportId",
                id,
                "userId",
                recipient,
                "eventKey",
                "support-message:" + result.get("id")
            )
        );
        return result;
    }

    public List<Map<String, Object>> commissions() {
        return query(
            "select c.*,u.first_name as customer_name,s.first_name as seller_name from commission_requests c join users u on u.id=c.user_id join users s on s.id=c.seller_id where c.user_id=? or c.seller_id=? order by c.id desc limit 100",
            userId(),
            userId()
        );
    }

    public Map<String, Object> createCommission(Map<String, Object> body) {
        int seller = integer(body, "sellerId");
        one("select id from users where id=? and role='SELLER' and is_active=true", seller);
        if (seller == userId()) throw new IllegalArgumentException("Select another artisan");
        if (!policies.acceptingCommissions(seller)) throw new IllegalArgumentException(
            "This seller is not accepting new commissions"
        );
        return one(
            "insert into commission_requests(user_id,seller_id,subject,description,budget) values (?,?,?,?,?) returning *",
            userId(),
            seller,
            text(body, "subject", 200),
            text(body, "description", 10000),
            amount(body, "budget")
        );
    }

    public Map<String, Object> commissionAction(long id, Map<String, Object> body) {
        var request = one("select * from commission_requests where id=? for update", id);
        String action = text(body, "status", 20);
        int owner = (Integer) request.get("userId"),
            seller = (Integer) request.get("sellerId");
        String current = (String) request.get("status");
        BigDecimal quote = (BigDecimal) request.get("quotedAmount");
        boolean allowed =
            (userId().equals(seller) &&
                "REQUESTED".equals(current) &&
                Set.of("QUOTED", "DECLINED").contains(action)) ||
            (userId().equals(owner) &&
                "QUOTED".equals(current) &&
                Set.of("ACCEPTED", "DECLINED").contains(action)) ||
            (userId().equals(owner) &&
                Set.of("REQUESTED", "QUOTED").contains(current) &&
                "CANCELED".equals(action));
        if (!allowed) throw new ResponseStatusException(
            HttpStatus.CONFLICT,
            "This commission action is not allowed"
        );
        if ("QUOTED".equals(action)) quote = amount(body, "quotedAmount");
        return one(
            "update commission_requests set status=?,quoted_amount=?,updated_at=now() at time zone 'UTC' where id=? returning *",
            action,
            quote,
            id
        );
    }

    public List<Map<String, Object>> comments(int post) {
        one("select id from artisan_posts where id=?", post);
        return query(
            "select c.id,c.body,c.created_at,u.first_name,u.last_name from post_comments c join users u on u.id=c.user_id where c.post_id=? order by c.id limit 200",
            post
        );
    }

    public Map<String, Object> comment(int post, Map<String, Object> body) {
        one("select id from artisan_posts where id=?", post);
        return one(
            "insert into post_comments(post_id,user_id,body) values (?,?,?) returning id,body,created_at",
            post,
            userId(),
            text(body, "body", 2000)
        );
    }

    public Map<String, Object> like(int post, boolean add) {
        one("select id from artisan_posts where id=? for update", post);
        if (add) jdbc.update(
            "insert into post_likes(post_id,user_id) values (?,?) on conflict do nothing",
            post,
            userId()
        );
        else jdbc.update("delete from post_likes where post_id=? and user_id=?", post, userId());
        int count = jdbc.queryForObject(
            "select count(*) from post_likes where post_id=?",
            Integer.class,
            post
        );
        jdbc.update("update artisan_posts set likes_count=? where id=?", count, post);
        return Map.of("likesCount", count, "liked", add);
    }

    public List<Map<String, Object>> gallery(int product) {
        publicProduct(product);
        var rows = new ArrayList<Map<String, Object>>();
        var value = products.getProduct(product);
        if (value.getImageUrl() != null) rows.add(
            Map.of("id", "main", "imageUrl", value.getImageUrl())
        );
        rows.addAll(
            query(
                "select id,image_url,position from product_media where product_id=? order by position,id",
                product
            )
        );
        return rows;
    }
}
