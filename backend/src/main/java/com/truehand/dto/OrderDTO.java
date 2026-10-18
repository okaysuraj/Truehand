package com.truehand.dto;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderDTO {

    private Integer id;
    private Integer userId;
    private Integer addressId;
    private String checkoutKey;
    private String paymentIntentId;
    private LocalDateTime paymentExpiresAt;
    private String orderNumber;
    private BigDecimal totalAmount;
    private String status;
    private String paymentStatus;

    @JsonProperty("deliveryAddress")
    @JsonAlias({ "shippingAddress" })
    private String deliveryAddress;

    private String specialInstructions;
    private String promoCode;
    private LocalDateTime createdAt;

    @JsonProperty("orderItems")
    @JsonAlias({ "items" })
    private List<OrderItemDTO> orderItems;

    private DeliveryDTO delivery;

    public String getDeliveryAddress() {
        return deliveryAddress;
    }

    public List<OrderItemDTO> getOrderItems() {
        return orderItems;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class OrderItemDTO {

        private Integer id;
        private Integer productId;
        private Integer variantId;
        private String variantSku;
        private String variantDescription;
        private String productName;
        private String imageUrl;
        private Integer quantity;

        @JsonProperty("priceAtPurchase")
        @JsonAlias({ "price" })
        private BigDecimal priceAtPurchase;

        private BigDecimal discountAmount;

        public BigDecimal getPriceAtPurchase() {
            return priceAtPurchase;
        }
    }
}
