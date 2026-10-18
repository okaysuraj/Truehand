package com.truehand.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import lombok.Data;

@Entity
@Table(name = "marketing_campaigns")
@lombok.Getter
@lombok.Setter
@lombok.ToString(onlyExplicitlyIncluded = true)
public class MarketingCampaign {

    @lombok.ToString.Include
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
