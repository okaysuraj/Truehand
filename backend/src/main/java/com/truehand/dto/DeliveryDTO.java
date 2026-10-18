package com.truehand.dto;

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
public class DeliveryDTO {

    private Integer id;
    private Integer orderId;
    private String status;
    private String deliveryBoyName;
    private LocalDateTime estimatedDeliveryTime;
    private LocalDateTime actualDeliveryTime;
    private LocationDTO currentLocation;
    private List<LocationDTO> locationHistory;
}
