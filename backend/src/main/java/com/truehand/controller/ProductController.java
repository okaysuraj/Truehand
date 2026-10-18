package com.truehand.controller;

import com.truehand.dto.ProductDTO;
import com.truehand.service.ProductService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;
    private final com.truehand.security.AccessPolicy accessPolicy;
    private final com.truehand.service.MarketplaceFeatureService features;
    private final com.truehand.service.ProductImportService imports;
    private final com.truehand.service.IndexedMediaService media;

    @GetMapping
    public ResponseEntity<Page<ProductDTO>> getAllProducts(Pageable pageable) {
        return ResponseEntity.ok(productService.getAllProducts(pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductDTO> getProduct(
        @PathVariable Integer id,
        org.springframework.security.core.Authentication authentication
    ) {
        var product = productService.getProduct(id);
        boolean owner =
            authentication != null &&
            authentication.getPrincipal() instanceof com.truehand.model.User user &&
            ("ADMIN".equals(user.getRole()) ||
                (product.getSellerId() != null && product.getSellerId().equals(user.getId())));
        if (
            (!"APPROVED".equals(product.getStatus()) ||
                !Boolean.TRUE.equals(product.getIsAvailable())) &&
            !owner
        ) throw new org.springframework.web.server.ResponseStatusException(
            org.springframework.http.HttpStatus.NOT_FOUND,
            "Product not found"
        );
        return ResponseEntity.ok(product);
    }

    @GetMapping("/trending")
    public ResponseEntity<List<ProductDTO>> getTrendingProducts() {
        return ResponseEntity.ok(productService.getTrendingProducts());
    }

    @GetMapping("/flash-sale")
    public ResponseEntity<?> getFlashSaleProducts(
        @RequestParam(defaultValue = "false") boolean paged,
        Pageable pageable
    ) {
        return ResponseEntity.ok(
            PagedResponses.body(productService.getFlashSaleProducts(pageable), paged)
        );
    }

    @GetMapping("/{id}/recommendations")
    public ResponseEntity<List<ProductDTO>> getRecommendations(@PathVariable Integer id) {
        return ResponseEntity.ok(productService.getRecommendations(id));
    }

    @GetMapping("/recently-viewed/{userId}")
    @org.springframework.security.access.prepost.PreAuthorize("@accessPolicy.isOwner(#userId)")
    public ResponseEntity<List<ProductDTO>> getRecentlyViewed(@PathVariable Integer userId) {
        return ResponseEntity.ok(features.recent(userId));
    }

    @GetMapping("/filter")
    public ResponseEntity<Page<ProductDTO>> getFilteredProducts(
        @RequestParam(required = false) String search,
        @RequestParam(required = false) String category,
        @RequestParam(required = false) java.math.BigDecimal minPrice,
        @RequestParam(required = false) java.math.BigDecimal maxPrice,
        @RequestParam(required = false) Double minRating,
        Pageable pageable
    ) {
        return ResponseEntity.ok(
            productService.getFilteredProducts(
                search,
                category,
                minPrice,
                maxPrice,
                minRating,
                pageable
            )
        );
    }

    @GetMapping("/search/{name}")
    public ResponseEntity<?> searchByName(
        @PathVariable String name,
        @RequestParam(defaultValue = "false") boolean paged,
        Pageable pageable
    ) {
        return ResponseEntity.ok(
            PagedResponses.body(
                productService.getFilteredProducts(name, null, null, null, null, pageable),
                paged
            )
        );
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<?> getByCategory(
        @PathVariable String category,
        @RequestParam(defaultValue = "false") boolean paged,
        Pageable pageable
    ) {
        return ResponseEntity.ok(
            PagedResponses.body(
                productService.getFilteredProducts(null, category, null, null, null, pageable),
                paged
            )
        );
    }

    @GetMapping("/seller/{sellerId}")
    public ResponseEntity<?> getProductsBySeller(
        @PathVariable Integer sellerId,
        org.springframework.security.core.Authentication authentication,
        @RequestParam(defaultValue = "false") boolean paged,
        @RequestParam(required = false) String search,
        Pageable pageable
    ) {
        boolean owner =
            authentication != null &&
            authentication.getPrincipal() instanceof com.truehand.model.User user &&
            ("ADMIN".equals(user.getRole()) || user.getId().equals(sellerId));
        return ResponseEntity.ok(
            PagedResponses.body(
                productService.getProductsBySeller(sellerId, owner, search, pageable),
                paged
            )
        );
    }

    @PostMapping
    public ResponseEntity<ProductDTO> createProduct(@RequestBody ProductDTO productDTO) {
        return ResponseEntity.ok(
            productService.createProduct(productDTO, accessPolicy.currentUser().getId())
        );
    }

    @PutMapping("/{id}")
    @org.springframework.security.access.prepost.PreAuthorize("@accessPolicy.canEditProduct(#id)")
    public ResponseEntity<ProductDTO> updateProduct(
        @PathVariable Integer id,
        @RequestBody ProductDTO productDTO
    ) {
        return ResponseEntity.ok(productService.updateProduct(id, productDTO));
    }

    @DeleteMapping("/{id}")
    @org.springframework.security.access.prepost.PreAuthorize("@accessPolicy.canEditProduct(#id)")
    public ResponseEntity<Void> deleteProduct(@PathVariable Integer id) {
        productService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/bulk-upload")
    public ResponseEntity<?> bulkUploadProducts(
        @org.springframework.web.bind.annotation.RequestParam(
            "file"
        ) org.springframework.web.multipart.MultipartFile file,
        @RequestParam(defaultValue = "true") boolean preview,
        @RequestParam(required = false) String requestKey
    ) throws java.io.IOException {
        var result = imports.upload(file, preview, requestKey);
        return ResponseEntity.status(Boolean.TRUE.equals(result.get("valid")) ? 200 : 400).body(
            result
        );
    }

    @PostMapping("/image-search")
    public ResponseEntity<?> imageSearch(
        @org.springframework.web.bind.annotation.RequestParam(
            "file"
        ) org.springframework.web.multipart.MultipartFile file
    ) throws java.io.IOException {
        return ResponseEntity.ok(media.search(file));
    }

    @GetMapping("/image-search/history")
    public Object imageSearchHistory() {
        return media.history();
    }
}
