package com.truehand.controller;

import com.truehand.model.DeliveryRoute;
import com.truehand.model.FleetVehicle;
import com.truehand.model.User;
import com.truehand.repository.DeliveryRouteRepository;
import com.truehand.repository.FleetVehicleRepository;
import com.truehand.repository.UserRepository;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/delivery")
@RequiredArgsConstructor
public class DeliveryLogisticsController {

    private final FleetVehicleRepository fleetRepository;
    private final DeliveryRouteRepository routeRepository;
    private final UserRepository userRepository;
    private final com.truehand.repository.DeliveryRepository deliveries;
    private final com.truehand.security.AccessPolicy accessPolicy;
    private final com.truehand.service.DeliveryHandoverService handover;
    private final com.truehand.service.DeliveryRoutingService routing;

    @GetMapping("/fleet")
    @org.springframework.security.access.prepost.PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<FleetVehicle>> getActiveFleet() {
        // For admin monitoring
        return ResponseEntity.ok(fleetRepository.findAll());
    }

    @PostMapping("/fleet/{agentId}/ping")
    @org.springframework.security.access.prepost.PreAuthorize(
        "hasAnyRole('DELIVERY','ADMIN') and @accessPolicy.isOwner(#agentId)"
    )
    public ResponseEntity<?> pingLocation(
        @PathVariable Integer agentId,
        @RequestBody Map<String, Double> location
    ) {
        Double lat = location.get("lat"),
            lng = location.get("lng");
        if (
            lat == null ||
            lng == null ||
            !Double.isFinite(lat) ||
            !Double.isFinite(lng) ||
            Math.abs(lat) > 90 ||
            Math.abs(lng) > 180
        ) throw new IllegalArgumentException("Invalid GPS coordinates");
        FleetVehicle vehicle = fleetRepository.findByAgentId(agentId).orElse(new FleetVehicle());
        if (vehicle.getAgent() == null) {
            User agent = userRepository.findById(agentId).orElseThrow();
            vehicle.setAgent(agent);
            vehicle.setStatus("ACTIVE");
        }
        vehicle.setCurrentLat(location.get("lat"));
        vehicle.setCurrentLng(location.get("lng"));
        vehicle.setLastPingAt(LocalDateTime.now());
        fleetRepository.save(vehicle);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/route-optimization")
    public ResponseEntity<?> optimizeRoute(@RequestBody Map<String, Object> request) {
        return ResponseEntity.ok(routing.optimize(request));
    }

    @GetMapping("/routes")
    public Object routes() {
        return routing.list();
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOTP(@RequestBody Map<String, String> request) {
        if (request.get("deliveryId") == null) throw new IllegalArgumentException(
            "deliveryId is required"
        );
        var delivery = deliveries
            .findById(Integer.valueOf(request.get("deliveryId")))
            .orElseThrow();
        if (
            !accessPolicy.canUpdateDelivery(delivery.getOrder().getId())
        ) throw new org.springframework.web.server.ResponseStatusException(
            org.springframework.http.HttpStatus.FORBIDDEN,
            "Access denied"
        );
        boolean verified = handover.verify(delivery.getOrder().getId(), request.get("otp"));
        return ResponseEntity.status(verified ? 200 : 400).body(Map.of("success", verified));
    }
}
