package com.truehand.repository;

import com.truehand.model.SellerSubscription;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface SellerSubscriptionRepository extends JpaRepository<SellerSubscription, Integer> {
    Optional<SellerSubscription> findBySellerId(Integer sellerId);
}
