package com.truehand.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "users")
@lombok.Getter
@lombok.Setter
@lombok.ToString(onlyExplicitlyIncluded = true)
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @lombok.ToString.Include
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(unique = true, nullable = false)
    private String email;

    private String firebaseUid;

    @Column(nullable = false)
    @com.fasterxml.jackson.annotation.JsonIgnore
    private String passwordHash;

    private String firstName;
    private String lastName;
    private String phone;

    @Column(columnDefinition = "TEXT")
    private String bio;

    @Column(columnDefinition = "VARCHAR(50) DEFAULT 'CUSTOMER'")
    private String role;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @com.fasterxml.jackson.annotation.JsonIgnore
    private List<Address> addresses;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @com.fasterxml.jackson.annotation.JsonIgnore
    private Cart cart;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @com.fasterxml.jackson.annotation.JsonIgnore
    private SellerProfile sellerProfile;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @com.fasterxml.jackson.annotation.JsonIgnore
    private DeliveryPersonnel deliveryPersonnel;

    @Column(columnDefinition = "BOOLEAN DEFAULT FALSE")
    private Boolean emailVerified;

    @com.fasterxml.jackson.annotation.JsonIgnore
    private String emailVerificationToken;

    private LocalDateTime emailVerificationTokenExpiry;

    @com.fasterxml.jackson.annotation.JsonIgnore
    private String resetPasswordToken;

    private LocalDateTime resetPasswordTokenExpiry;

    @Column(columnDefinition = "BOOLEAN DEFAULT TRUE")
    private Boolean isActive;

    @Column(updatable = false)
    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();

    @Builder.Default
    private LocalDateTime updatedAt = LocalDateTime.now();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    @com.fasterxml.jackson.annotation.JsonIgnore
    private List<Order> orders;

    @OneToMany(mappedBy = "deliveryBoy")
    @com.fasterxml.jackson.annotation.JsonIgnore
    private List<Delivery> deliveries;
}
