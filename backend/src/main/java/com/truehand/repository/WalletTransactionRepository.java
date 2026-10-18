package com.truehand.repository;

import com.truehand.model.WalletTransaction;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WalletTransactionRepository extends JpaRepository<WalletTransaction, Integer> {
    List<WalletTransaction> findByWalletIdOrderByCreatedAtDesc(Integer walletId);
}
