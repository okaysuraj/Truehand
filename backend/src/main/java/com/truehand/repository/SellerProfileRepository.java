package com.truehand.repository;

import com.truehand.model.SellerProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SellerProfileRepository extends JpaRepository<SellerProfile, Integer> {
    Optional<SellerProfile> findByUserId(Integer userId);
}
