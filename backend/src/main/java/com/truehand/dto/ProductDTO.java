package com.truehand.dto;

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
public class ProductDTO {

    private Integer id;
    private String name;
    private String description;
    private String category;
    private BigDecimal price;
    private BigDecimal originalPrice;
    private LocalDateTime saleEndsAt;
    private Integer stockQuantity;
    private String imageUrl;
    private Boolean isAvailable;
    private Boolean acceptingOrders;
    private Integer sellerId;
    private String sellerName;
    private Double averageRating;
    private Integer reviewCount;
    private String status;
    private LocalDateTime createdAt;
    private List<ProductVariantDTO> variants;
    private Boolean hasVariants;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class ProductVariantDTO {

        private Integer id;
        private String sku;
        private String size;
        private String color;
        private BigDecimal additionalPrice;
        private Integer stockQuantity;
        private String imageUrl;
    }
}
