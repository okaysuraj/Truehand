package com.truehand.repository;

import com.truehand.model.Order;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends JpaRepository<Order, Integer> {
    @org.springframework.data.jpa.repository.Query(
        "select o.id from Order o where o.status = 'PENDING' and o.paymentStatus = 'PENDING' and o.paymentExpiresAt < :cutoff order by o.id"
    )
    java.util.List<Integer> findExpiredUnpaidIds(
        @org.springframework.data.repository.query.Param("cutoff") java.time.LocalDateTime cutoff,
        org.springframework.data.domain.Pageable limit
    );

    Optional<Order> findByCheckoutKey(String checkoutKey);
    Optional<Order> findByPaymentIntentId(String paymentIntentId);

    @org.springframework.data.jpa.repository.Lock(
        jakarta.persistence.LockModeType.PESSIMISTIC_WRITE
    )
    @org.springframework.data.jpa.repository.Query("select o from Order o where o.id = :id")
    Optional<Order> findByIdForUpdate(
        @org.springframework.data.repository.query.Param("id") Integer id
    );

    @org.springframework.data.jpa.repository.Query(
        "select o.id from Order o where o.user.id=:userId order by o.createdAt desc,o.id desc"
    )
    org.springframework.data.domain.Page<Integer> findPageIdsByUserId(
        @org.springframework.data.repository.query.Param("userId") Integer userId,
        org.springframework.data.domain.Pageable pageable
    );

    @org.springframework.data.jpa.repository.Query(
        "select o.id from Order o order by o.createdAt desc,o.id desc"
    )
    org.springframework.data.domain.Page<Integer> findPageIds(
        org.springframework.data.domain.Pageable pageable
    );

    @org.springframework.data.jpa.repository.Query(
        "select distinct o from Order o left join fetch o.orderItems items left join fetch items.product left join fetch items.variant left join fetch o.deliveryAddress left join fetch o.user left join fetch o.delivery where o.id in :ids"
    )
    List<Order> findHistoryByIds(
        @org.springframework.data.repository.query.Param("ids") java.util.Collection<Integer> ids
    );

    Optional<Order> findByOrderNumber(String orderNumber);
    List<Order> findByStatus(String status);

    @org.springframework.data.jpa.repository.Query(
        "SELECT o FROM Order o WHERE o.user.id=:userId AND o.paymentStatus='PAID' AND o.status='DELIVERED' AND EXISTS(SELECT oi.id FROM OrderItem oi WHERE oi.order=o AND oi.product.id=:productId) ORDER BY o.createdAt DESC,o.id DESC"
    )
    List<Order> findReviewableOrders(
        @org.springframework.data.repository.query.Param("userId") Integer userId,
        @org.springframework.data.repository.query.Param("productId") Integer productId,
        org.springframework.data.domain.Pageable pageable
    );
}
