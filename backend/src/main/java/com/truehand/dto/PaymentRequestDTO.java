package com.truehand.dto;

import java.math.BigDecimal;
import lombok.Data;

@Data
public class PaymentRequestDTO {

    private Integer orderId;
    private BigDecimal amount;
    private String currency;
}
