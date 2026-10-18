package com.truehand.service;

import com.stripe.model.checkout.Session;
import com.stripe.net.RequestOptions;
import com.stripe.param.checkout.SessionCreateParams;
import com.truehand.security.AccessPolicy;
import java.math.BigDecimal;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.support.TransactionTemplate;

@Service
@RequiredArgsConstructor
public class SubscriptionBillingService {

    private final AccessPolicy access;
    private final MarketplaceFeatureService features;
    private final JdbcTemplate jdbc;
    private final TransactionTemplate transaction;
    private final LedgerService ledger;

    @Value("${frontend.base-url:http://localhost:3000}")
    private String frontend;

    public Object begin(Integer sellerId, Map<String, Object> body)
        throws com.stripe.exception.StripeException {
        access.requireOwner(sellerId);
        String key = features.text(body, "checkoutKey", 100);
        if (!key.matches("[A-Za-z0-9-]{16,100}")) throw new IllegalArgumentException(
            "A unique checkout key is required"
        );
        int plan = features.integer(body, "planId");
        var purchase = transaction.execute(status -> {
            lockSeller(sellerId);
            var existing = features.query(
                "select * from subscription_purchases where seller_id=? and checkout_key=?",
                sellerId,
                key
            );
            if (!existing.isEmpty()) {
                var saved = existing.get(0);
                if (
                    ((Number) saved.get("planId")).intValue() != plan
                ) throw new IllegalArgumentException("Checkout key belongs to a different plan");
                return saved;
            }
            var selected = features.one(
                "select * from seller_subscription_plans where id=? and active=true",
                plan
            );
            return features.one(
                "insert into subscription_purchases(seller_id,plan_id,plan_name,amount,duration_days,checkout_key,status) values(?,?,?,?,?,?,'CREATED') returning *",
                sellerId,
                plan,
                selected.get("name"),
                selected.get("amount"),
                selected.get("durationDays"),
                key
            );
        });
        if (!"CREATED".equals(purchase.get("status"))) throw new IllegalArgumentException(
            "Purchase is already completed or expired"
        );
        // Stripe retains idempotency keys for a limited time. Never recreate an old, unassociated attempt.
        if (
            purchase.get("providerSessionId") == null &&
            ((java.time.LocalDateTime) purchase.get("createdAt")).isBefore(
                java.time.LocalDateTime.now(java.time.ZoneOffset.UTC).minusMinutes(30)
            )
        ) {
            jdbc.update(
                "update subscription_purchases set status='EXPIRED' where id=? and status='CREATED' and provider_session_id is null",
                purchase.get("id")
            );
            throw new IllegalArgumentException(
                "Checkout attempt expired. Check the provider payment history before starting another purchase."
            );
        }
        Session session;
        if (purchase.get("providerSessionId") != null) session = Session.retrieve(
            purchase.get("providerSessionId").toString()
        );
        else {
            var price = SessionCreateParams.LineItem.PriceData.builder()
                .setCurrency("inr")
                .setUnitAmount(
                    ((BigDecimal) purchase.get("amount")).movePointRight(2).longValueExact()
                )
                .setProductData(
                    SessionCreateParams.LineItem.PriceData.ProductData.builder()
                        .setName(purchase.get("planName").toString())
                        .build()
                )
                .build();
            var params = SessionCreateParams.builder()
                .setMode(SessionCreateParams.Mode.PAYMENT)
                .setSuccessUrl(frontend + "/features/seller-subscription")
                .setCancelUrl(frontend + "/features/subscription-plans")
                .setClientReferenceId(String.valueOf(sellerId))
                .putMetadata("truehandSubscriptionPurchase", purchase.get("id").toString())
                .addLineItem(
                    SessionCreateParams.LineItem.builder()
                        .setQuantity(1L)
                        .setPriceData(price)
                        .build()
                )
                .build();
            session = Session.create(
                params,
                RequestOptions.builder()
                    .setIdempotencyKey("truehand-subscription-" + purchase.get("id"))
                    .build()
            );
            if (
                jdbc.update(
                    "update subscription_purchases set provider_session_id=? where id=? and (provider_session_id is null or provider_session_id=?)",
                    session.getId(),
                    purchase.get("id"),
                    session.getId()
                ) != 1
            ) throw new IllegalArgumentException("Checkout session does not match this purchase");
        }
        reconcile(session);
        if (
            "paid".equals(session.getPaymentStatus()) || "expired".equals(session.getStatus())
        ) throw new IllegalArgumentException(
            "Purchase is completed or expired. Refresh your purchase history."
        );
        if (session.getUrl() == null) throw new IllegalArgumentException(
            "Checkout session is no longer available. Start a new purchase."
        );
        return Map.of("checkoutUrl", session.getUrl(), "purchaseId", purchase.get("id"));
    }

