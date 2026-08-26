package com.truehand.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "bank_accounts")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BankAccount {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private String bankName;

    @Column(nullable = false)
    private String accountType;

    @Column(nullable = false, length = 4)
    private String lastFour;

    private boolean isDefault;

    @Column(nullable = false)
    private String status;
    
    @Column(nullable = false)
    private String routingNumber;
    
    @Column(nullable = false)
    private String accountName;
    
    @Transient
    private String accountNumber;
}
