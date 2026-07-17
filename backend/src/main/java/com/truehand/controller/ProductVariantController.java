package com.truehand.controller;

import com.truehand.model.Product;
import com.truehand.model.ProductVariant;
import com.truehand.repository.ProductRepository;
import com.truehand.repository.ProductVariantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/products/{productId}/variants")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ProductVariantController {
    private final ProductRepository productRepository;
    private final ProductVariantRepository variantRepository;

    @GetMapping
    public ResponseEntity<List<ProductVariant>> getVariants(@PathVariable Integer productId) {
        return ResponseEntity.ok(variantRepository.findByProductId(productId));
    }

    @PostMapping
    public ResponseEntity<?> addVariant(@PathVariable Integer productId, @RequestBody Map<String, String> body) {
        Product product = productRepository.findById(productId).orElse(null);
        if (product == null) return ResponseEntity.badRequest().body("Product not found");

        ProductVariant variant = new ProductVariant();
        variant.setProduct(product);
        variant.setSku(body.get("sku"));
        variant.setSize(body.get("size"));
        variant.setColor(body.get("color"));
        variant.setAdditionalPrice(new BigDecimal(body.getOrDefault("additionalPrice", "0")));
        variant.setStockQuantity(Integer.parseInt(body.getOrDefault("stockQuantity", "0")));
        
        return ResponseEntity.ok(variantRepository.save(variant));
    }
    
    @DeleteMapping("/{variantId}")
    public ResponseEntity<?> deleteVariant(@PathVariable Integer productId, @PathVariable Integer variantId) {
        variantRepository.deleteById(variantId);
        return ResponseEntity.ok().build();
    }
}
