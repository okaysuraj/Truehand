package com.truehand.controller;

import com.truehand.model.DeliveryPersonnel;
import com.truehand.model.SellerProfile;
import com.truehand.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

import com.truehand.service.ProductService;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class AdminController {
    private final AdminService adminService;
    private final ProductService productService;

    @GetMapping("/kyc/seller/pending")
    public ResponseEntity<List<SellerProfile>> getPendingSellers() {
        return ResponseEntity.ok(adminService.getPendingSellers());
    }

    @GetMapping("/kyc/delivery/pending")
    public ResponseEntity<List<DeliveryPersonnel>> getPendingDeliveryPartners() {
        return ResponseEntity.ok(adminService.getPendingDeliveryPartners());
    }

    @PutMapping("/kyc/seller/{sellerId}")
    public ResponseEntity<SellerProfile> updateSellerKyc(@PathVariable Integer sellerId, @RequestBody Map<String, String> body) {
        return ResponseEntity.ok(adminService.approveSellerKyc(sellerId, body.get("status"), body.get("reason")));
    }

    @PutMapping("/kyc/delivery/{deliveryId}")
    public ResponseEntity<DeliveryPersonnel> updateDeliveryKyc(@PathVariable Integer deliveryId, @RequestBody Map<String, String> body) {
        return ResponseEntity.ok(adminService.approveDeliveryKyc(deliveryId, body.get("status"), body.get("reason")));
    }

    @GetMapping("/metrics")
    public ResponseEntity<Map<String, Object>> getMetrics() {
        return ResponseEntity.ok(adminService.getMetrics());
    }

    @GetMapping("/users")
    public ResponseEntity<List<com.truehand.model.User>> getAllUsers() {
        return ResponseEntity.ok(adminService.getAllUsers());
    }

    @GetMapping("/products/pending")
    public ResponseEntity<List<com.truehand.dto.ProductDTO>> getPendingProducts() {
        return ResponseEntity.ok(productService.getPendingProducts());
    }

    @PutMapping("/products/{id}/approve")
    public ResponseEntity<com.truehand.dto.ProductDTO> approveProduct(@PathVariable Integer id, @RequestBody Map<String, String> body) {
        return ResponseEntity.ok(productService.updateProductStatus(id, body.get("status")));
    }

    @GetMapping("/payouts")
    public ResponseEntity<List<com.truehand.model.PayoutRequest>> getAllPayouts(
            @org.springframework.beans.factory.annotation.Autowired com.truehand.repository.PayoutRequestRepository payoutRepo) {
        return ResponseEntity.ok(payoutRepo.findAll());
    }

    @PutMapping("/payouts/{id}/{action}")
    public ResponseEntity<?> updatePayoutStatus(
            @PathVariable Integer id, 
            @PathVariable String action,
            @org.springframework.beans.factory.annotation.Autowired com.truehand.repository.PayoutRequestRepository payoutRepo) {
        
        com.truehand.model.PayoutRequest payout = payoutRepo.findById(id).orElseThrow();
        payout.setStatus(action.equalsIgnoreCase("approve") ? "APPROVED" : "REJECTED");
        return ResponseEntity.ok(payoutRepo.save(payout));
    }
}
