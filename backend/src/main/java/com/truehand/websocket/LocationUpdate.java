package com.truehand.websocket;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LocationUpdate {
    private BigDecimal latitude;
    private BigDecimal longitude;
    private Double accuracy;
    private Long timestamp;
    private String status;
}
