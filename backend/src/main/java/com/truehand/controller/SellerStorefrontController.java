package com.truehand.controller;

import com.truehand.model.ShopCustomization;
import com.truehand.repository.ShopCustomizationRepository;
import com.truehand.repository.UserRepository;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/sellers")
@RequiredArgsConstructor
public class SellerStorefrontController {

    private final ShopCustomizationRepository customizationRepository;
    private final UserRepository userRepository;
    private final com.truehand.service.SubscriptionBillingService billing;

    @GetMapping("/{id}/storefront")
    public ResponseEntity<ShopCustomization> getStorefront(@PathVariable Integer id) {
        var seller = userRepository.findById(id).orElseThrow();
        if (!"SELLER".equals(seller.getRole())) throw new IllegalArgumentException(
            "Seller not found"
        );
        ShopCustomization customization = customizationRepository
            .findBySellerId(id)
            .orElseGet(() -> {
                var record = new ShopCustomization();
                record.setSeller(seller);
                return record;
            });
        return ResponseEntity.ok(customization);
    }

    @PutMapping("/{id}/storefront")
    @org.springframework.security.access.prepost.PreAuthorize(
        "hasAnyRole('SELLER', 'ADMIN') and @accessPolicy.isOwner(#id)"
    )
    public ResponseEntity<ShopCustomization> updateStorefront(
        @PathVariable Integer id,
        @RequestBody ShopCustomization update
    ) {
        ShopCustomization customization = customizationRepository
            .findBySellerId(id)
            .orElseGet(() -> {
                var record = new ShopCustomization();
                record.setSeller(userRepository.findById(id).orElseThrow());
                return record;
            });
        if (
            update.getBannerImageUrl() != null && !update.getBannerImageUrl().startsWith("https://")
        ) throw new IllegalArgumentException("Use an HTTPS banner image");
        if (
            update.getBrandColorHex() != null &&
            !update.getBrandColorHex().matches("#[a-fA-F0-9]{6}")
        ) throw new IllegalArgumentException("Use a six digit hex color");
        customization.setBannerImageUrl(update.getBannerImageUrl());
        customization.setShopDescription(update.getShopDescription());
        customization.setBrandColorHex(update.getBrandColorHex());
        return ResponseEntity.ok(customizationRepository.save(customization));
    }

    @GetMapping("/{id}/subscription")
    @org.springframework.security.access.prepost.PreAuthorize(
        "hasAnyRole('SELLER', 'ADMIN') and @accessPolicy.isOwner(#id)"
    )
    public ResponseEntity<?> getSubscription(@PathVariable Integer id) {
        return ResponseEntity.ok(billing.subscription(id));
    }

    @GetMapping("/{id}/subscription-purchases")
    @org.springframework.security.access.prepost.PreAuthorize(
        "hasAnyRole('SELLER', 'ADMIN') and @accessPolicy.isOwner(#id)"
    )
    public Object purchases(@PathVariable Integer id) {
        return billing.history(id);
    }

    @PostMapping("/{id}/subscription-purchases/{purchaseId}/refresh")
    @org.springframework.security.access.prepost.PreAuthorize(
        "hasAnyRole('SELLER', 'ADMIN') and @accessPolicy.isOwner(#id)"
    )
    public Object refreshPurchase(@PathVariable Integer id, @PathVariable Long purchaseId)
        throws com.stripe.exception.StripeException {
        return billing.refresh(id, purchaseId);
    }

    @PostMapping("/{id}/subscribe")
    @org.springframework.security.access.prepost.PreAuthorize(
        "hasAnyRole('SELLER', 'ADMIN') and @accessPolicy.isOwner(#id)"
    )
    public ResponseEntity<?> subscribe(
        @PathVariable Integer id,
        @RequestBody Map<String, Object> body
    ) throws com.stripe.exception.StripeException {
        return ResponseEntity.ok(billing.begin(id, body));
    }
}
