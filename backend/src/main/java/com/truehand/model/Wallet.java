package com.truehand.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import lombok.Data;

@Entity
@Table(name = "wallets")
@lombok.Getter
@lombok.Setter
@lombok.ToString(onlyExplicitlyIncluded = true)
public class Wallet {

    @lombok.ToString.Include
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private BigDecimal balance = BigDecimal.ZERO;
    private LocalDateTime updatedAt;

    @PrePersist
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
