package com.truehand.repository;

import com.truehand.model.ProductVariant;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductVariantRepository extends JpaRepository<ProductVariant, Integer> {
    @org.springframework.data.jpa.repository.Lock(
        jakarta.persistence.LockModeType.PESSIMISTIC_WRITE
    )
    @org.springframework.data.jpa.repository.Query(
        "select v from ProductVariant v where v.id = :id"
    )
    java.util.Optional<ProductVariant> findByIdForUpdate(
        @org.springframework.data.repository.query.Param("id") Integer id
    );

    List<ProductVariant> findByProductId(Integer productId);
}
