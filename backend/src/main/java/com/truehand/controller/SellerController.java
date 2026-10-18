package com.truehand.controller;

import com.truehand.dto.SellerOrderItemDTO;
import com.truehand.dto.SellerProfileDTO;
import com.truehand.dto.SellerStatsDTO;
import com.truehand.service.SellerService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/seller")
@RequiredArgsConstructor
public class SellerController {

    private final SellerService sellerService;

    @GetMapping("/{sellerId}/stats")
    @org.springframework.security.access.prepost.PreAuthorize("@accessPolicy.isOwner(#sellerId)")
    public ResponseEntity<SellerStatsDTO> getStats(@PathVariable Integer sellerId) {
        return ResponseEntity.ok(sellerService.getSellerStats(sellerId));
    }

    @GetMapping("/{id}/orders")
    @org.springframework.security.access.prepost.PreAuthorize("@accessPolicy.isOwner(#id)")
    public ResponseEntity<?> getSellerOrders(
        @PathVariable Integer id,
        @RequestParam(defaultValue = "false") boolean paged,
        org.springframework.data.domain.Pageable pageable
    ) {
        return ResponseEntity.ok(
            PagedResponses.body(sellerService.getSellerOrders(id, pageable), paged)
        );
    }

    @PutMapping("/{id}/orders/{orderNumber}/status")
    @org.springframework.security.access.prepost.PreAuthorize("@accessPolicy.isOwner(#id)")
    public ResponseEntity<SellerOrderItemDTO> updateOrderStatus(
        @PathVariable Integer id,
        @PathVariable String orderNumber,
        @RequestBody java.util.Map<String, String> body
    ) {
        return ResponseEntity.ok(
            sellerService.updateOrderStatus(id, orderNumber, body.get("status"))
        );
    }

    @PostMapping("/{id}/kyc")
    @org.springframework.security.access.prepost.PreAuthorize("@accessPolicy.isOwner(#id)")
    public ResponseEntity<SellerProfileDTO> submitKYC(
        @PathVariable Integer id,
        @RequestBody SellerProfileDTO dto
    ) {
        return ResponseEntity.ok(sellerService.submitKYC(id, dto));
    }

    @GetMapping("/{id}/kyc")
    @org.springframework.security.access.prepost.PreAuthorize("@accessPolicy.isOwner(#id)")
    public ResponseEntity<SellerProfileDTO> getKYC(@PathVariable Integer id) {
        return ResponseEntity.ok(sellerService.getProfile(id));
    }
}
