import os

models_activity = """package com.truehand.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "suspicious_activity_logs")
@Data
public class SuspiciousActivityLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String activityType; // FAKE_REVIEW, FRAUD_ORDER, IP_SPOOFING
    private String description;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User relatedUser; // Can be null if unknown

    private String status; // PENDING, RESOLVED
    
    private LocalDateTime createdAt;
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
"""

models_campaign = """package com.truehand.model;

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
"""

models_settings = """package com.truehand.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "platform_settings")
@Data
public class PlatformSettings {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private boolean maintenanceMode = false;
    private String maintenanceMessage;
    
    private boolean registrationsEnabled = true;
    
    private LocalDateTime updatedAt;
    
    @PrePersist
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
"""

repo_activity = """package com.truehand.repository;

import com.truehand.model.SuspiciousActivityLog;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface SuspiciousActivityLogRepository extends JpaRepository<SuspiciousActivityLog, Integer> {
    List<SuspiciousActivityLog> findByStatusOrderByCreatedAtDesc(String status);
}
"""

repo_campaign = """package com.truehand.repository;

import com.truehand.model.MarketingCampaign;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MarketingCampaignRepository extends JpaRepository<MarketingCampaign, Integer> {
}
"""

repo_settings = """package com.truehand.repository;

import com.truehand.model.PlatformSettings;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlatformSettingsRepository extends JpaRepository<PlatformSettings, Integer> {
}
"""

controller = """package com.truehand.controller;

import com.truehand.model.SuspiciousActivityLog;
import com.truehand.model.MarketingCampaign;
import com.truehand.model.PlatformSettings;
import com.truehand.repository.SuspiciousActivityLogRepository;
import com.truehand.repository.MarketingCampaignRepository;
import com.truehand.repository.PlatformSettingsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/admin/advanced")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AdvancedAdminController {
    private final SuspiciousActivityLogRepository activityRepository;
    private final MarketingCampaignRepository campaignRepository;
    private final PlatformSettingsRepository settingsRepository;

    @GetMapping("/suspicious-activity")
    public ResponseEntity<List<SuspiciousActivityLog>> getSuspiciousActivity() {
        return ResponseEntity.ok(activityRepository.findAll());
    }
    
    @PostMapping("/suspicious-activity/{id}/resolve")
    public ResponseEntity<?> resolveActivity(@PathVariable Integer id) {
        SuspiciousActivityLog log = activityRepository.findById(id).orElseThrow();
        log.setStatus("RESOLVED");
        return ResponseEntity.ok(activityRepository.save(log));
    }

    @GetMapping("/campaigns")
    public ResponseEntity<List<MarketingCampaign>> getCampaigns() {
        return ResponseEntity.ok(campaignRepository.findAll());
    }
    
    @PostMapping("/campaigns")
    public ResponseEntity<MarketingCampaign> createCampaign(@RequestBody MarketingCampaign campaign) {
        campaign.setStatus("DRAFT");
        return ResponseEntity.ok(campaignRepository.save(campaign));
    }
    
    @GetMapping("/settings")
    public ResponseEntity<PlatformSettings> getSettings() {
        PlatformSettings settings = settingsRepository.findAll().stream().findFirst().orElseGet(() -> {
            PlatformSettings s = new PlatformSettings();
            return settingsRepository.save(s);
        });
        return ResponseEntity.ok(settings);
    }
    
    @PostMapping("/settings")
    public ResponseEntity<PlatformSettings> updateSettings(@RequestBody PlatformSettings newSettings) {
        PlatformSettings settings = settingsRepository.findAll().stream().findFirst().orElseGet(PlatformSettings::new);
        settings.setMaintenanceMode(newSettings.isMaintenanceMode());
        settings.setMaintenanceMessage(newSettings.getMaintenanceMessage());
        settings.setRegistrationsEnabled(newSettings.isRegistrationsEnabled());
        return ResponseEntity.ok(settingsRepository.save(settings));
    }
}
"""

def write(path, content):
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

base = 'backend/src/main/java/com/truehand/'
write(base + 'model/SuspiciousActivityLog.java', models_activity)
write(base + 'model/MarketingCampaign.java', models_campaign)
write(base + 'model/PlatformSettings.java', models_settings)
write(base + 'repository/SuspiciousActivityLogRepository.java', repo_activity)
write(base + 'repository/MarketingCampaignRepository.java', repo_campaign)
write(base + 'repository/PlatformSettingsRepository.java', repo_settings)
write(base + 'controller/AdvancedAdminController.java', controller)

print('Advanced Admin backend created.')
