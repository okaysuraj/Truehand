package com.truehand.repository;

import com.truehand.model.Product;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository
    extends JpaRepository<Product, Integer>, JpaSpecificationExecutor<Product>
{
    @org.springframework.data.jpa.repository.Lock(
        jakarta.persistence.LockModeType.PESSIMISTIC_WRITE
    )
    @org.springframework.data.jpa.repository.Query("select p from Product p where p.id = :id")
    java.util.Optional<Product> findByIdForUpdate(
        @org.springframework.data.repository.query.Param("id") Integer id
    );

    @org.springframework.data.jpa.repository.Query(
        "select p from Product p where p.isAvailable = true and p.approvalStatus = 'APPROVED' and p.salePrice is not null and p.saleStartsAt <= :now and p.saleEndsAt > :now"
    )
    List<Product> findActiveSales(
        @org.springframework.data.repository.query.Param("now") java.time.LocalDateTime now
    );

    List<Product> findByCategoryName(String categoryName);
    List<Product> findByNameContainingIgnoreCase(String name);
    Page<Product> findByIsAvailableTrue(Pageable pageable);
    List<Product> findBySellerId(Integer sellerId);
    int countBySellerId(Integer sellerId);
}
