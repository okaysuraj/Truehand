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
public class ProductDTO {
    private Integer id;
    private String name;
    private String description;
    private String category;
    private BigDecimal price;
    private Integer stockQuantity;
    private String imageUrl;
    private Boolean isAvailable;
    private Integer sellerId;
    private String sellerName;
    private Double averageRating;
    private Integer reviewCount;
    private String status;
    private LocalDateTime createdAt;
    private List<ProductVariantDTO> variants;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class ProductVariantDTO {
        private String sku;
        private String size;
        private String color;
        private BigDecimal additionalPrice;
        private Integer stockQuantity;
        private String imageUrl;
    }
}
