package com.truehand.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DeliveryPersonnelDTO {
    private String vehicleType;
    private String vehicleRegistrationNumber;
    private String drivingLicenseNumber;
    private String kycStatus;
    private String rejectionReason;
    private Boolean isAvailable;
}
