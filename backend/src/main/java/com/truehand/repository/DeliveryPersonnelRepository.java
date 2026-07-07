package com.truehand.repository;

import com.truehand.model.DeliveryPersonnel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DeliveryPersonnelRepository extends JpaRepository<DeliveryPersonnel, Integer> {
    Optional<DeliveryPersonnel> findByUserId(Integer userId);
}
