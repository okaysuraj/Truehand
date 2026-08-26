package com.truehand.controller;

import com.truehand.model.Delivery;
import com.truehand.service.DeliveryService;
import com.truehand.websocket.LocationUpdate;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/deliveries")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class DeliveryController {
    private final DeliveryService deliveryService;

    @GetMapping("/{orderId}")
    public ResponseEntity<Delivery> getDelivery(@PathVariable Integer orderId) {
        return ResponseEntity.ok(deliveryService.getDelivery(orderId));
    }

    @PostMapping("/{orderId}/assign/{deliveryBoyId}")
    public ResponseEntity<?> assignDelivery(@PathVariable Integer orderId, @PathVariable Integer deliveryBoyId) {
        deliveryService.assignDelivery(orderId, deliveryBoyId);
        return ResponseEntity.ok("Delivery assigned to partner");
    }

    @GetMapping("/partner/{deliveryBoyId}")
    public ResponseEntity<List<Delivery>> getDeliveriesByPartner(@PathVariable Integer deliveryBoyId) {
        return ResponseEntity.ok(deliveryService.getDeliveriesByPartner(deliveryBoyId));
    }

    @GetMapping("/partner/{deliveryBoyId}/payouts")
    public ResponseEntity<List<Map<String, Object>>> getPartnerPayouts(@PathVariable Integer deliveryBoyId) {
        // Return empty array for now since Payout entity doesn't exist. This replaces mock data.
        return ResponseEntity.ok(new java.util.ArrayList<>());
    }

    @PostMapping("/{orderId}/start")
    public ResponseEntity<?> startDelivery(@PathVariable Integer orderId) {
        deliveryService.startDelivery(orderId);
        return ResponseEntity.ok("Delivery started");
    }

    @PostMapping("/{orderId}/location")
    public ResponseEntity<?> updateLocation(
            @PathVariable Integer orderId,
            @RequestParam BigDecimal latitude,
            @RequestParam BigDecimal longitude,
            @RequestParam(defaultValue = "5.0") BigDecimal accuracy) {
        deliveryService.updateLocation(orderId, latitude, longitude, accuracy);
        return ResponseEntity.ok("Location updated");
    }

    @PostMapping("/{orderId}/complete")
    public ResponseEntity<?> completeDelivery(@PathVariable Integer orderId) {
        deliveryService.completeDelivery(orderId);
        return ResponseEntity.ok("Delivery completed");
    }

    @PostMapping("/{orderId}/simulate")
    public ResponseEntity<?> simulateLocation(@PathVariable Integer orderId) {
        deliveryService.simulateLocationUpdate(orderId);
        return ResponseEntity.ok("Simulated location update sent");
    }
}
