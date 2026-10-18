package com.truehand.controller;

import com.truehand.security.AccessPolicy;
import com.truehand.service.CartService;
import java.util.*;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartService carts;
    private final AccessPolicy access;

    @GetMapping
    public List<Map<String, Object>> get() {
        return carts.get(access.currentUser().getId());
    }

    @PostMapping("/items/{productId}")
    public List<Map<String, Object>> add(
        @PathVariable Integer productId,
        @RequestBody Map<String, Integer> body
    ) {
        return carts.setQuantity(
            access.currentUser().getId(),
            productId,
            body.get("variantId"),
            body.getOrDefault("quantity", 1),
            true
        );
    }

    @PutMapping("/items/{productId}")
    public List<Map<String, Object>> update(
        @PathVariable Integer productId,
        @RequestBody Map<String, Integer> body
    ) {
        if (body.get("quantity") == null) throw new IllegalArgumentException(
            "Quantity is required"
        );
        return carts.setQuantity(
            access.currentUser().getId(),
            productId,
            body.get("variantId"),
            body.get("quantity"),
            false
        );
    }

    @DeleteMapping("/items/{productId}")
    public List<Map<String, Object>> remove(
        @PathVariable Integer productId,
        @RequestParam(required = false) Integer variantId
    ) {
        return carts.setQuantity(access.currentUser().getId(), productId, variantId, 0, false);
    }

    @DeleteMapping
    public void clear() {
        carts.clear(access.currentUser().getId());
    }
}
