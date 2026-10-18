package com.truehand.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import lombok.Data;

@Entity
@Table(name = "wallet_transactions")
@lombok.Getter
@lombok.Setter
@lombok.ToString(onlyExplicitlyIncluded = true)
public class WalletTransaction {

    @lombok.ToString.Include
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "wallet_id", nullable = false)
    private Wallet wallet;

    private BigDecimal amount;
    private String type; // CREDIT, DEBIT
    private String description;
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
