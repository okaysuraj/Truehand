package com.truehand.controller;

import com.truehand.repository.DeliveryRepository;
import com.truehand.security.AccessPolicy;
import com.truehand.service.MarketplaceFeatureService;
import java.util.*;
import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class DeliveryOperationsController {

    private final MarketplaceFeatureService features;
    private final AccessPolicy access;
    private final JdbcTemplate jdbc;
    private final DeliveryRepository deliveries;
    private final com.truehand.service.NotificationDispatchService dispatches;

    private void read(Integer id) {
        if (
            !access.canReadOrder(id)
        ) throw new org.springframework.web.server.ResponseStatusException(
            org.springframework.http.HttpStatus.FORBIDDEN,
            "Access denied"
        );
    }

    @GetMapping("/deliveries/accessible")
    public Object accessible() {
        var user = access.currentUser();
        return features.query(
            "select o.id,o.order_number from orders o left join deliveries d on d.order_id=o.id where o.user_id=? or d.delivery_boy_id=? or ?='ADMIN' order by o.id desc limit 200",
            user.getId(),
            user.getId(),
            user.getRole()
        );
    }

    @GetMapping("/orders/{id}/timeline")
    public Object timeline(@PathVariable Integer id) {
        read(id);
        return features.query(
            "select id,status,message,created_at from order_events where order_id=? order by id",
            id
        );
    }

    @GetMapping("/deliveries/{id}/messages")
    public Object messages(@PathVariable Integer id) {
        read(id);
        return features.query(
            "select m.id,m.author_id,m.body,m.created_at,u.first_name as author_name from delivery_messages m join users u on u.id=m.author_id where m.order_id=? order by m.id desc limit 200",
            id
        );
    }

    @PostMapping("/deliveries/{id}/messages")
    @Transactional
    public Object message(@PathVariable Integer id, @RequestBody Map<String, Object> body) {
        read(id);
        int author = features.userId();
        var result = features.one(
            "insert into delivery_messages(order_id,author_id,body) values(?,?,?) returning id,author_id,body,created_at",
            id,
            author,
            features.text(body, "body", 2000)
        );
        for (Integer recipient : jdbc.queryForList(
            "select user_id from orders where id=? union select delivery_boy_id from deliveries where order_id=? and delivery_boy_id is not null",
            Integer.class,
            id,
            id
        ))
            if (recipient != author) dispatches.message(
                recipient,
                "delivery-message:" + result.get("id"),
                "TrueHand delivery message",
                Map.of(
                    "orderId",
                    id,
                    "userId",
                    recipient,
                    "eventKey",
                    "delivery-message:" + result.get("id")
                )
            );
        return result;
    }

    @GetMapping("/deliveries/{id}/evidence")
    public Object evidence(@PathVariable Integer id) {
        read(id);
        return features.query(
            "select e.image_url,e.recipient_name,e.notes,e.captured_at from delivery_evidence e join deliveries d on d.id=e.delivery_id where d.order_id=?",
            id
        );
    }

    @PostMapping("/deliveries/{id}/evidence")
    @Transactional
    public Object evidence(@PathVariable Integer id, @RequestBody Map<String, Object> body) {
        if (
            !access.canUpdateDelivery(id)
        ) throw new org.springframework.web.server.ResponseStatusException(
            org.springframework.http.HttpStatus.FORBIDDEN,
            "Access denied"
        );
        var delivery = deliveries.findByOrderIdForUpdate(id).orElseThrow();
        if (!"IN_TRANSIT".equals(delivery.getStatus())) throw new IllegalArgumentException(
            "Evidence can only be uploaded for an in-transit delivery"
        );
        return features.one(
            "insert into delivery_evidence(delivery_id,uploaded_by,image_url,recipient_name,notes) values(?,?,?,?,?) on conflict(delivery_id) do update set image_url=excluded.image_url,recipient_name=excluded.recipient_name,notes=excluded.notes,uploaded_by=excluded.uploaded_by,captured_at=now() at time zone 'UTC' returning image_url,recipient_name,notes,captured_at",
            delivery.getId(),
            features.userId(),
            features.https(features.text(body, "imageUrl", 2000)),
            features.text(body, "recipientName", 100),
            body.getOrDefault("notes", "")
        );
    }

    @GetMapping("/admin/delivery-queue")
    public Object queue() {
        features.admin();
        return features.query(
            "select d.id,d.order_id,o.order_number,o.status as order_status,d.status,u.first_name as partner_name,d.delivery_boy_id,o.delivery_address_snapshot as delivery_address from deliveries d join orders o on o.id=d.order_id left join users u on u.id=d.delivery_boy_id where o.payment_status='PAID' and d.status in ('PENDING','ASSIGNED','IN_TRANSIT') order by d.id limit 200"
        );
    }

    @GetMapping("/admin/delivery-agents/available")
    public Object available() {
        features.admin();
        return features.query(
            "select u.id,concat_ws(' ',u.first_name,u.last_name) as name from users u join delivery_personnel p on p.user_id=u.id where u.role='DELIVERY' and u.is_active=true and p.kyc_status='APPROVED' and p.is_available=true order by u.id limit 200"
        );
    }

    @GetMapping("/delivery/performance")
    public Object performance() {
        int id = features.userId();
        return features.one(
            "select count(*) as assigned_total,count(*) filter(where status='DELIVERED') as delivered,count(*) filter(where status='IN_TRANSIT') as in_transit,count(*) filter(where status='ASSIGNED') as awaiting_pickup,count(*) filter(where status='DELIVERED' and actual_delivery_time>= (now() at time zone 'UTC')-interval '30 days') as delivered_last_month,count(*) filter(where status='DELIVERED' and estimated_delivery_time is not null) as deliveries_with_estimate,count(*) filter(where status='DELIVERED' and actual_delivery_time<=estimated_delivery_time) as delivered_by_estimate from deliveries where delivery_boy_id=?",
            id
        );
    }

    @GetMapping("/delivery/exceptions")
    public Object exceptions() {
        return features.query(
            "select e.*,o.order_number from delivery_exceptions e join orders o on o.id=e.order_id where e.reported_by=? order by e.id desc limit 200",
            features.userId()
        );
    }

    @GetMapping("/admin/delivery-exceptions")
    public Object exceptionsAdmin() {
        features.admin();
        return features.query(
            "select e.*,o.order_number,concat_ws(' ',u.first_name,u.last_name) as partner_name from delivery_exceptions e join orders o on o.id=e.order_id join users u on u.id=e.reported_by order by e.id desc limit 200"
        );
    }

    @PostMapping("/delivery/exceptions")
    @Transactional
    public Object exception(@RequestBody Map<String, Object> body) {
        int orderId = features.integer(body, "orderId");
        if (
            !access.canUpdateDelivery(orderId)
        ) throw new org.springframework.web.server.ResponseStatusException(
            org.springframework.http.HttpStatus.FORBIDDEN,
            "Access denied"
        );
        var delivery = deliveries.findByOrderIdForUpdate(orderId).orElseThrow();
        if (
            !Set.of("ASSIGNED", "IN_TRANSIT").contains(delivery.getStatus())
        ) throw new IllegalArgumentException("Only an active assigned delivery can be reported");
        String reason = features.text(body, "reason", 40);
        if (
            !Set.of(
                "RECIPIENT_UNAVAILABLE",
                "INCORRECT_ADDRESS",
                "ACCESS_BLOCKED",
                "DAMAGED_ITEM",
                "VEHICLE_ISSUE",
                "OTHER"
            ).contains(reason)
        ) throw new IllegalArgumentException("Invalid exception reason");
        String image =
            body.get("imageUrl") instanceof String value && !value.isBlank()
                ? features.https(value)
                : null;
        return features.one(
            "insert into delivery_exceptions(order_id,reported_by,reason,details,image_url) values(?,?,?,?,?) returning *",
            orderId,
            features.userId(),
            reason,
            features.text(body, "details", 2000),
            image
        );
    }

    @PostMapping("/admin/delivery-exceptions/{id}/resolve")
    @Transactional
    public Object resolve(@PathVariable Long id, @RequestBody Map<String, Object> body) {
        features.admin();
        var current = features.one("select * from delivery_exceptions where id=? for update", id);
        if ("RESOLVED".equals(current.get("status"))) return current;
        var result = features.one(
            "update delivery_exceptions set status='RESOLVED',resolution=?,resolved_by=?,resolved_at=now() at time zone 'UTC' where id=? returning *",
            features.text(body, "resolution", 2000),
            features.userId(),
            id
        );
        features.audit(
            "RESOLVE",
            "DELIVERY_EXCEPTION",
            id,
            Map.of("orderId", current.get("orderId"))
        );
        return result;
    }

    @GetMapping("/admin/live-fleet")
    public Object fleet() {
        features.admin();
        return features.query(
            "select v.id,v.agent_id,concat_ws(' ',u.first_name,u.last_name) as name,v.status,v.current_lat as latitude,v.current_lng as longitude,v.last_ping_at from fleet_vehicles v join users u on u.id=v.agent_id order by v.last_ping_at desc nulls last limit 200"
        );
    }

    @GetMapping("/seller/fulfillments/{id}/label")
    public Object label(@PathVariable Long id) {
        var user = access.currentUser();
        return features.one(
            "select f.id,o.order_number,o.delivery_address_snapshot as delivery_address,concat_ws(' ',u.first_name,u.last_name) as recipient,o.special_instructions,(select jsonb_agg(jsonb_build_object('product',oi.product_name_snapshot,'sku',oi.variant_sku_snapshot,'quantity',oi.quantity))::text from order_items oi where oi.order_id=o.id and oi.seller_id_snapshot=f.seller_id) as items from order_fulfillments f join orders o on o.id=f.order_id join users u on u.id=o.user_id where f.id=? and (?='ADMIN' or f.seller_id=?)",
            id,
            user.getRole(),
            user.getId()
        );
    }
}
