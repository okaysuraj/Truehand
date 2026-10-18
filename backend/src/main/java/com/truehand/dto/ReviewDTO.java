package com.truehand.dto;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReviewDTO {

    private Integer id;
    private Integer productId;
    private Integer userId;
    private String userName;
    private Integer rating;
    private String comment;
    private LocalDateTime createdAt;
}
