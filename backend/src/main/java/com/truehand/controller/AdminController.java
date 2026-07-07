package com.truehand.controller;

import com.truehand.model.DeliveryPersonnel;
import com.truehand.model.SellerProfile;
import com.truehand.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class AdminController {
    private final AdminService adminService;

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
}
