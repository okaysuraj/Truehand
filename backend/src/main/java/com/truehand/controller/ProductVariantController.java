package com.truehand.controller;

import com.truehand.model.Product;
import com.truehand.model.ProductVariant;
import com.truehand.repository.ProductRepository;
import com.truehand.repository.ProductVariantRepository;
import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/products/{productId}/variants")
@RequiredArgsConstructor
public class ProductVariantController {

    private final ProductRepository productRepository;
    private final ProductVariantRepository variantRepository;
    private final com.truehand.service.VariantService service;
    private final ProductController catalog;

    @GetMapping
    public ResponseEntity<List<ProductVariant>> getVariants(
        @PathVariable Integer productId,
        org.springframework.security.core.Authentication authentication
    ) {
        catalog.getProduct(productId, authentication);
        return ResponseEntity.ok(
            variantRepository
                .findByProductId(productId)
                .stream()
                .filter(v -> Boolean.TRUE.equals(v.getIsActive()))
                .toList()
        );
    }

    @PostMapping
    @org.springframework.security.access.prepost.PreAuthorize(
        "@accessPolicy.canEditProduct(#productId)"
    )
    public ResponseEntity<?> addVariant(
        @PathVariable Integer productId,
        @RequestBody Map<String, Object> body
    ) {
        return ResponseEntity.ok(service.save(productId, null, body));
    }

    @PutMapping("/{variantId}")
    @org.springframework.security.access.prepost.PreAuthorize(
        "@accessPolicy.canEditProduct(#productId)"
    )
    public ResponseEntity<?> updateVariant(
        @PathVariable Integer productId,
        @PathVariable Integer variantId,
        @RequestBody Map<String, Object> body
    ) {
        return ResponseEntity.ok(service.save(productId, variantId, body));
    }

    @DeleteMapping("/{variantId}")
    @org.springframework.security.access.prepost.PreAuthorize(
        "@accessPolicy.canEditProduct(#productId)"
    )
    public ResponseEntity<?> deleteVariant(
        @PathVariable Integer productId,
        @PathVariable Integer variantId
    ) {
        service.retire(productId, variantId);
        return ResponseEntity.ok().build();
    }
}
