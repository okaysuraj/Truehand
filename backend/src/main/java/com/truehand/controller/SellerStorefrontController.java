package com.truehand.controller;

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
