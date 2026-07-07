package com.truehand.controller;

import com.truehand.dto.SellerOrderItemDTO;
import com.truehand.dto.SellerStatsDTO;
import com.truehand.dto.SellerProfileDTO;
import com.truehand.service.SellerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/seller")
@RequiredArgsConstructor
@CrossOrigin(originPatterns = "*")
public class SellerController {

    private final SellerService sellerService;

    @GetMapping("/{sellerId}/stats")
    public ResponseEntity<SellerStatsDTO> getStats(@PathVariable Integer sellerId) {
        return ResponseEntity.ok(sellerService.getSellerStats(sellerId));
    }

    @GetMapping("/{id}/orders")
    public ResponseEntity<List<SellerOrderItemDTO>> getSellerOrders(@PathVariable Integer id) {
        return ResponseEntity.ok(sellerService.getSellerOrders(id));
    }

    @PutMapping("/{id}/orders/{orderNumber}/status")
    public ResponseEntity<SellerOrderItemDTO> updateOrderStatus(
            @PathVariable Integer id,
            @PathVariable String orderNumber,
            @RequestBody java.util.Map<String, String> body) {
        return ResponseEntity.ok(sellerService.updateOrderStatus(id, orderNumber, body.get("status")));
    }

    @PostMapping("/{id}/kyc")
    public ResponseEntity<SellerProfileDTO> submitKYC(@PathVariable Integer id, @RequestBody SellerProfileDTO dto) {
        return ResponseEntity.ok(sellerService.submitKYC(id, dto));
    }

    @GetMapping("/{id}/kyc")
    public ResponseEntity<SellerProfileDTO> getKYC(@PathVariable Integer id) {
        return ResponseEntity.ok(sellerService.getProfile(id));
    }
}
