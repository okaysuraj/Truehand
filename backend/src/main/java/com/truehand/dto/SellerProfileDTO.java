package com.truehand.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SellerProfileDTO {
    private String businessName;
    private String panNumber;
    private String gstNumber;
    private String bankAccountNumber;
    private String ifscCode;
    private String kycStatus;
    private String rejectionReason;
}
