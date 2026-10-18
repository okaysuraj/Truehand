package com.truehand.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AddressDTO {

    private Integer id;
    private String label;
    private String streetAddress;
    private String city;
    private String state;
    private String postalCode;
    private String country;
    private String fullName;
    private String phone;
    private java.math.BigDecimal latitude;
    private java.math.BigDecimal longitude;
    private Boolean isDefault;
}
