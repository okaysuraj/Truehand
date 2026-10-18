package com.truehand.service;

import com.stripe.model.Refund;
import com.stripe.net.RequestOptions;
import com.stripe.param.RefundCreateParams;
import com.truehand.repository.OrderRepository;
import com.truehand.security.AccessPolicy;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.support.TransactionTemplate;

/** Coordinates refund requests, provider confirmation, and financial reversals. */
@Service
@RequiredArgsConstructor
public class RefundService {

    private final JdbcTemplate jdbc;
    private final OrderRepository orders;
    private final AccessPolicy access;
    private final MarketplaceFeatureService features;
    private final SettlementService settlements;
    private final PromoService promos;
    private final TransactionTemplate transaction;
    private final OrderEventService events;

    public Object list(boolean admin) {
        if (admin) {
            features.admin();
            return features.query("select * from refund_requests order by id desc limit 200");
        }
        return features.query(
            "select * from refund_requests where user_id=? order by id desc limit 100",
            access.currentUser().getId()
        );
    }

    public Object request(Integer orderId, Map<String, Object> body) {
        return transaction.execute(status -> {
            var order = orders
                .findByIdForUpdate(orderId)
                .orElseThrow(() -> new IllegalArgumentException("Order not found"));
            access.requireOwner(order.getUser().getId());
            if (!"PAID".equals(order.getPaymentStatus())) throw new IllegalArgumentException(
                "Only a paid order can be refunded"
            );
            return features.one(
                "insert into refund_requests(order_id,user_id,reason,amount,status) values(?,?,?,?,'REQUESTED') on conflict(order_id) do update set order_id=excluded.order_id returning *",
                orderId,
                order.getUser().getId(),
                features.text(body, "reason", 2000),
                order.getTotalAmount()
            );
        });
    }

    public Object reject(long id, Map<String, Object> body) {
        features.admin();
        return transaction.execute(status -> {
            var row = features.one("select * from refund_requests where id=? for update", id);
            if (!"REQUESTED".equals(row.get("status"))) throw new IllegalArgumentException(
                "Refund has already been reviewed"
            );
            String note = features.text(body, "note", 2000);
            jdbc.update(
                "update refund_requests set status='REJECTED',review_note=?,reviewed_by=?,updated_at=now() at time zone 'UTC' where id=?",
                note,
                access.currentUser().getId(),
                id
            );
            features.audit("REJECT", "REFUND", id, body);
            return features.one("select * from refund_requests where id=?", id);
        });
    }

    public Object approve(long id) throws com.stripe.exception.StripeException {
        features.admin();
        var context = transaction.execute(status -> {
            var initial = features.one("select order_id from refund_requests where id=?", id);
            var order = orders.findByIdForUpdate((Integer) initial.get("orderId")).orElseThrow();
            var row = features.one("select * from refund_requests where id=? for update", id);
            String state = (String) row.get("status");
            if (
                !java.util.Set.of("REQUESTED", "PROCESSING").contains(state)
            ) throw new IllegalArgumentException("Refund cannot be processed in its current state");
            if (order.getPaymentIntentId() == null) throw new IllegalArgumentException(
                "Order has no provider payment record"
            );
            jdbc.update(
                "update refund_requests set status='PROCESSING',reviewed_by=?,updated_at=now() at time zone 'UTC' where id=?",
                access.currentUser().getId(),
                id
            );
            order.setPaymentStatus("REFUND_PENDING");
            orders.save(order);
            return Map.of(
                "orderId",
                order.getId(),
                "intent",
                order.getPaymentIntentId(),
                "amount",
                order.getTotalAmount()
            );
        });
        // A committed intent and stable key survive a provider timeout without creating a second refund.
        Refund refund = Refund.create(
            RefundCreateParams.builder()
                .setPaymentIntent(context.get("intent").toString())
                .setAmount(
                    ((java.math.BigDecimal) context.get("amount"))
                        .movePointRight(2)
                        .longValueExact()
                )
                .putMetadata("truehandRefundId", String.valueOf(id))
                .build(),
            RequestOptions.builder()
                .setIdempotencyKey("truehand-refund-" + id)
                .build()
        );
        reconcile(refund);
        return features.one("select * from refund_requests where id=?", id);
    }

