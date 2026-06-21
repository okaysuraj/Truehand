package com.truehand.service;

import com.truehand.dto.OrderDTO;
import com.truehand.model.*;
import com.truehand.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderService {
    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final DeliveryRepository deliveryRepository;

    public OrderDTO createOrder(Integer userId, OrderDTO dto) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        
        Order order = Order.builder()
                .user(user)
                .orderNumber(UUID.randomUUID().toString())
                .totalAmount(dto.getTotalAmount())
                .status("CONFIRMED")
                .paymentStatus("PAID")
                .deliveryAddress(dto.getDeliveryAddress())
                .specialInstructions(dto.getSpecialInstructions())
                .build();
        
        Order saved = orderRepository.save(order);
        
        Delivery delivery = Delivery.builder()
                .order(saved)
                .status("PENDING")
                .estimatedDeliveryTime(LocalDateTime.now().plusHours(2))
                .build();
        deliveryRepository.save(delivery);
        
        return mapToDTO(saved);
    }

    public OrderDTO getOrder(Integer id) {
        return orderRepository.findById(id)
                .map(this::mapToDTO)
                .orElseThrow(() -> new RuntimeException("Order not found"));
    }

    public List<OrderDTO> getUserOrders(Integer userId) {
        return orderRepository.findByUserId(userId)
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    private OrderDTO mapToDTO(Order order) {
        return OrderDTO.builder()
                .id(order.getId())
                .orderNumber(order.getOrderNumber())
                .totalAmount(order.getTotalAmount())
                .status(order.getStatus())
                .paymentStatus(order.getPaymentStatus())
                .deliveryAddress(order.getDeliveryAddress())
                .createdAt(order.getCreatedAt())
                .build();
    }
}
