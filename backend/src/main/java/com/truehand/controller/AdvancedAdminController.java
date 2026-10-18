package com.truehand.controller;

import com.truehand.model.MarketingCampaign;
import com.truehand.model.PlatformSettings;
import com.truehand.model.SuspiciousActivityLog;
import com.truehand.repository.MarketingCampaignRepository;
import com.truehand.repository.PlatformSettingsRepository;
import com.truehand.repository.SuspiciousActivityLogRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/advanced")
@RequiredArgsConstructor
public class AdvancedAdminController {

    private final SuspiciousActivityLogRepository activityRepository;
    private final MarketingCampaignRepository campaignRepository;
    private final PlatformSettingsRepository settingsRepository;
    private final com.truehand.service.MarketplaceFeatureService features;
    private final com.truehand.service.NotificationDispatchService dispatches;
    private final org.springframework.jdbc.core.JdbcTemplate jdbc;

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
    public ResponseEntity<?> getCampaigns() {
        features.admin();
        return ResponseEntity.ok(
            features.query(
                "select c.id,c.campaign_name,c.target_audience,c.email_body,c.status,c.created_at,count(d.id) as queued_count,count(d.id) filter(where d.status='PROVIDER_ACCEPTED') as sent_count,count(d.id) filter(where d.status='FAILED') as failed_count from marketing_campaigns c left join notification_dispatches d on d.event_key='campaign:'||c.id::text group by c.id order by c.id desc limit 200"
            )
        );
    }

    @PostMapping("/campaigns")
    @org.springframework.transaction.annotation.Transactional
    public ResponseEntity<?> createCampaign(@RequestBody java.util.Map<String, Object> body) {
        features.admin();
        String audience = features.text(body, "targetAudience", 30);
        if (
            !java.util.Set.of("ALL_USERS", "SELLERS").contains(audience)
        ) throw new IllegalArgumentException("Select a supported audience");
        var result = features.one(
            "insert into marketing_campaigns(campaign_name,target_audience,email_body,status,sent_count,created_at) values(?,?,?,'DRAFT',0,now() at time zone 'UTC') returning *",
            features.text(body, "campaignName", 200),
            audience,
            features.text(body, "emailBody", 10000)
        );
        features.audit("CREATE", "CAMPAIGN", result.get("id"), java.util.Map.of());
        return ResponseEntity.ok(result);
    }

    @PostMapping("/campaigns/{id}/queue")
    @org.springframework.transaction.annotation.Transactional
    public Object queueCampaign(@PathVariable int id) {
        features.admin();
        var campaign = features.one("select * from marketing_campaigns where id=? for update", id);
        if ("QUEUED".equals(campaign.get("status"))) return java.util.Map.of(
            "id",
            id,
            "status",
            "QUEUED"
        );
        if (!"DRAFT".equals(campaign.get("status"))) throw new IllegalArgumentException(
            "Only a draft campaign can be queued"
        );
        long count = dispatches.campaign(
            id,
            (String) campaign.get("campaignName"),
            (String) campaign.get("emailBody"),
            (String) campaign.get("targetAudience")
        );
        jdbc.update("update marketing_campaigns set status='QUEUED' where id=?", id);
        features.audit("QUEUE", "CAMPAIGN", id, java.util.Map.of("recipientCount", count));
        return java.util.Map.of("id", id, "status", "QUEUED", "recipientCount", count);
    }

    @GetMapping("/settings")
    public ResponseEntity<PlatformSettings> getSettings() {
        PlatformSettings settings = settingsRepository
            .findAll()
            .stream()
            .findFirst()
            .orElseGet(() -> {
                PlatformSettings s = new PlatformSettings();
                return settingsRepository.save(s);
            });
        return ResponseEntity.ok(settings);
    }

    @PostMapping("/settings")
    public ResponseEntity<PlatformSettings> updateSettings(
        @RequestBody PlatformSettings newSettings
    ) {
        PlatformSettings settings = settingsRepository
            .findAll()
            .stream()
            .findFirst()
            .orElseGet(PlatformSettings::new);
        settings.setMaintenanceMode(newSettings.isMaintenanceMode());
        settings.setMaintenanceMessage(newSettings.getMaintenanceMessage());
        settings.setRegistrationsEnabled(newSettings.isRegistrationsEnabled());
        return ResponseEntity.ok(settingsRepository.save(settings));
    }
}
