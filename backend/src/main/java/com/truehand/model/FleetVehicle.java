package com.truehand.model;

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
