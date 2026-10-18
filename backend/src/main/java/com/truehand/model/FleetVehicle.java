package com.truehand.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import lombok.Data;

@Entity
@Table(name = "fleet_vehicles")
@lombok.Getter
@lombok.Setter
@lombok.ToString(onlyExplicitlyIncluded = true)
public class FleetVehicle {

    @lombok.ToString.Include
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
