package com.truehand.service;

import com.truehand.repository.OrderRepository;
import com.truehand.security.AccessPolicy;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/** Groups purchased items by seller and coordinates packing and shipping progress. */
@Service
@Transactional
@RequiredArgsConstructor
public class FulfillmentService {

    private final JdbcTemplate jdbc;
    private final OrderRepository orders;
    private final AccessPolicy access;
    private final OrderEventService events;
    private final MarketplaceFeatureService features;

    public void initialize(Integer orderId) {
        jdbc.update(
            "insert into order_fulfillments(order_id,seller_id) select distinct oi.order_id,oi.seller_id_snapshot from order_items oi join orders o on o.id=oi.order_id where oi.order_id=? and oi.seller_id_snapshot is not null and o.payment_status='PAID' on conflict(order_id,seller_id) do nothing",
            orderId
        );
    }

    public boolean transitionAll(Integer orderId, String target) {
        initialize(orderId);
        var sellers = jdbc.queryForList(
            "select seller_id from order_fulfillments where order_id=? order by seller_id",
            Integer.class,
            orderId
        );
        for (Integer seller : sellers) {
            String current = status(orderId, seller, null);
            if (
                target.equals(current) || ("PROCESSING".equals(target) && "SHIPPED".equals(current))
            ) continue;
            transition(orderId, seller, target);
        }
        return !sellers.isEmpty();
    }

    public String status(Integer orderId, Integer sellerId, String fallback) {
        var rows = jdbc.queryForList(
            "select status from order_fulfillments where order_id=? and seller_id=?",
            String.class,
            orderId,
            sellerId
        );
        return rows.isEmpty() ? fallback : rows.get(0);
    }

    public Map<Integer, String> statuses(java.util.Collection<Integer> orderIds, Integer sellerId) {
        if (orderIds.isEmpty()) return Map.of();
        var parameters = new java.util.ArrayList<Object>(orderIds);
        parameters.add(sellerId);
        String placeholders = String.join(",", java.util.Collections.nCopies(orderIds.size(), "?"));
        return jdbc
            .query(
                "select order_id,status from order_fulfillments where order_id in (" +
                    placeholders +
                    ") and seller_id=?",
                (rs, index) -> Map.entry(rs.getInt("order_id"), rs.getString("status")),
                parameters.toArray()
            )
            .stream()
            .collect(java.util.stream.Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));
    }

    public void transition(Integer orderId, Integer sellerId, String target) {
        var order = orders.findByIdForUpdate(orderId).orElseThrow();
        if (
            !"PAID".equals(order.getPaymentStatus()) ||
            !java.util.Set.of("PROCESSING", "SHIPPED").contains(target) ||
            java.util.Set.of("DELIVERED", "CANCELLED").contains(order.getStatus())
        ) throw new IllegalArgumentException("Order cannot be processed or shipped");
        initialize(orderId);
        String expected = "PROCESSING".equals(target) ? "CONFIRMED" : "PROCESSING";
        int updated = jdbc.update(
            "update order_fulfillments set status=?,shipped_at=case when ?='SHIPPED' then (now() at time zone 'UTC') else shipped_at end where order_id=? and seller_id=? and status=?",
            target,
            target,
            orderId,
            sellerId,
            expected
        );
        if (updated == 0) {
            if (target.equals(status(orderId, sellerId, null))) return;
            throw new IllegalArgumentException("Invalid fulfillment transition");
        }
        var statuses = jdbc.queryForList(
            "select status from order_fulfillments where order_id=?",
            String.class,
            orderId
        );
        if (statuses.stream().allMatch("SHIPPED"::equals)) order.setStatus("SHIPPED");
        else order.setStatus("PROCESSING");
        orders.save(order);
        events.record(
            orderId,
            "fulfillment:" + sellerId + ":" + target,
            order.getStatus(),
            "Seller " + sellerId + " fulfillment: " + target + "."
        );
    }

    @Transactional(readOnly = true)
    public org.springframework.data.domain.Page<Map<String, Object>> list(
        org.springframework.data.domain.Pageable pageable
    ) {
        var user = access.currentUser();
        if (
            !java.util.Set.of("SELLER", "ADMIN").contains(user.getRole())
        ) throw new org.springframework.web.server.ResponseStatusException(
            org.springframework.http.HttpStatus.FORBIDDEN,
            "Seller access required"
        );
        return features.page(
            "f.id,f.order_id as order_id,f.seller_id as seller_id,o.order_number as order_number,f.status,f.shipped_at as shipped_at,o.delivery_address_snapshot as delivery_address,o.payment_status",
            "from order_fulfillments f join orders o on o.id=f.order_id where (?='ADMIN' or f.seller_id=?)",
            "f.id desc",
            pageable,
            user.getRole(),
            user.getId()
        );
    }

    public List<Map<String, Object>> checks(Long id) {
        owned(id);
        return jdbc.queryForList(
            "select check_key as \"checkKey\",checked_at as \"checkedAt\" from fulfillment_checks where fulfillment_id=? order by check_key",
            id
        );
    }

    public void check(Long id, String key, boolean checked) {
        owned(id);
        if (
            !java.util.Set.of("PRODUCT", "PACKAGING", "ADDRESS", "LABEL").contains(key)
        ) throw new IllegalArgumentException("Invalid checklist item");
        if (checked) jdbc.update(
            "insert into fulfillment_checks(fulfillment_id,check_key,checked_by) values(?,?,?) on conflict do nothing",
            id,
            key,
            access.currentUser().getId()
        );
        else jdbc.update(
            "delete from fulfillment_checks where fulfillment_id=? and check_key=?",
            id,
            key
        );
    }

    private void owned(Long id) {
        var row = jdbc.queryForList(
            "select seller_id from order_fulfillments where id=?",
            Integer.class,
            id
        );
        if (row.isEmpty()) throw new org.springframework.web.server.ResponseStatusException(
            org.springframework.http.HttpStatus.NOT_FOUND,
            "Fulfillment not found"
        );
        access.requireOwner(row.get(0));
    }
}
