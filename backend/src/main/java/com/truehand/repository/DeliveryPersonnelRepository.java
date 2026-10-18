package com.truehand.repository;

import com.truehand.model.DeliveryPersonnel;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DeliveryPersonnelRepository extends JpaRepository<DeliveryPersonnel, Integer> {
    Optional<DeliveryPersonnel> findByUserId(Integer userId);

    @org.springframework.data.jpa.repository.EntityGraph(attributePaths = "user")
    org.springframework.data.domain.Page<DeliveryPersonnel> findByKycStatus(
        String status,
        org.springframework.data.domain.Pageable pageable
    );

    long countByKycStatus(String status);
}
