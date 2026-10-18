package com.truehand.repository;

import com.truehand.model.ShopCustomization;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ShopCustomizationRepository extends JpaRepository<ShopCustomization, Integer> {
    Optional<ShopCustomization> findBySellerId(Integer sellerId);
}
