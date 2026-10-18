package com.truehand.repository;

import com.truehand.model.OrderItem;
import java.math.BigDecimal;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderItemRepository extends JpaRepository<OrderItem, Integer> {
    @Query(
        "SELECT SUM(oi.priceAtPurchase * oi.quantity - oi.discountAmount) FROM OrderItem oi WHERE oi.sellerIdSnapshot = :sellerId AND oi.order.paymentStatus = 'PAID' AND oi.order.status != 'CANCELLED'"
    )
    BigDecimal sumRevenueBySellerId(@Param("sellerId") Integer sellerId);

    @Query(
        "SELECT COUNT(DISTINCT oi.order.id) FROM OrderItem oi WHERE oi.sellerIdSnapshot = :sellerId AND oi.order.paymentStatus = 'PAID' AND oi.order.status IN ('CONFIRMED', 'PROCESSING', 'SHIPPED', 'OUT_FOR_DELIVERY')"
    )
    Integer countActiveOrdersBySellerId(@Param("sellerId") Integer sellerId);

    @Query(
        value = "SELECT oi FROM OrderItem oi JOIN FETCH oi.order o JOIN FETCH oi.product p LEFT JOIN FETCH o.deliveryAddress LEFT JOIN FETCH o.delivery WHERE oi.sellerIdSnapshot = :sellerId AND o.paymentStatus IN ('PAID','REFUND_PENDING','REFUNDED') ORDER BY o.createdAt DESC,o.id DESC,oi.id DESC",
        countQuery = "SELECT count(oi) FROM OrderItem oi WHERE oi.sellerIdSnapshot=:sellerId AND oi.order.paymentStatus IN ('PAID','REFUND_PENDING','REFUNDED')"
    )
    org.springframework.data.domain.Page<OrderItem> findSellerHistory(
        @Param("sellerId") Integer sellerId,
        org.springframework.data.domain.Pageable pageable
    );

    java.util.Optional<OrderItem> findFirstBySellerIdSnapshotAndOrder_IdOrderByIdAsc(
        Integer sellerId,
        Integer orderId
    );
}
