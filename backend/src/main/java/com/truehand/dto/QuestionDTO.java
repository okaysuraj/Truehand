package com.truehand.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class QuestionDTO {
    private Integer id;
    private Integer productId;
    private Integer userId;
    private String userName;
    private String content;
    private String answer;
    private LocalDateTime createdAt;
}
