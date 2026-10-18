package com.truehand.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.truehand.security.EncryptedValueConverter;
import java.time.*;
import java.util.*;
import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/** Queues notifications and tracks delivery attempts independently of provider acceptance. */
@Service
@Transactional
@RequiredArgsConstructor
public class NotificationDispatchService {

    private final JdbcTemplate jdbc;
    private final ObjectMapper mapper;
    private final EncryptedValueConverter encryption;
    private final NotificationTransport transport;

    public boolean allowed(int user, String category, String channel) {
        return Boolean.TRUE.equals(
            jdbc.queryForObject(
                "select exists(select 1 from notification_preferences p join users u on u.id=p.user_id where p.user_id=? and u.is_active=true and p.preferences -> ? ->> ? = 'true')",
                Boolean.class,
                user,
                category,
                channel.toLowerCase(Locale.ROOT)
            )
        );
    }

    private void enqueue(
        String event,
        int user,
        String channel,
        Long device,
        String category,
        boolean mandatory,
        LocalDateTime expires,
        Map<String, Object> payload
    ) {
        try {
            jdbc.update(
                "insert into notification_dispatches(event_key,user_id,channel,device_id,recipient_key,category,mandatory,encrypted_payload,expires_at) values(?,?,?,?,?,?,?,?,?) on conflict(event_key,user_id,channel,recipient_key) do nothing",
                event,
                user,
                channel,
                device,
                device == null ? "EMAIL" : String.valueOf(device),
                category,
                mandatory,
                encryption.convertToDatabaseColumn(mapper.writeValueAsString(payload)),
                expires
            );
        } catch (com.fasterxml.jackson.core.JsonProcessingException failure) {
            throw new IllegalArgumentException("Invalid notification payload");
        }
    }

    public void orderEvent(int orderId, String key, String message) {
        var rows = jdbc.queryForList("select user_id,order_number from orders where id=?", orderId);
        if (rows.isEmpty()) return;
        int user = (Integer) rows.get(0).get("user_id");
        var payload = Map.<String, Object>of(
            "title",
            rows.get(0).get("order_number"),
            "body",
            message,
            "data",
            Map.of("orderId", orderId, "userId", user, "eventKey", "order:" + orderId + ":" + key)
        );
        if (allowed(user, "orderUpdates", "EMAIL")) enqueue(
            "order:" + orderId + ":" + key,
            user,
            "EMAIL",
            null,
            "orderUpdates",
            false,
            null,
            payload
        );
        if (allowed(user, "orderUpdates", "PUSH")) for (Long device : jdbc.queryForList(
            "select id from device_tokens where user_id=? and active=true",
            Long.class,
            user
        ))
            enqueue(
                "order:" + orderId + ":" + key,
                user,
                "PUSH",
                device,
                "orderUpdates",
                false,
                null,
                payload
            );
    }

    public void handover(
        int user,
        int order,
        String code,
        LocalDateTime issued,
        LocalDateTime expiry
    ) {
        if (
            !transport.emailAvailable()
        ) throw new org.springframework.web.server.ResponseStatusException(
            org.springframework.http.HttpStatus.SERVICE_UNAVAILABLE,
            "Handover email delivery is currently unavailable"
        );
        jdbc.update(
            "update notification_dispatches set status='CANCELED' where user_id=? and event_key like ? and status='QUEUED'",
            user,
            "handover:" + order + ":%"
        );
        enqueue(
            "handover:" + order + ":" + issued,
            user,
            "EMAIL",
            null,
            null,
            true,
            expiry,
            Map.of(
                "title",
                "TrueHand delivery handover code",
                "body",
                "Your handover code is " +
                    code +
                    ". It expires in 10 minutes. Share it with your partner when you receive the order.",
                "data",
                Map.of("orderId", order)
            )
        );
    }

    public void message(int user, String event, String title, Map<String, Object> data) {
        if (allowed(user, "messages", "EMAIL")) enqueue(
            event,
            user,
            "EMAIL",
            null,
            "messages",
            false,
            null,
            Map.of(
                "title",
                title,
                "body",
                "You have a new message in TrueHand. Sign in to read it.",
                "data",
                data
            )
        );
        if (allowed(user, "messages", "PUSH")) for (Long device : jdbc.queryForList(
            "select id from device_tokens where user_id=? and active=true",
            Long.class,
            user
        ))
            enqueue(
                event,
                user,
                "PUSH",
                device,
                "messages",
                false,
                null,
                Map.of(
                    "title",
                    title,
                    "body",
                    "You have a new message in TrueHand. Sign in to read it.",
                    "data",
                    data
                )
            );
    }

    public long campaign(int id, String title, String body, String audience) {
        List<Integer> recipients = jdbc.queryForList(
            "select u.id from users u join notification_preferences p on p.user_id=u.id where u.is_active=true and p.preferences -> 'promotions' ->> 'email'='true' and (?='ALL_USERS' or u.role='SELLER') order by u.id limit 5001",
            Integer.class,
            audience
        );
        if (recipients.isEmpty()) throw new IllegalArgumentException(
            "There are no opted-in recipients for this audience"
        );
        if (recipients.size() > 5000) throw new IllegalArgumentException(
            "This campaign exceeds the configured 5000-recipient limit"
        );
        for (int user : recipients)
            enqueue(
                "campaign:" + id,
                user,
                "EMAIL",
                null,
                "promotions",
                false,
                null,
                Map.of("title", title, "body", body, "data", Map.of("campaignId", id))
            );
        return recipients.size();
    }

    public void publishProduct(int product) {
        jdbc.update(
            "update products set catalog_announced_at=now() at time zone 'UTC' where id=? and catalog_announced_at is null",
            product
        );
    }

    public boolean catalogNotice(
        int user,
        String event,
        String title,
        String body,
        int product,
        String category
    ) {
        int inserted = jdbc.update(
            "insert into notifications(user_id,title,body,type,is_read,created_at,event_key) values(?,?,?,'PRODUCT',false,now() at time zone 'UTC',?) on conflict(user_id,event_key) do nothing",
            user,
            title,
            body.length() > 255 ? body.substring(0, 255) : body,
            event
        );
        if (inserted == 0) return false;
        var payload = Map.<String, Object>of(
            "title",
            title,
            "body",
            body,
            "data",
            Map.of("userId", user, "productId", product, "eventKey", event)
        );
        if (allowed(user, category, "EMAIL")) enqueue(
            event,
            user,
            "EMAIL",
            null,
            category,
            false,
            null,
            payload
        );
        if (allowed(user, category, "PUSH")) for (Long device : jdbc.queryForList(
            "select id from device_tokens where user_id=? and active=true",
            Long.class,
            user
        ))
            enqueue(event, user, "PUSH", device, category, false, null, payload);
        return true;
    }

    public Map<String, Object> decode(String payload) {
        try {
            return mapper.readValue(
                encryption.convertToEntityAttribute(payload),
                new com.fasterxml.jackson.core.type.TypeReference<>() {}
            );
        } catch (com.fasterxml.jackson.core.JsonProcessingException failure) {
            throw new IllegalStateException("Invalid stored notification");
        }
    }
}
