package com.truehand.dto;

import java.math.BigDecimal;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SellerStatsDTO {

    private BigDecimal totalRevenue;
    private Integer activeOrders;
    private Integer totalProducts;
}
