import os

models = """package com.truehand.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "fleet_vehicles")
@Data
public class FleetVehicle {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @OneToOne
    @JoinColumn(name = "agent_id", nullable = false)
    private User agent;

    private String vehicleRegistrationNumber;
    private String vehicleType;
    
    // Live tracking
    private Double currentLat;
    private Double currentLng;
    private LocalDateTime lastPingAt;
    
    private String status; // ACTIVE, INACTIVE, IN_TRANSIT
}
"""

models_route = """package com.truehand.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "delivery_routes")
@Data
public class DeliveryRoute {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "agent_id", nullable = false)
    private User agent;

    private String optimizedPolyline;
    private Integer totalDistanceMeters;
    private Integer estimatedDurationSeconds;
    
    private LocalDateTime createdAt;
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
"""

repo_fleet = """package com.truehand.repository;

import com.truehand.model.FleetVehicle;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.util.List;

public interface FleetVehicleRepository extends JpaRepository<FleetVehicle, Integer> {
    Optional<FleetVehicle> findByAgentId(Integer agentId);
    List<FleetVehicle> findByStatus(String status);
}
"""

repo_route = """package com.truehand.repository;

import com.truehand.model.DeliveryRoute;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface DeliveryRouteRepository extends JpaRepository<DeliveryRoute, Integer> {
    List<DeliveryRoute> findByAgentId(Integer agentId);
}
"""

controller = """package com.truehand.controller;

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
"""

def write(path, content):
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

base = 'backend/src/main/java/com/truehand/'
write(base + 'model/FleetVehicle.java', models)
write(base + 'model/DeliveryRoute.java', models_route)
write(base + 'repository/FleetVehicleRepository.java', repo_fleet)
write(base + 'repository/DeliveryRouteRepository.java', repo_route)
write(base + 'controller/DeliveryLogisticsController.java', controller)

print('Delivery Logistics backend created.')
