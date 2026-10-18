package com.truehand.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import lombok.Data;

@Entity
@Table(name = "notifications")
@lombok.Getter
@lombok.Setter
@lombok.ToString(onlyExplicitlyIncluded = true)
public class Notification {

    @lombok.ToString.Include
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @com.fasterxml.jackson.annotation.JsonIgnore
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private String title;
    private String body;
    private String type; // SYSTEM, ORDER, PROMO
    private boolean isRead = false;

    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
