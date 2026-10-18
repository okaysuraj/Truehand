package com.truehand.controller;

import com.truehand.service.MarketplaceFeatureService;
import java.util.*;
import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class NotificationDeviceController {

    private final MarketplaceFeatureService features;
    private final JdbcTemplate jdbc;

    @GetMapping("/notifications/devices")
    public Object devices() {
        return features.query(
            "select id,platform,provider,active,updated_at from device_tokens where user_id=? and active=true order by id desc",
            features.userId()
        );
    }

    @PostMapping("/notifications/devices")
    @Transactional
    public Object register(@RequestBody Map<String, Object> body) {
        int user = features.userId();
        jdbc.queryForObject("select id from users where id=? for update", Integer.class, user);
        String token = features.text(body, "token", 4096),
            platform = features.text(body, "platform", 10),
            provider = features.text(body, "provider", 12);
        if (
            !Set.of("ANDROID", "IOS", "WEB").contains(platform) ||
            !Set.of("EXPO", "FIREBASE").contains(provider) ||
            ("EXPO".equals(provider) &&
                ("WEB".equals(platform) ||
                    !token.matches("(?:Exponent|Expo)PushToken\\[[A-Za-z0-9_-]{10,200}\\]"))) ||
            ("FIREBASE".equals(provider) && !token.matches("[A-Za-z0-9_:.\\-]{20,4096}"))
        ) throw new IllegalArgumentException("A valid device token and provider are required");
        long count = jdbc.queryForObject(
            "select count(*) from device_tokens where user_id=? and active=true and token<>?",
            Long.class,
            user,
            token
        );
        if (count >= 10) throw new IllegalArgumentException(
            "Remove an old notification device before adding another"
        );
        return features.one(
            "insert into device_tokens(user_id,token,platform,provider,active) values(?,?,?,?,true) on conflict(token) do update set user_id=excluded.user_id,platform=excluded.platform,provider=excluded.provider,active=true,updated_at=now() at time zone 'UTC' returning id,platform,provider,active,updated_at",
            user,
            token,
            platform,
            provider
        );
    }

    @DeleteMapping("/notifications/devices/{id}")
    public Object revoke(@PathVariable Long id) {
        if (
            jdbc.update(
                "update device_tokens set active=false where id=? and user_id=?",
                id,
                features.userId()
            ) != 1
        ) throw new org.springframework.web.server.ResponseStatusException(
            org.springframework.http.HttpStatus.NOT_FOUND,
            "Device not found"
        );
        return Map.of("message", "Device notifications disabled");
    }

    @GetMapping("/notifications/dispatches")
    public Object dispatches() {
        return features.query(
            "select id,channel,status,attempts,provider_reference,last_error,created_at,updated_at from notification_dispatches where user_id=? order by id desc limit 100",
            features.userId()
        );
    }

    @GetMapping("/admin/notification-dispatches")
    public Object dispatchesAdmin() {
        features.admin();
        return features.query(
            "select id,user_id,channel,status,attempts,provider_reference,last_error,created_at,updated_at from notification_dispatches order by id desc limit 200"
        );
    }
}
