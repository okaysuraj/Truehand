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
    private final com.truehand.repository.AddressRepository addressRepository;
    private final PromoCodeRepository promoCodeRepository;

    public OrderDTO createOrder(Integer userId, OrderDTO dto) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        
        com.truehand.model.Address address = null;
        if (dto.getDeliveryAddress() != null && !dto.getDeliveryAddress().isBlank()) {
            address = com.truehand.model.Address.builder()
                .user(user)
                .label("Delivery")
                .streetAddress(dto.getDeliveryAddress())
                .city("Unknown")
                .state("Unknown")
                .postalCode("Unknown")
                .isDefault(false)
                .build();
            addressRepository.save(address);
        }
        BigDecimal finalAmount = dto.getTotalAmount();
        
        if (dto.getPromoCode() != null && !dto.getPromoCode().isBlank()) {
            java.util.Optional<PromoCode> promoOpt = promoCodeRepository.findByCodeAndIsActiveTrue(dto.getPromoCode().toUpperCase());
            if (promoOpt.isPresent() && promoOpt.get().getValidUntil().isAfter(LocalDateTime.now())) {
                PromoCode promo = promoOpt.get();
                BigDecimal discount = finalAmount.multiply(promo.getDiscountPercentage()).divide(new BigDecimal("100"));
                if (promo.getMaxDiscountAmount() != null && discount.compareTo(promo.getMaxDiscountAmount()) > 0) {
                    discount = promo.getMaxDiscountAmount();
                }
                finalAmount = finalAmount.subtract(discount);
            }
        }

        Order order = Order.builder()
                .user(user)
                .orderNumber(UUID.randomUUID().toString())
                .totalAmount(finalAmount)
                .status("CONFIRMED")
                .paymentStatus("PAID")
                .deliveryAddress(address)
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

    public OrderDTO cancelOrder(Integer id, String reason) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        
        if (!"CONFIRMED".equals(order.getStatus()) && !"PENDING".equals(order.getStatus())) {
            throw new RuntimeException("Order cannot be cancelled in its current state.");
        }
        
        order.setStatus("CANCELLED");
        // In a real app, save the cancellation reason to a related entity or audit log
        return mapToDTO(orderRepository.save(order));
    }

    public OrderDTO requestReturn(Integer id, String reason, String method, String comments) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        
        if (!"DELIVERED".equals(order.getStatus())) {
            throw new RuntimeException("Only delivered orders can be returned.");
        }
        
        order.setStatus("RETURN_REQUESTED");
        // In a real app, save the return details to a ReturnRequest entity
        return mapToDTO(orderRepository.save(order));
    }

    public java.util.Map<String, String> reportIssue(Integer id, String subject, String description) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        
        // In a real app, save the issue to a SupportTicket entity
        java.util.Map<String, String> response = new java.util.HashMap<>();
        response.put("message", "Issue reported successfully. Support team will contact you soon.");
        response.put("orderId", id.toString());
        response.put("status", "TICKET_CREATED");
        
        return response;
    }

    private OrderDTO mapToDTO(Order order) {
        return OrderDTO.builder()
                .id(order.getId())
                .orderNumber(order.getOrderNumber())
                .totalAmount(order.getTotalAmount())
                .status(order.getStatus())
                .paymentStatus(order.getPaymentStatus())
                .deliveryAddress(order.getDeliveryAddress() != null ? order.getDeliveryAddress().getStreetAddress() : null)
                .createdAt(order.getCreatedAt())
                .build();
    }
}
