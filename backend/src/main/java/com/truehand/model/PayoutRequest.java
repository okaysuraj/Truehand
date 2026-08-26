package com.truehand.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.math.BigDecimal;

@Entity
@Table(name = "payout_requests")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PayoutRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private Integer sellerId;

    @Column(nullable = false)
    private String sellerName;

    @Column(nullable = false)
    private BigDecimal amount;

    @Column(nullable = false)
    private String status; // PENDING, APPROVED, REJECTED

    private LocalDateTime requestedAt;

    private String bankAccount;
}
