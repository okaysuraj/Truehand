package com.truehand.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "seller_subscriptions")
@Data
public class SellerSubscription {
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