    public void reconcile(Refund refund) {
        transaction.executeWithoutResult(status -> {
            var rows = features.query(
                "select id,order_id from refund_requests where provider_reference=? or id::text=?",
                refund.getId(),
                refund.getMetadata() == null
                    ? ""
                    : refund.getMetadata().getOrDefault("truehandRefundId", "")
            );
            if (rows.size() != 1) throw new IllegalArgumentException("Unknown or ambiguous refund");
            var order = orders
                .findByIdForUpdate((Integer) rows.get(0).get("orderId"))
                .orElseThrow();
            var row = features.one(
                "select * from refund_requests where id=? for update",
                rows.get(0).get("id")
            );
            if (
                row.get("providerReference") != null &&
                !refund.getId().equals(row.get("providerReference"))
            ) throw new IllegalArgumentException("Refund provider reference does not match");
            if (
                !order.getPaymentIntentId().equals(refund.getPaymentIntent()) ||
                !"inr".equals(refund.getCurrency()) ||
                refund.getAmount() == null ||
                refund.getAmount() != order.getTotalAmount().movePointRight(2).longValueExact()
            ) throw new IllegalArgumentException("Refund does not match the original payment");
            if ("SUCCEEDED".equals(row.get("status"))) return;
            String next = "succeeded".equals(refund.getStatus())
                ? "SUCCEEDED"
                : java.util.Set.of("failed", "canceled").contains(refund.getStatus())
                  ? "FAILED"
                  : "PROCESSING";
            if ("SUCCEEDED".equals(next)) {
                settlements.refund(order);
                promos.refunded(order.getId());
                order.setPaymentStatus("REFUNDED");
                if (java.util.Set.of("CONFIRMED", "PROCESSING").contains(order.getStatus())) {
                    var shipped = jdbc.queryForList(
                        "select seller_id from order_fulfillments where order_id=? and status='SHIPPED'",
                        Integer.class,
                        order.getId()
                    );
                    for (var item : order
                        .getOrderItems()
                        .stream()
                        .sorted(
                            java.util.Comparator.comparing((com.truehand.model.OrderItem i) ->
                                i.getProduct().getId()
                            ).thenComparing(i ->
                                i.getVariant() == null ? 0 : i.getVariant().getId()
                            )
                        )
                        .toList()) {
                        if (shipped.contains(item.getSellerIdSnapshot())) continue;
                        if (item.getVariant() == null) jdbc.update(
                            "update products set stock_quantity=stock_quantity+? where id=?",
                            item.getQuantity(),
                            item.getProduct().getId()
                        );
                        else jdbc.update(
                            "update product_variants set stock_quantity=stock_quantity+? where id=?",
                            item.getQuantity(),
                            item.getVariant().getId()
                        );
                        jdbc.update(
                            "update order_items set cancelled_before_shipment_quantity=quantity where id=?",
                            item.getId()
                        );
                    }
                    order.setStatus(shipped.isEmpty() ? "CANCELLED" : "RETURN_REQUESTED");
                    jdbc.update(
                        "update order_fulfillments set status='CANCELED' where order_id=? and status<>'SHIPPED'",
                        order.getId()
                    );
                }
                events.record(
                    order.getId(),
                    "refund:" + row.get("id"),
                    order.getStatus(),
                    "Full refund verified. Shipped items are restocked only after physical receipt."
                );
            } else if ("FAILED".equals(next)) order.setPaymentStatus("PAID");
            orders.save(order);
            jdbc.update(
                "update refund_requests set status=?,provider_reference=?,updated_at=now() at time zone 'UTC' where id=?",
                next,
                refund.getId(),
                row.get("id")
            );
        });
    }

    public Object refresh(long id) throws com.stripe.exception.StripeException {
        features.admin();
        var row = features.one("select * from refund_requests where id=?", id);
        if (row.get("providerReference") == null) return approve(id);
        reconcile(Refund.retrieve(row.get("providerReference").toString()));
        return features.one("select * from refund_requests where id=?", id);
    }
}
