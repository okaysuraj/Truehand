package com.truehand.controller;

import com.truehand.model.Delivery;
import com.truehand.service.DeliveryService;
import com.truehand.websocket.LocationUpdate;
import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/deliveries")
@RequiredArgsConstructor
public class DeliveryController {

    private final DeliveryService deliveryService;
    private final com.truehand.service.DeliveryHandoverService handoverService;
    private final com.truehand.service.PayoutService payouts;

    @PostMapping("/{orderId}/handover-code")
    @org.springframework.security.access.prepost.PreAuthorize(
        "@accessPolicy.canUpdateDelivery(#orderId)"
    )
    public ResponseEntity<?> issueHandoverCode(@PathVariable Integer orderId) {
        handoverService.issue(orderId);
        return ResponseEntity.ok(Map.of("message", "Handover email queued for delivery"));
    }

    @PostMapping("/{orderId}/verify-otp")
    @org.springframework.security.access.prepost.PreAuthorize(
        "@accessPolicy.canUpdateDelivery(#orderId)"
    )
    public ResponseEntity<?> verifyHandoverCode(
        @PathVariable Integer orderId,
        @RequestBody Map<String, String> body
    ) {
        boolean verified = handoverService.verify(orderId, body.get("otp"));
        return ResponseEntity.status(verified ? 200 : 400).body(Map.of("success", verified));
    }

    @GetMapping("/{orderId}")
    @org.springframework.security.access.prepost.PreAuthorize(
        "@accessPolicy.canReadOrder(#orderId)"
    )
    public ResponseEntity<?> getDelivery(@PathVariable Integer orderId) {
        return ResponseEntity.ok(deliveryService.getDeliveryView(orderId));
    }

    @PostMapping("/{orderId}/assign/{deliveryBoyId}")
    @org.springframework.security.access.prepost.PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> assignDelivery(
        @PathVariable Integer orderId,
        @PathVariable Integer deliveryBoyId
    ) {
        deliveryService.assignDelivery(orderId, deliveryBoyId);
        return ResponseEntity.ok("Delivery assigned to partner");
    }

    @GetMapping("/partner/{deliveryBoyId}")
    @org.springframework.security.access.prepost.PreAuthorize(
        "hasAnyRole('DELIVERY', 'ADMIN') and @accessPolicy.isOwner(#deliveryBoyId)"
    )
    public ResponseEntity<?> getDeliveriesByPartner(@PathVariable Integer deliveryBoyId) {
        return ResponseEntity.ok(
            deliveryService
                .getDeliveriesByPartner(deliveryBoyId)
                .stream()
                .map(d -> deliveryService.getDeliveryView(d.getOrder().getId()))
                .toList()
        );
    }

    @GetMapping("/partner/{deliveryBoyId}/payouts")
    @org.springframework.security.access.prepost.PreAuthorize(
        "hasAnyRole('DELIVERY', 'ADMIN') and @accessPolicy.isOwner(#deliveryBoyId)"
    )
    public ResponseEntity<List<com.truehand.model.PayoutRequest>> getPartnerPayouts(
        @PathVariable Integer deliveryBoyId
    ) {
        return ResponseEntity.ok(payouts.list(deliveryBoyId));
    }

    @PostMapping("/{orderId}/start")
    @org.springframework.security.access.prepost.PreAuthorize(
        "@accessPolicy.canUpdateDelivery(#orderId)"
    )
    public ResponseEntity<?> startDelivery(@PathVariable Integer orderId) {
        deliveryService.startDelivery(orderId);
        return ResponseEntity.ok("Delivery started");
    }

    @PostMapping("/{orderId}/location")
    @org.springframework.security.access.prepost.PreAuthorize(
        "@accessPolicy.canUpdateDelivery(#orderId)"
    )
    public ResponseEntity<?> updateLocation(
        @PathVariable Integer orderId,
        @RequestParam BigDecimal latitude,
        @RequestParam BigDecimal longitude,
        @RequestParam BigDecimal accuracy
    ) {
        deliveryService.updateLocation(orderId, latitude, longitude, accuracy);
        return ResponseEntity.ok("Location updated");
    }

    @PostMapping("/{orderId}/complete")
    @org.springframework.security.access.prepost.PreAuthorize(
        "@accessPolicy.canUpdateDelivery(#orderId)"
    )
    public ResponseEntity<?> completeDelivery(@PathVariable Integer orderId) {
        deliveryService.completeDelivery(orderId);
        return ResponseEntity.ok("Delivery completed");
    }
}
