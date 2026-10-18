package com.truehand.controller;

import com.truehand.dto.PaymentRequestDTO;
import com.truehand.dto.PaymentResponseDTO;
import com.truehand.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payment")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;
    private final com.truehand.service.RefundService refunds;
    private final com.truehand.service.SubscriptionBillingService billing;

    @org.springframework.beans.factory.annotation.Value("${stripe.webhook.secret:}")
    private String webhookSecret;

    @PostMapping("/create-intent")
    public ResponseEntity<?> createPaymentIntent(@RequestBody PaymentRequestDTO request)
        throws com.stripe.exception.StripeException {
        return ResponseEntity.ok(paymentService.createPaymentIntent(request));
    }

    @PostMapping("/orders/{id}/confirm")
    public ResponseEntity<?> confirm(@PathVariable Integer id)
        throws com.stripe.exception.StripeException {
        return ResponseEntity.ok(paymentService.confirmPayment(id));
    }

    @PostMapping("/orders/{id}/cancel")
    public ResponseEntity<?> cancel(@PathVariable Integer id)
        throws com.stripe.exception.StripeException {
        return ResponseEntity.ok(paymentService.cancelUnpaidOrder(id));
    }

    @PostMapping("/webhook")
    public ResponseEntity<?> webhook(
        @RequestBody String payload,
        @RequestHeader("Stripe-Signature") String signature
    ) throws Exception {
        if (
            webhookSecret.isBlank()
        ) throw new org.springframework.web.server.ResponseStatusException(
            org.springframework.http.HttpStatus.SERVICE_UNAVAILABLE,
            "Payment webhook is not configured"
        );
        com.stripe.model.Event event;
        try {
            event = com.stripe.net.Webhook.constructEvent(payload, signature, webhookSecret);
        } catch (
            com.stripe.exception.SignatureVerificationException
            | com.google.gson.JsonSyntaxException ex
        ) {
            return ResponseEntity.badRequest().body(
                java.util.Map.of("error", "Invalid webhook signature or payload")
            );
        }
        if ("payment_intent.succeeded".equals(event.getType())) {
            var node = new com.fasterxml.jackson.databind.ObjectMapper().readTree(payload);
            String intentId = node.path("data").path("object").path("id").asText();
            paymentService.reconcilePayment(com.stripe.model.PaymentIntent.retrieve(intentId));
        }
        if (
            java.util.Set.of("refund.created", "refund.updated", "refund.failed").contains(
                event.getType()
            )
        ) {
            String refundId = new com.fasterxml.jackson.databind.ObjectMapper()
                .readTree(payload)
                .path("data")
                .path("object")
                .path("id")
                .asText();
            var refund = com.stripe.model.Refund.retrieve(refundId);
            if (
                refund.getMetadata() != null && refund.getMetadata().containsKey("truehandRefundId")
            ) refunds.reconcile(refund);
        }
        if (
            java.util.Set.of(
                "checkout.session.completed",
                "checkout.session.async_payment_succeeded",
                "checkout.session.expired",
                "checkout.session.async_payment_failed"
            ).contains(event.getType())
        ) {
            String sessionId = new com.fasterxml.jackson.databind.ObjectMapper()
                .readTree(payload)
                .path("data")
                .path("object")
                .path("id")
                .asText();
            billing.reconcile(com.stripe.model.checkout.Session.retrieve(sessionId));
        }
        return ResponseEntity.ok(java.util.Map.of("received", true));
    }
}
