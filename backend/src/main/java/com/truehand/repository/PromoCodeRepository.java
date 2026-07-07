package com.truehand.repository;

import com.truehand.model.PromoCode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PromoCodeRepository extends JpaRepository<PromoCode, Integer> {
    Optional<PromoCode> findByCodeAndIsActiveTrue(String code);
}
