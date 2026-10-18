package com.truehand.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "deliveries")
@lombok.Getter
@lombok.Setter
@lombok.ToString(onlyExplicitlyIncluded = true)
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Delivery {

    @lombok.ToString.Include
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id", nullable = false, unique = true)
    private Order order;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "delivery_boy_id")
    private User deliveryBoy;

    @Column(columnDefinition = "VARCHAR(50) DEFAULT 'PENDING'")
    private String status;

    private LocalDateTime estimatedDeliveryTime;
    private LocalDateTime actualDeliveryTime;

    private BigDecimal deliveryDistanceKm;

    @com.fasterxml.jackson.annotation.JsonIgnore
    private String otpHash;

    @com.fasterxml.jackson.annotation.JsonIgnore
    private LocalDateTime otpIssuedAt;

    @com.fasterxml.jackson.annotation.JsonIgnore
    private LocalDateTime otpExpiresAt;

    @com.fasterxml.jackson.annotation.JsonIgnore
    private Integer otpAttempts;

    @com.fasterxml.jackson.annotation.JsonIgnore
    private LocalDateTime otpVerifiedAt;

    @Column(updatable = false)
    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();

    @Builder.Default
    private LocalDateTime updatedAt = LocalDateTime.now();

    @OneToMany(mappedBy = "delivery", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Location> locations;
}
