package com.truehand.service;

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
