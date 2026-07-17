package com.truehand.controller;

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
