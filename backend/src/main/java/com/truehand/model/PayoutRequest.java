package com.truehand.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import lombok.*;

@Entity
@Table(name = "payout_requests")
@lombok.Getter
@lombok.Setter
@lombok.ToString(onlyExplicitlyIncluded = true)
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PayoutRequest {

    @lombok.ToString.Include
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
    private Integer bankAccountId;

    @Column(unique = true)
    private String requestKey;

    private String transferReference;
    private String transferReceiptUrl;
    private Integer settledBy;
    private LocalDateTime settledAt;
}