    public void reconcile(Session session) {
        transaction.executeWithoutResult(status -> {
            if (
                session.getMetadata() == null ||
                !session.getMetadata().containsKey("truehandSubscriptionPurchase")
            ) return;
            var owner = features.one(
                "select seller_id from subscription_purchases where id::text=?",
                session.getMetadata().get("truehandSubscriptionPurchase")
            );
            lockSeller(((Number) owner.get("sellerId")).intValue());
            var purchase = features.one(
                "select * from subscription_purchases where id::text=? for update",
                session.getMetadata().get("truehandSubscriptionPurchase")
            );
            if (
                session.getId() == null ||
                (purchase.get("providerSessionId") != null &&
                    !session.getId().equals(purchase.get("providerSessionId"))) ||
                !"inr".equals(session.getCurrency()) ||
                !String.valueOf(purchase.get("sellerId")).equals(session.getClientReferenceId()) ||
                session.getAmountTotal() == null ||
                session.getAmountTotal() !=
                    ((BigDecimal) purchase.get("amount")).movePointRight(2).longValueExact()
            ) throw new IllegalArgumentException("Subscription payment has not been verified");
            if ("PAID".equals(purchase.get("status"))) {
                if (
                    !"paid".equals(session.getPaymentStatus()) ||
                    !java.util.Objects.equals(
                        session.getPaymentIntent(),
                        purchase.get("providerPaymentId")
                    )
                ) throw new IllegalArgumentException(
                    "Subscription payment does not match the recorded payment"
                );
                return;
            }
            jdbc.update(
                "update subscription_purchases set provider_session_id=? where id=?",
                session.getId(),
                purchase.get("id")
            );
            if (!"paid".equals(session.getPaymentStatus())) {
                if ("expired".equals(session.getStatus())) jdbc.update(
                    "update subscription_purchases set status='EXPIRED' where id=?",
                    purchase.get("id")
                );
                return;
            }
            if (session.getPaymentIntent() == null) throw new IllegalArgumentException(
                "Subscription payment has not been verified"
            );
            jdbc.update(
                "insert into seller_subscriptions(seller_id,plan_name,status,expires_at,created_at) values(?,?,'ACTIVE',(now() at time zone 'UTC')+make_interval(days=>?),now() at time zone 'UTC') on conflict(seller_id) do update set plan_name=excluded.plan_name,status='ACTIVE',expires_at=greatest(seller_subscriptions.expires_at,now() at time zone 'UTC')+make_interval(days=>?)",
                purchase.get("sellerId"),
                purchase.get("planName"),
                purchase.get("durationDays"),
                purchase.get("durationDays")
            );
            jdbc.update(
                "update subscription_purchases set status='PAID',provider_payment_id=?,paid_at=now() at time zone 'UTC' where id=?",
                session.getPaymentIntent(),
                purchase.get("id")
            );
            ledger.transfer(
                "subscription:" + purchase.get("id"),
                "Verified subscription purchase",
                "GATEWAY",
                "SUBSCRIPTION_REVENUE",
                (BigDecimal) purchase.get("amount")
            );
        });
    }

    private void lockSeller(Integer sellerId) {
        jdbc.queryForObject(
            "select id from users where id=? for no key update",
            Integer.class,
            sellerId
        );
    }

    public Object subscription(Integer sellerId) {
        access.requireOwner(sellerId);
        return transaction.execute(status -> {
            lockSeller(sellerId);
            jdbc.update(
                "insert into seller_subscriptions(seller_id,plan_name,status,created_at) values(?,'FREE','ACTIVE',now() at time zone 'UTC') on conflict(seller_id) do nothing",
                sellerId
            );
            jdbc.update(
                "update seller_subscriptions set status='EXPIRED' where seller_id=? and expires_at<=now() at time zone 'UTC' and status='ACTIVE'",
                sellerId
            );
            return features.one(
                "select id,seller_id,plan_name,status,expires_at,created_at from seller_subscriptions where seller_id=?",
                sellerId
            );
        });
    }

    public Object history(Integer sellerId) {
        access.requireOwner(sellerId);
        return features.query(
            "select id,plan_name,amount,duration_days,status,created_at,paid_at from subscription_purchases where seller_id=? order by id desc limit 100",
            sellerId
        );
    }

    public Object refresh(Integer sellerId, Long purchaseId)
        throws com.stripe.exception.StripeException {
        access.requireOwner(sellerId);
        var purchase = features.one(
            "select * from subscription_purchases where id=? and seller_id=?",
            purchaseId,
            sellerId
        );
        if (purchase.get("providerSessionId") == null) throw new IllegalArgumentException(
            "Checkout was not created. Retry checkout with the original request key."
        );
        reconcile(Session.retrieve(purchase.get("providerSessionId").toString()));
        return features.one(
            "select id,plan_name,amount,duration_days,status,created_at,paid_at from subscription_purchases where id=? and seller_id=?",
            purchaseId,
            sellerId
        );
    }
}
