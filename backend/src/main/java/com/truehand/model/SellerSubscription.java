package com.truehand.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import lombok.Data;

@Entity
@Table(name = "seller_subscriptions")
@lombok.Getter
@lombok.Setter
@lombok.ToString(onlyExplicitlyIncluded = true)
public class SellerSubscription {

    @lombok.ToString.Include
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @OneToOne
    @JoinColumn(name = "seller_id", nullable = false)
    private User seller;

    private String planName; // BASIC, PREMIUM, PRO
    private LocalDateTime expiresAt;
    private String status; // ACTIVE, EXPIRED, CANCELLED

    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
