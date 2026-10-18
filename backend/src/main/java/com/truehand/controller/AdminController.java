package com.truehand.controller;

import com.truehand.model.DeliveryPersonnel;
import com.truehand.model.SellerProfile;
import com.truehand.service.AdminService;
import com.truehand.service.ProductService;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;
    private final ProductService productService;
    private final com.truehand.repository.PayoutRequestRepository payoutRepo;
    private final com.truehand.service.PayoutService payoutService;
    private final com.truehand.service.MarketplaceFeatureService features;

    @GetMapping("/kyc/seller/pending")
    public ResponseEntity<?> getPendingSellers(
        @RequestParam(defaultValue = "false") boolean paged,
        org.springframework.data.domain.Pageable pageable
    ) {
        return ResponseEntity.ok(
            PagedResponses.body(adminService.getPendingSellers(pageable), paged)
        );
    }

    @GetMapping("/kyc/delivery/pending")
    public ResponseEntity<?> getPendingDeliveryPartners(
        @RequestParam(defaultValue = "false") boolean paged,
        org.springframework.data.domain.Pageable pageable
    ) {
        return ResponseEntity.ok(
            PagedResponses.body(adminService.getPendingDeliveryPartners(pageable), paged)
        );
    }

    @PutMapping("/kyc/seller/{sellerId}")
    public ResponseEntity<SellerProfile> updateSellerKyc(
        @PathVariable Integer sellerId,
        @RequestBody Map<String, String> body
    ) {
        return ResponseEntity.ok(
            adminService.approveSellerKyc(sellerId, body.get("status"), body.get("reason"))
        );
    }

    @PutMapping("/kyc/delivery/{deliveryId}")
    public ResponseEntity<DeliveryPersonnel> updateDeliveryKyc(
        @PathVariable Integer deliveryId,
        @RequestBody Map<String, String> body
    ) {
        return ResponseEntity.ok(
            adminService.approveDeliveryKyc(deliveryId, body.get("status"), body.get("reason"))
        );
    }

    @GetMapping("/metrics")
    public ResponseEntity<Map<String, Object>> getMetrics() {
        return ResponseEntity.ok(adminService.getMetrics());
    }

    @GetMapping("/users")
    public ResponseEntity<?> getAllUsers(
        @RequestParam(defaultValue = "false") boolean paged,
        org.springframework.data.domain.Pageable pageable
    ) {
        return ResponseEntity.ok(PagedResponses.body(adminService.getAllUsers(pageable), paged));
    }

    @GetMapping("/products/pending")
    public ResponseEntity<?> getPendingProducts(
        @RequestParam(defaultValue = "false") boolean paged,
        org.springframework.data.domain.Pageable pageable
    ) {
        return ResponseEntity.ok(
            PagedResponses.body(productService.getPendingProducts(pageable), paged)
        );
    }

    @PutMapping("/products/{id}/approve")
    @org.springframework.transaction.annotation.Transactional
    public ResponseEntity<com.truehand.dto.ProductDTO> approveProduct(
        @PathVariable Integer id,
        @RequestBody Map<String, String> body
    ) {
        var result = productService.updateProductStatus(id, body.get("status"));
        features.audit(body.get("status"), "PRODUCT", id, Map.of());
        return ResponseEntity.ok(result);
    }

    @GetMapping("/payouts")
    public ResponseEntity<?> getAllPayouts(
        @RequestParam(defaultValue = "false") boolean paged,
        org.springframework.data.domain.Pageable pageable
    ) {
        return ResponseEntity.ok(
            PagedResponses.body(
                payoutRepo.findAll(
                    PagedResponses.bounded(
                        pageable,
                        org.springframework.data.domain.Sort.by(
                            org.springframework.data.domain.Sort.Direction.DESC,
                            "requestedAt",
                            "id"
                        )
                    )
                ),
                paged
            )
        );
    }

    @PutMapping("/payouts/{id}/{action}")
    public ResponseEntity<?> updatePayoutStatus(
        @PathVariable Integer id,
        @PathVariable String action
    ) {
        return ResponseEntity.ok(payoutService.decide(id, action));
    }
}
