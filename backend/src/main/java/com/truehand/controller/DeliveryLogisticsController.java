package com.truehand.controller;

import com.truehand.model.FleetVehicle;
import com.truehand.model.DeliveryRoute;
import com.truehand.model.User;
import com.truehand.repository.FleetVehicleRepository;
import com.truehand.repository.DeliveryRouteRepository;
import com.truehand.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.List;
import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/delivery")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class DeliveryLogisticsController {
    private final FleetVehicleRepository fleetRepository;
    private final DeliveryRouteRepository routeRepository;
    private final UserRepository userRepository;

    @GetMapping("/fleet")
    public ResponseEntity<List<FleetVehicle>> getActiveFleet() {
        // For admin monitoring
        return ResponseEntity.ok(fleetRepository.findAll());
    }

    @PostMapping("/fleet/{agentId}/ping")
    public ResponseEntity<?> pingLocation(@PathVariable Integer agentId, @RequestBody Map<String, Double> location) {
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
        // Mock route optimization logic that would normally call Google Maps Directions API
        Integer agentId = (Integer) request.get("agentId");
        
        DeliveryRoute route = new DeliveryRoute();
        route.setAgent(userRepository.findById(agentId).orElseThrow());
        route.setOptimizedPolyline("mock_polyline_xyz");
        route.setTotalDistanceMeters(15000);
        route.setEstimatedDurationSeconds(1800);
        
        routeRepository.save(route);
        return ResponseEntity.ok(route);
    }
    
    @PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOTP(@RequestBody Map<String, String> request) {
        // Logic for delivery OTP verification
        String otp = request.get("otp");
        if ("123456".equals(otp)) {
            return ResponseEntity.ok(Map.of("success", true, "message", "Delivery verified"));
        }
        return ResponseEntity.badRequest().body("Invalid OTP");
    }
}
