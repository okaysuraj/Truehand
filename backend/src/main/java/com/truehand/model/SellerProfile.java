package com.truehand.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "seller_profiles")
@lombok.Getter
@lombok.Setter
@lombok.ToString(onlyExplicitlyIncluded = true)
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SellerProfile {

    @lombok.ToString.Include
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @Column(nullable = false)
    private String businessName;

    @Convert(converter = com.truehand.security.EncryptedValueConverter.class)
    @Column(columnDefinition = "text")
    @com.fasterxml.jackson.annotation.JsonProperty(
        access = com.fasterxml.jackson.annotation.JsonProperty.Access.WRITE_ONLY
    )
    private String panNumber;

    private String gstNumber;

    @Convert(converter = com.truehand.security.EncryptedValueConverter.class)
    @Column(columnDefinition = "text")
    @com.fasterxml.jackson.annotation.JsonProperty(
        access = com.fasterxml.jackson.annotation.JsonProperty.Access.WRITE_ONLY
    )
    private String bankAccountNumber;

    private String ifscCode;

    @Column(columnDefinition = "VARCHAR(50) DEFAULT 'PENDING'")
    private String kycStatus; // PENDING, APPROVED, REJECTED

    private String rejectionReason;

    @Column(updatable = false)
    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
