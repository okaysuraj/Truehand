package com.truehand.controller;

import com.truehand.dto.ProductDTO;
import com.truehand.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class ProductController {
    private final ProductService productService;

    @GetMapping
    public ResponseEntity<Page<ProductDTO>> getAllProducts(Pageable pageable) {
        return ResponseEntity.ok(productService.getAllProducts(pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductDTO> getProduct(@PathVariable Integer id) {
        return ResponseEntity.ok(productService.getProduct(id));
    }

    @GetMapping("/trending")
    public ResponseEntity<List<ProductDTO>> getTrendingProducts() {
        return ResponseEntity.ok(productService.getTrendingProducts());
    }

    @GetMapping("/{id}/recommendations")
    public ResponseEntity<List<ProductDTO>> getRecommendations(@PathVariable Integer id) {
        return ResponseEntity.ok(productService.getRecommendations(id));
    }

    @GetMapping("/filter")
    public ResponseEntity<Page<ProductDTO>> getFilteredProducts(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) java.math.BigDecimal minPrice,
            @RequestParam(required = false) java.math.BigDecimal maxPrice,
            @RequestParam(required = false) Double minRating,
            Pageable pageable) {
        return ResponseEntity.ok(productService.getFilteredProducts(search, category, minPrice, maxPrice, minRating, pageable));
    }

    @GetMapping("/search/{name}")
    public ResponseEntity<?> searchByName(@PathVariable String name) {
        return ResponseEntity.ok(productService.searchByName(name));
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<?> getByCategory(@PathVariable String category) {
        return ResponseEntity.ok(productService.getByCategory(category));
    }

    @GetMapping("/seller/{sellerId}")
    public ResponseEntity<?> getProductsBySeller(@PathVariable Integer sellerId) {
        return ResponseEntity.ok(productService.getProductsBySeller(sellerId));
    }

    @PostMapping
    public ResponseEntity<ProductDTO> createProduct(@RequestBody ProductDTO productDTO) {
        return ResponseEntity.ok(productService.createProduct(productDTO));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductDTO> updateProduct(@PathVariable Integer id, @RequestBody ProductDTO productDTO) {
        return ResponseEntity.ok(productService.updateProduct(id, productDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Integer id) {
        productService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/bulk-upload")
    public ResponseEntity<java.util.Map<String, String>> bulkUploadProducts(@org.springframework.web.bind.annotation.RequestParam("file") org.springframework.web.multipart.MultipartFile file) {
        // Stub for bulk upload processing (Phase 2 advanced feature)
        java.util.Map<String, String> response = new java.util.HashMap<>();
        response.put("message", "Bulk upload functionality is currently a stub.");
        response.put("status", "pending_implementation");
        return ResponseEntity.ok(response);
    }

    @PostMapping("/image-search")
    public ResponseEntity<java.util.Map<String, String>> imageSearch(@org.springframework.web.bind.annotation.RequestParam("file") org.springframework.web.multipart.MultipartFile file) {
        // Stub for image search processing
        java.util.Map<String, String> response = new java.util.HashMap<>();
        response.put("message", "Image search is currently a stub.");
        response.put("status", "pending_implementation");
        return ResponseEntity.ok(response);
    }
}
