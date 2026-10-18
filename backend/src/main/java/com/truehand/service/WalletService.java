package com.truehand.service;

import com.truehand.model.User;
import com.truehand.model.Wallet;
import com.truehand.model.WalletTransaction;
import com.truehand.repository.UserRepository;
import com.truehand.repository.WalletRepository;
import com.truehand.repository.WalletTransactionRepository;
import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class WalletService {

    private final WalletRepository walletRepository;
    private final WalletTransactionRepository txRepository;
    private final UserRepository userRepository;
    private final LedgerService ledger;

    public Wallet getWalletByUserId(Integer userId) {
        userRepository
            .findByIdForUpdate(userId)
            .orElseThrow(() -> new IllegalArgumentException("User not found"));
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
    public WalletTransaction addTransaction(
        Integer userId,
        BigDecimal amount,
        String type,
        String description
    ) {
        WalletTransaction transaction = applyTransaction(userId, amount, type, description);
        ledger.transfer(
            "wallet-transaction-" + transaction.getId(),
            description,
            "CREDIT".equals(type) ? "ADJUSTMENTS" : "WALLET:" + userId,
            "CREDIT".equals(type) ? "WALLET:" + userId : "ADJUSTMENTS",
            amount
        );
        return transaction;
    }

    WalletTransaction applyTransaction(
        Integer userId,
        BigDecimal amount,
        String type,
        String description
    ) {
        if (
            amount == null ||
            amount.signum() <= 0 ||
            amount.scale() > 2 ||
            !java.util.Set.of("CREDIT", "DEBIT").contains(type == null ? "" : type)
        ) {
            throw new IllegalArgumentException(
                "A positive amount with at most two decimal places and CREDIT or DEBIT type is required"
            );
        }
        Wallet wallet = getWalletByUserId(userId);

        if (type.equals("CREDIT")) {
            wallet.setBalance(wallet.getBalance().add(amount));
        } else if (type.equals("DEBIT")) {
            if (wallet.getBalance().compareTo(amount) < 0) {
                throw new IllegalArgumentException("Insufficient balance");
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
