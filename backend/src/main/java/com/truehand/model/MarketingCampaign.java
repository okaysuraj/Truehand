package com.truehand.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "marketing_campaigns")
@Data
public class MarketingCampaign {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String campaignName;
    private String targetAudience; // ALL_USERS, INACTIVE_USERS, SELLERS
    
    @Column(columnDefinition = "TEXT")
    private String emailBody;
    
    private String status; // DRAFT, SENT, SCHEDULED
    private Integer sentCount = 0;
    
    private LocalDateTime createdAt;
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
