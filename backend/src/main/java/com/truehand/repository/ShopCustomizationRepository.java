package com.truehand.repository;

import com.truehand.model.ShopCustomization;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface ShopCustomizationRepository extends JpaRepository<ShopCustomization, Integer> {
    Optional<ShopCustomization> findBySellerId(Integer sellerId);
}
