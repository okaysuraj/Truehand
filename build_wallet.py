import os

wallet_model = """package com.truehand.model;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "wallets")
@Data
public class Wallet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private BigDecimal balance = BigDecimal.ZERO;
    private LocalDateTime updatedAt;

    @PrePersist
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
"""

transaction_model = """package com.truehand.model;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "wallet_transactions")
@Data
public class WalletTransaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "wallet_id", nullable = false)
    private Wallet wallet;

    private BigDecimal amount;
    private String type; // CREDIT, DEBIT
    private String description;
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
"""

wallet_repo = """package com.truehand.repository;

import com.truehand.model.Wallet;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface WalletRepository extends JpaRepository<Wallet, Integer> {
    Optional<Wallet> findByUserId(Integer userId);
}
"""

tx_repo = """package com.truehand.repository;

import com.truehand.model.WalletTransaction;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface WalletTransactionRepository extends JpaRepository<WalletTransaction, Integer> {
    List<WalletTransaction> findByWalletIdOrderByCreatedAtDesc(Integer walletId);
}
"""

wallet_service = """package com.truehand.service;

import com.truehand.model.User;
import com.truehand.model.Wallet;
import com.truehand.model.WalletTransaction;
import com.truehand.repository.UserRepository;
import com.truehand.repository.WalletRepository;
import com.truehand.repository.WalletTransactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class WalletService {
    private final WalletRepository walletRepository;
    private final WalletTransactionRepository txRepository;
    private final UserRepository userRepository;

    public Wallet getWalletByUserId(Integer userId) {
        return walletRepository.findByUserId(userId).orElseGet(() -> {
            Wallet wallet = new Wallet();
            wallet.setUser(userRepository.findById(userId).orElseThrow());
            wallet.setBalance(BigDecimal.ZERO);
            return walletRepository.save(wallet);
        });
    }

    public List<WalletTransaction> getTransactionsByUserId(Integer userId) {
        Wallet wallet = getWalletByUserId(userId);
        return txRepository.findByWalletIdOrderByCreatedAtDesc(wallet.getId());
    }

    @Transactional
    public WalletTransaction addTransaction(Integer userId, BigDecimal amount, String type, String description) {
        Wallet wallet = getWalletByUserId(userId);
        
        if (type.equals("CREDIT")) {
            wallet.setBalance(wallet.getBalance().add(amount));
        } else if (type.equals("DEBIT")) {
            if (wallet.getBalance().compareTo(amount) < 0) {
                throw new RuntimeException("Insufficient balance");
            }
            wallet.setBalance(wallet.getBalance().subtract(amount));
        }
        walletRepository.save(wallet);

        WalletTransaction tx = new WalletTransaction();
        tx.setWallet(wallet);
        tx.setAmount(amount);
        tx.setType(type);
        tx.setDescription(description);
        return txRepository.save(tx);
    }
}
"""

wallet_controller = """package com.truehand.controller;

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
"""

def write(path, content):
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

base = 'backend/src/main/java/com/truehand/'
write(base + 'model/Wallet.java', wallet_model)
write(base + 'model/WalletTransaction.java', transaction_model)
write(base + 'repository/WalletRepository.java', wallet_repo)
write(base + 'repository/WalletTransactionRepository.java', tx_repo)
write(base + 'service/WalletService.java', wallet_service)
write(base + 'controller/WalletController.java', wallet_controller)

print('Wallet backend created.')
