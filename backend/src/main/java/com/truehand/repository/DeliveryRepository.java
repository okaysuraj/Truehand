package com.truehand.repository;

import com.truehand.model.Delivery;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DeliveryRepository extends JpaRepository<Delivery, Integer> {
    @org.springframework.data.jpa.repository.Lock(
        jakarta.persistence.LockModeType.PESSIMISTIC_WRITE
    )
    @org.springframework.data.jpa.repository.Query(
        "select d from Delivery d where d.order.id = :orderId"
    )
    Optional<Delivery> findByOrderIdForUpdate(
        @org.springframework.data.repository.query.Param("orderId") Integer orderId
    );

    Optional<Delivery> findByOrderId(Integer orderId);
    java.util.List<Delivery> findByDeliveryBoyIdOrderByIdDesc(Integer deliveryBoyId);
}
