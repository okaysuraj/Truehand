package com.truehand.repository;

import com.truehand.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order, Integer> {
    List<Order> findByUserId(Integer userId);
    Optional<Order> findByOrderNumber(String orderNumber);
    List<Order> findByStatus(String status);
    
    @org.springframework.data.jpa.repository.Query("SELECT DISTINCT o FROM Order o JOIN o.orderItems oi WHERE o.user.id = :userId AND oi.product.id = :productId")
    List<Order> findOrdersByUserAndProduct(@org.springframework.data.repository.query.Param("userId") Integer userId, @org.springframework.data.repository.query.Param("productId") Integer productId);
}
