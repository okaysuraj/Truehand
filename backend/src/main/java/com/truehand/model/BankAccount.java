package com.truehand.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import lombok.*;

@Entity
@Table(name = "bank_accounts")
@lombok.Getter
@lombok.Setter
@lombok.ToString(onlyExplicitlyIncluded = true)
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BankAccount {

    @lombok.ToString.Include
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
    @com.fasterxml.jackson.annotation.JsonProperty(
        access = com.fasterxml.jackson.annotation.JsonProperty.Access.WRITE_ONLY
    )
    private String accountNumber;

    @com.fasterxml.jackson.annotation.JsonIgnore
    @Convert(converter = com.truehand.security.EncryptedValueConverter.class)
    @Column(columnDefinition = "text")
    private String encryptedAccountNumber;

    private String verificationReference;
    private Integer verifiedBy;
    private LocalDateTime verifiedAt;
}
