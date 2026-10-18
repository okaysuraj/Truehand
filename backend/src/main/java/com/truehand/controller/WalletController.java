package com.truehand.controller;

import com.truehand.model.User;
import com.truehand.model.Wallet;
import com.truehand.model.WalletTransaction;
import com.truehand.service.WalletService;
import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/wallet")
@RequiredArgsConstructor
public class WalletController {

    private final WalletService walletService;

    private boolean isAuthorized(Integer userId, Authentication authentication) {
        if (authentication == null) return false;
        if (authentication.getPrincipal() instanceof User user) {
            return user.getId().equals(userId) || "ADMIN".equalsIgnoreCase(user.getRole());
        }
        return false;
    }

    @GetMapping("/{userId}")
    public ResponseEntity<?> getWallet(
        @PathVariable Integer userId,
        Authentication authentication
    ) {
        if (!isAuthorized(userId, authentication)) {
            return ResponseEntity.status(403).body(Map.of("error", "Access denied"));
        }
        return ResponseEntity.ok(walletService.getWalletByUserId(userId));
    }

    @GetMapping("/{userId}/transactions")
    public ResponseEntity<?> getTransactions(
        @PathVariable Integer userId,
        Authentication authentication
    ) {
        if (!isAuthorized(userId, authentication)) {
            return ResponseEntity.status(403).body(Map.of("error", "Access denied"));
        }
        return ResponseEntity.ok(walletService.getTransactionsByUserId(userId));
    }

    @PostMapping("/{userId}/transaction")
    public ResponseEntity<?> createTransaction(
        @PathVariable Integer userId,
        @RequestBody Map<String, String> body,
        Authentication authentication
    ) {
        if (authentication == null || !(authentication.getPrincipal() instanceof User user)) {
            return ResponseEntity.status(401).body(Map.of("error", "Authentication required"));
        }
        // Direct transaction creation is restricted to platform ADMINs
        if (!"ADMIN".equalsIgnoreCase(user.getRole())) {
            return ResponseEntity.status(403).body(
                Map.of("error", "Direct wallet adjustment requires administrator privileges")
            );
        }
        BigDecimal amount = new BigDecimal(body.get("amount"));
        return ResponseEntity.ok(
            walletService.addTransaction(userId, amount, body.get("type"), body.get("description"))
        );
    }
}
