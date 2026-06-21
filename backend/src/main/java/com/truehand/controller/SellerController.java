package com.truehand.controller;

import com.truehand.dto.SellerOrderItemDTO;
import com.truehand.dto.SellerStatsDTO;
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

    @GetMapping("/{sellerId}/orders")
    public ResponseEntity<List<SellerOrderItemDTO>> getOrders(@PathVariable Integer sellerId) {
        return ResponseEntity.ok(sellerService.getSellerOrders(sellerId));
    }
}
