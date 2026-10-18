package com.truehand.repository;

import com.truehand.model.SellerSubscription;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SellerSubscriptionRepository extends JpaRepository<SellerSubscription, Integer> {
    Optional<SellerSubscription> findBySellerId(Integer sellerId);
}
