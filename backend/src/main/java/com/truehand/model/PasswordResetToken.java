package com.truehand.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import lombok.Data;

@Entity
@Table(name = "password_reset_tokens")
@lombok.Getter
@lombok.Setter
@lombok.ToString(onlyExplicitlyIncluded = true)
public class PasswordResetToken {

    @lombok.ToString.Include
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private String token;
    private LocalDateTime expiryDate;

    @PrePersist
    protected void onCreate() {
        expiryDate = LocalDateTime.now().plusHours(1); // 1 hour expiry
    }
}
