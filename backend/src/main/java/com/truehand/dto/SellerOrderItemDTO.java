package com.truehand.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SellerOrderItemDTO {

    private Integer id;
    private Integer sellerId;
    private String orderNumber;
    private String variantSku;
    private String variantDescription;
    private String customerCity;
    private String deliveryAddress;
    private String paymentStatus;
    private String productName;
    private String productImageUrl;
    private Integer quantity;
    private BigDecimal priceAtPurchase;
    private LocalDateTime orderDate;
    private String orderStatus;
}
