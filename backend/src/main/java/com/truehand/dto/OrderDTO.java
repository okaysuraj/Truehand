package com.truehand.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderDTO {
    private Integer id;
    private Integer userId;
    private String orderNumber;
    private BigDecimal totalAmount;
    private String status;
    private String paymentStatus;
    private String deliveryAddress;
    private String specialInstructions;
    private String promoCode;
    private LocalDateTime createdAt;
    private List<OrderItemDTO> orderItems;
    private DeliveryDTO delivery;
}

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
class OrderItemDTO {
    private Integer id;
    private Integer productId;
    private String productName;
    private Integer quantity;
    private BigDecimal priceAtPurchase;
}


