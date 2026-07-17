package com.truehand.controller;

import com.truehand.model.Wallet;
import com.truehand.model.WalletTransaction;
import com.truehand.service.WalletService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/wallet")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class WalletController {
    private final WalletService walletService;

    @GetMapping("/{userId}")
    public ResponseEntity<Wallet> getWallet(@PathVariable Integer userId) {
        return ResponseEntity.ok(walletService.getWalletByUserId(userId));
    }

    @GetMapping("/{userId}/transactions")
    public ResponseEntity<List<WalletTransaction>> getTransactions(@PathVariable Integer userId) {
        return ResponseEntity.ok(walletService.getTransactionsByUserId(userId));
    }
    
    @PostMapping("/{userId}/transaction")
    public ResponseEntity<WalletTransaction> createTransaction(@PathVariable Integer userId, @RequestBody Map<String, String> body) {
        BigDecimal amount = new BigDecimal(body.get("amount"));
        return ResponseEntity.ok(walletService.addTransaction(userId, amount, body.get("type"), body.get("description")));
    }
}
