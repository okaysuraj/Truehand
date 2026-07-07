package com.truehand.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "delivery_personnel")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DeliveryPersonnel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    private String vehicleType; // e.g. BIKE, SCOOTER, VAN
    private String vehicleRegistrationNumber;
    private String drivingLicenseNumber;

    @Column(columnDefinition = "VARCHAR(50) DEFAULT 'PENDING'")
    private String kycStatus;

    private String rejectionReason;

    private Boolean isAvailable; // Online/Offline status
}
