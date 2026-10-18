package com.truehand.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import java.net.*;
import java.net.http.*;
import java.time.Duration;
import java.util.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class NotificationTransport {

    private final EmailService email;
    private final ObjectMapper mapper;

    @Value("${notifications.email.enabled:false}")
    private boolean emailEnabled;

    @Value("${notifications.push.enabled:false}")
    private boolean pushEnabled;

    @Value("${notifications.dispatch.enabled:false}")
    private boolean dispatchEnabled;

    @Value("${notifications.expo.access-token:}")
    private String expoAccessToken;

    private final HttpClient http = HttpClient.newBuilder()
        .connectTimeout(Duration.ofSeconds(5))
        .build();

    public record Outcome(String status, String reference, String error, boolean invalidDevice) {}

    public boolean emailAvailable() {
        return emailEnabled && dispatchEnabled;
    }

    public boolean available(String channel) {
        return "EMAIL".equals(channel) ? emailEnabled : pushEnabled;
    }

    private Map<String, Object> expo(String path, Object body) throws Exception {
        var request = HttpRequest.newBuilder(URI.create("https://exp.host/--/api/v2/push/" + path))
            .timeout(Duration.ofSeconds(15))
            .header("Content-Type", "application/json")
            .header("Accept", "application/json");
        if (expoAccessToken != null && !expoAccessToken.isBlank()) request.header(
            "Authorization",
            "Bearer " + expoAccessToken
        );
        var response = http.send(
            request
                .POST(HttpRequest.BodyPublishers.ofString(mapper.writeValueAsString(body)))
                .build(),
            HttpResponse.BodyHandlers.ofString()
        );
        if (response.statusCode() != 200) throw new IllegalStateException(
            "Expo HTTP " + response.statusCode()
        );
        return mapper.readValue(
            response.body(),
            new com.fasterxml.jackson.core.type.TypeReference<>() {}
        );
    }

    @SuppressWarnings("unchecked")
    public Outcome send(
        String channel,
        String recipient,
        String provider,
        Map<String, Object> payload
    ) throws Exception {
        String title = String.valueOf(payload.get("title")),
            body = String.valueOf(payload.get("body"));
        if ("EMAIL".equals(channel)) {
            String reference = email.sendTextEmail(recipient, title, body);
            return new Outcome("PROVIDER_ACCEPTED", reference, null, false);
        }
        if ("FIREBASE".equals(provider)) {
            var message = com.google.firebase.messaging.Message.builder()
                .setToken(recipient)
                .putData("title", title)
                .putData("body", body);
            Object raw = payload.get("data");
            if (raw instanceof Map<?, ?> data) data.forEach((key, value) ->
                message.putData(String.valueOf(key), String.valueOf(value))
            );
            try {
                return new Outcome(
                    "PROVIDER_ACCEPTED",
                    com.google.firebase.messaging.FirebaseMessaging.getInstance().send(
                        message.build()
                    ),
                    null,
                    false
                );
            } catch (com.google.firebase.messaging.FirebaseMessagingException failure) {
                boolean invalid =
                    failure.getMessagingErrorCode() ==
                    com.google.firebase.messaging.MessagingErrorCode.UNREGISTERED;
                return new Outcome(
                    invalid ? "FAILED" : "QUEUED",
                    null,
                    String.valueOf(failure.getMessagingErrorCode()),
                    invalid
                );
            }
        }
        Object result = expo(
            "send",
            Map.of(
                "to",
                recipient,
                "title",
                title,
                "body",
                body,
                "data",
                payload.getOrDefault("data", Map.of()),
                "sound",
                "default"
            )
        ).get("data");
        if (!(result instanceof Map<?, ?> ticket)) throw new IllegalStateException(
            "Invalid Expo push ticket"
        );
        if (
            "ok".equals(ticket.get("status")) && ticket.get("id") instanceof String id
        ) return new Outcome("TICKETED", id, null, false);
        Map<String, Object> details =
            ticket.get("details") instanceof Map<?, ?> raw ? (Map<String, Object>) raw : Map.of();
        String error = String.valueOf(details.getOrDefault("error", "PUSH_REJECTED"));
        return new Outcome("QUEUED", null, error, "DeviceNotRegistered".equals(error));
    }

    @SuppressWarnings("unchecked")
    public Outcome receipt(String reference) throws Exception {
        Object raw = expo("getReceipts", Map.of("ids", List.of(reference))).get("data");
        if (
            !(raw instanceof Map<?, ?> records) ||
            !(records.get(reference) instanceof Map<?, ?> receipt)
        ) return new Outcome("TICKETED", reference, "RECEIPT_NOT_YET_AVAILABLE", false);
        if ("ok".equals(receipt.get("status"))) return new Outcome(
            "PROVIDER_ACCEPTED",
            reference,
            null,
            false
        );
        Map<String, Object> details =
            receipt.get("details") instanceof Map<?, ?> value
                ? (Map<String, Object>) value
                : Map.of();
        String error = String.valueOf(details.getOrDefault("error", "PUSH_REJECTED"));
        return new Outcome("QUEUED", null, error, "DeviceNotRegistered".equals(error));
    }
}
