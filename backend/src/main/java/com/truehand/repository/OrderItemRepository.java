package com.truehand.repository;

import com.truehand.model.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface OrderItemRepository extends JpaRepository<OrderItem, Integer> {

    @Query("SELECT SUM(oi.priceAtPurchase * oi.quantity) FROM OrderItem oi WHERE oi.product.seller.id = :sellerId AND oi.order.status != 'CANCELLED'")
    BigDecimal sumRevenueBySellerId(@Param("sellerId") Integer sellerId);

    @Query("SELECT COUNT(DISTINCT oi.order.id) FROM OrderItem oi WHERE oi.product.seller.id = :sellerId AND oi.order.status IN ('PENDING', 'PROCESSING')")
    Integer countActiveOrdersBySellerId(@Param("sellerId") Integer sellerId);

    @Query("SELECT oi FROM OrderItem oi JOIN FETCH oi.order o JOIN FETCH oi.product p WHERE p.seller.id = :sellerId ORDER BY o.createdAt DESC")
    List<OrderItem> findByProductSellerId(@Param("sellerId") Integer sellerId);
}
