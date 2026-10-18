package com.truehand.service;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.net.RequestOptions;
import com.stripe.param.PaymentIntentCreateParams;
import com.truehand.dto.PaymentRequestDTO;
import com.truehand.dto.PaymentResponseDTO;
import com.truehand.repository.OrderRepository;
import com.truehand.security.AccessPolicy;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

/** Creates payment intents and reconciles verified provider results with order state. */
@Service
@RequiredArgsConstructor
@Transactional
public class PaymentService {

    private final CartService carts;
    private final FulfillmentService fulfillments;
    private final SettlementService settlements;
    private final OrderEventService events;
    private final OrderRepository orders;
    private final AccessPolicy access;
    private final OrderService orderService;
    private final PromoService promos;

    @Value("${stripe.api.key}")
    private String stripeApiKey;

    @PostConstruct
    public void init() {
        Stripe.apiKey = stripeApiKey;
        Stripe.setConnectTimeout(5000);
        Stripe.setReadTimeout(15000);
    }

    public PaymentResponseDTO createPaymentIntent(PaymentRequestDTO request)
        throws StripeException {
        if (
            stripeApiKey == null || stripeApiKey.isBlank() || stripeApiKey.contains("placeholder")
        ) {
            throw new ResponseStatusException(
                HttpStatus.SERVICE_UNAVAILABLE,
                "Payments are not configured"
            );
        }
        if (request.getOrderId() == null) throw new IllegalArgumentException("orderId is required");
        var order = orders
            .findByIdForUpdate(request.getOrderId())
            .orElseThrow(() -> new IllegalArgumentException("Order not found"));
        access.requireOwner(order.getUser().getId());
        if (
            !"PENDING".equals(order.getStatus()) || !"PENDING".equals(order.getPaymentStatus())
        ) throw new IllegalArgumentException("Order is not awaiting payment");
        if (
            order.getPaymentExpiresAt() != null &&
            order.getPaymentExpiresAt().isBefore(java.time.LocalDateTime.now())
        ) throw new IllegalArgumentException(
            "Checkout reservation expired. Start a new order after the stock is released."
        );
        if (order.getPaymentIntentId() != null) return new PaymentResponseDTO(
            PaymentIntent.retrieve(order.getPaymentIntentId()).getClientSecret()
        );
        long amountInCents = order.getTotalAmount().movePointRight(2).longValueExact();
        PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
            .setAmount(amountInCents)
            .setCurrency("inr")
            .putMetadata("orderId", order.getId().toString())
            .putMetadata("userId", order.getUser().getId().toString())
            .setAutomaticPaymentMethods(
                PaymentIntentCreateParams.AutomaticPaymentMethods.builder().setEnabled(true).build()
            )
            .build();

        PaymentIntent intent = PaymentIntent.create(
            params,
            RequestOptions.builder()
                .setIdempotencyKey("truehand-order-" + order.getId())
                .build()
        );
        order.setPaymentIntentId(intent.getId());
        orders.save(order);
        return new PaymentResponseDTO(intent.getClientSecret());
    }

    public com.truehand.dto.OrderDTO confirmPayment(Integer orderId) throws StripeException {
        var order = orders
            .findById(orderId)
            .orElseThrow(() -> new IllegalArgumentException("Order not found"));
        access.requireOwner(order.getUser().getId());
        if (order.getPaymentIntentId() == null) throw new IllegalArgumentException(
            "Order has no payment intent"
        );
        reconcilePayment(PaymentIntent.retrieve(order.getPaymentIntentId()));
        return orderService.getOrder(orderId);
    }

    public void reconcilePayment(PaymentIntent intent) {
        var found = orders.findByPaymentIntentId(intent.getId());
        if (found.isEmpty()) throw new IllegalArgumentException("Unknown payment intent");
        var order = orders.findByIdForUpdate(found.get().getId()).orElseThrow();
        if (
            !"succeeded".equals(intent.getStatus()) ||
            !"inr".equals(intent.getCurrency()) ||
            intent.getAmountReceived() == null ||
            intent.getAmountReceived() !=
                order.getTotalAmount().movePointRight(2).longValueExact() ||
            intent.getMetadata() == null ||
            !order.getId().toString().equals(intent.getMetadata().get("orderId")) ||
            !order.getUser().getId().toString().equals(intent.getMetadata().get("userId"))
        ) {
            throw new IllegalArgumentException("Payment has not been verified for this order");
        }
        if ("PAID".equals(order.getPaymentStatus())) return;
        if (!"PENDING".equals(order.getStatus())) throw new IllegalArgumentException(
            "Order cannot accept this payment"
        );
        order.setPaymentStatus("PAID");
        order.setStatus("CONFIRMED");
        order.setUpdatedAt(java.time.LocalDateTime.now());
        orders.saveAndFlush(order);
        settlements.capture(order);
        promos.paid(order.getId());
        events.record(
            order.getId(),
            "payment-verified",
            "CONFIRMED",
            "Payment verified; order confirmed."
        );
        fulfillments.initialize(order.getId());
        carts.removePurchased(order.getUser().getId(), order.getOrderItems());
    }

    public com.truehand.dto.OrderDTO cancelUnpaidOrder(Integer orderId) throws StripeException {
        var order = orders
            .findByIdForUpdate(orderId)
            .orElseThrow(() -> new IllegalArgumentException("Order not found"));
        access.requireOwner(order.getUser().getId());
        return cancelUnpaid(order);
    }

    public void expireReservation(Integer orderId) throws StripeException {
        var order = orders.findByIdForUpdate(orderId).orElseThrow();
        if (
            !"PENDING".equals(order.getStatus()) ||
            !"PENDING".equals(order.getPaymentStatus()) ||
            order.getPaymentExpiresAt() == null ||
            !order.getPaymentExpiresAt().isBefore(java.time.LocalDateTime.now())
        ) return;
        if (
            order.getPaymentIntentId() != null &&
            "succeeded".equals(PaymentIntent.retrieve(order.getPaymentIntentId()).getStatus())
        ) {
            reconcilePayment(PaymentIntent.retrieve(order.getPaymentIntentId()));
            return;
        }
        cancelUnpaid(order);
    }

    private com.truehand.dto.OrderDTO cancelUnpaid(com.truehand.model.Order order)
        throws StripeException {
        if ("PAID".equals(order.getPaymentStatus())) throw new IllegalArgumentException(
            "A paid order requires a refund workflow"
        );
        if (order.getPaymentIntentId() != null) {
            PaymentIntent intent = PaymentIntent.retrieve(order.getPaymentIntentId());
            if ("succeeded".equals(intent.getStatus())) {
                throw new IllegalArgumentException(
                    "Payment succeeded; confirm the order before requesting a refund"
                );
            }
            if (!"canceled".equals(intent.getStatus())) intent.cancel();
            order.setPaymentIntentId(null);
            orders.save(order);
        }
        return orderService.cancelOrder(order.getId(), "Unpaid checkout cancelled");
    }
}
