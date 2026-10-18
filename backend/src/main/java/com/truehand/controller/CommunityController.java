package com.truehand.controller;

import com.truehand.service.MarketplaceFeatureService;
import java.util.*;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

/** Public artisan profiles, community interactions, and commission requests. */
@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class CommunityController {

    private final MarketplaceFeatureService features;
    private final com.truehand.service.ProductService products;

    @GetMapping("/community/banners")
    public Object banners() {
        return features.banners(false);
    }

    @GetMapping("/community/artisans")
    public Object publicArtisans(
        @RequestParam(defaultValue = "false") boolean paged,
        org.springframework.data.domain.Pageable pageable
    ) {
        return PagedResponses.body(
            features.page(
                "u.id,u.first_name,u.last_name,u.bio,p.business_name,s.shop_description,s.banner_image_url",
                "from users u join seller_profiles p on p.user_id=u.id left join shop_customizations s on s.seller_id=u.id where u.role='SELLER' and u.is_active=true and p.kyc_status='APPROVED'",
                "u.id",
                pageable
            ),
            paged
        );
    }

    @GetMapping("/community/artisans/{id}")
    public Object artisan(@PathVariable int id) {
        return features.one(
            "select u.id,u.first_name,u.last_name,u.bio,p.business_name,s.shop_description,s.banner_image_url from users u join seller_profiles p on p.user_id=u.id left join shop_customizations s on s.seller_id=u.id where u.id=? and u.role='SELLER' and u.is_active=true and p.kyc_status='APPROVED'",
            id
        );
    }

    @GetMapping("/community/commissions")
    public Object commissions() {
        return features.commissions();
    }

    @PostMapping("/community/commissions")
    public Object commission(@RequestBody Map<String, Object> body) {
        return features.createCommission(body);
    }

    @PutMapping("/community/commissions/{id}")
    public Object commissionAction(@PathVariable long id, @RequestBody Map<String, Object> body) {
        return features.commissionAction(id, body);
    }

    @GetMapping("/social/posts/{id}/comments")
    public Object comments(@PathVariable int id) {
        return features.comments(id);
    }

    @PostMapping("/social/posts/{id}/comments")
    public Object comment(@PathVariable int id, @RequestBody Map<String, Object> body) {
        return features.comment(id, body);
    }

    @PostMapping("/social/posts/{id}/like")
    public Object like(@PathVariable int id) {
        return features.like(id, true);
    }

    @DeleteMapping("/social/posts/{id}/like")
    public Object unlike(@PathVariable int id) {
        return features.like(id, false);
    }

    @GetMapping("/products/{id}/gallery")
    public Object gallery(@PathVariable int id) {
        return features.gallery(id);
    }
}
