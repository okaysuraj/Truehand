import os

models_customization = """package com.truehand.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "shop_customizations")
@Data
public class ShopCustomization {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @OneToOne
    @JoinColumn(name = "seller_id", nullable = false)
    private User seller;

    private String bannerImageUrl;
    private String shopDescription;
    private String brandColorHex; // e.g., #FFFFFF
    
    private LocalDateTime updatedAt;
    
    @PrePersist
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
"""

models_subscription = """package com.truehand.model;

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
"""

repo_customization = """package com.truehand.repository;

import com.truehand.model.ShopCustomization;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface ShopCustomizationRepository extends JpaRepository<ShopCustomization, Integer> {
    Optional<ShopCustomization> findBySellerId(Integer sellerId);
}
"""

repo_subscription = """package com.truehand.repository;

import com.truehand.model.SellerSubscription;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface SellerSubscriptionRepository extends JpaRepository<SellerSubscription, Integer> {
    Optional<SellerSubscription> findBySellerId(Integer sellerId);
}
"""

controller = """package com.truehand.controller;

import com.truehand.model.ShopCustomization;
import com.truehand.model.SellerSubscription;
import com.truehand.model.User;
import com.truehand.repository.ShopCustomizationRepository;
import com.truehand.repository.SellerSubscriptionRepository;
import com.truehand.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.Map;

@RestController
@RequestMapping("/api/sellers")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class SellerStorefrontController {
    private final ShopCustomizationRepository customizationRepository;
    private final SellerSubscriptionRepository subscriptionRepository;
    private final UserRepository userRepository;

    @GetMapping("/{id}/storefront")
    public ResponseEntity<ShopCustomization> getStorefront(@PathVariable Integer id) {
        ShopCustomization customization = customizationRepository.findBySellerId(id).orElseGet(() -> {
            ShopCustomization c = new ShopCustomization();
            c.setSeller(userRepository.findById(id).orElseThrow());
            c.setBrandColorHex("#2E6C36");
            return customizationRepository.save(c);
        });
        return ResponseEntity.ok(customization);
    }
    
    @PutMapping("/{id}/storefront")
    public ResponseEntity<ShopCustomization> updateStorefront(@PathVariable Integer id, @RequestBody ShopCustomization update) {
        ShopCustomization customization = customizationRepository.findBySellerId(id).orElseThrow();
        customization.setBannerImageUrl(update.getBannerImageUrl());
        customization.setShopDescription(update.getShopDescription());
        customization.setBrandColorHex(update.getBrandColorHex());
        return ResponseEntity.ok(customizationRepository.save(customization));
    }
    
    @GetMapping("/{id}/subscription")
    public ResponseEntity<SellerSubscription> getSubscription(@PathVariable Integer id) {
        SellerSubscription subscription = subscriptionRepository.findBySellerId(id).orElseGet(() -> {
            SellerSubscription s = new SellerSubscription();
            s.setSeller(userRepository.findById(id).orElseThrow());
            s.setPlanName("FREE");
            s.setStatus("ACTIVE");
            s.setExpiresAt(LocalDateTime.now().plusYears(100)); // forever free
            return subscriptionRepository.save(s);
        });
        return ResponseEntity.ok(subscription);
    }
    
    @PostMapping("/{id}/subscribe")
    public ResponseEntity<SellerSubscription> subscribe(@PathVariable Integer id, @RequestBody Map<String, String> body) {
        SellerSubscription subscription = subscriptionRepository.findBySellerId(id).orElseThrow();
        subscription.setPlanName(body.get("planName"));
        subscription.setExpiresAt(LocalDateTime.now().plusMonths(1));
        subscription.setStatus("ACTIVE");
        return ResponseEntity.ok(subscriptionRepository.save(subscription));
    }
}
"""

def write(path, content):
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

base = 'backend/src/main/java/com/truehand/'
write(base + 'model/ShopCustomization.java', models_customization)
write(base + 'model/SellerSubscription.java', models_subscription)
write(base + 'repository/ShopCustomizationRepository.java', repo_customization)
write(base + 'repository/SellerSubscriptionRepository.java', repo_subscription)
write(base + 'controller/SellerStorefrontController.java', controller)

print('Storefront backend created.')
