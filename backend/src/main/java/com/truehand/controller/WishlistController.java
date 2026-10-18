package com.truehand.controller;

import com.truehand.dto.ProductDTO;
import com.truehand.service.WishlistService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@org.springframework.security.access.prepost.PreAuthorize("@accessPolicy.isOwner(#userId)")
@RequestMapping("/api/wishlist")
@RequiredArgsConstructor
public class WishlistController {

    private final WishlistService wishlistService;

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<ProductDTO>> getUserWishlist(@PathVariable Integer userId) {
        return ResponseEntity.ok(wishlistService.getUserWishlist(userId));
    }

    @PostMapping("/user/{userId}/product/{productId}")
    public ResponseEntity<Void> addProductToWishlist(
        @PathVariable Integer userId,
        @PathVariable Integer productId
    ) {
        wishlistService.addProductToWishlist(userId, productId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/user/{userId}/product/{productId}")
    public ResponseEntity<Void> removeProductFromWishlist(
        @PathVariable Integer userId,
        @PathVariable Integer productId
    ) {
        wishlistService.removeProductFromWishlist(userId, productId);
        return ResponseEntity.ok().build();
    }
}
