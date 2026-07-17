import os

variant_repo = """package com.truehand.repository;

import com.truehand.model.ProductVariant;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ProductVariantRepository extends JpaRepository<ProductVariant, Integer> {
    List<ProductVariant> findByProductId(Integer productId);
}
"""

variant_controller = """package com.truehand.controller;

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
"""

def write(path, content):
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

base = 'backend/src/main/java/com/truehand/'
write(base + 'repository/ProductVariantRepository.java', variant_repo)
write(base + 'controller/ProductVariantController.java', variant_controller)

print('Product Variants backend created.')
