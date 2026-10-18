package com.truehand.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import lombok.Data;

@Entity
@Table(name = "delivery_routes")
@lombok.Getter
@lombok.Setter
@lombok.ToString(onlyExplicitlyIncluded = true)
public class DeliveryRoute {

    @lombok.ToString.Include
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
