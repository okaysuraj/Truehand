package com.truehand.websocket;

import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

@Component
@RequiredArgsConstructor
public class TrackingWebSocketHandler extends TextWebSocketHandler {

    private final com.truehand.service.FirebaseAuthService firebase;
    private final com.truehand.repository.UserRepository users;
    private final com.truehand.repository.OrderRepository orders;
    private final com.truehand.repository.DeliveryRepository deliveries;
    private static final Map<String, WebSocketSession> sessions = new ConcurrentHashMap<>();
    private static final Map<String, String> sessionOrderMap = new ConcurrentHashMap<>();
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws IOException {
        sessions.put(session.getId(), session);
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message)
        throws IOException {
        try {
            TrackingMessage trackingMsg = objectMapper.readValue(
                message.getPayload(),
                TrackingMessage.class
            );

            if ("SUBSCRIBE".equals(trackingMsg.getAction())) {
                Integer orderId = trackingMsg.getOrderId();
                if (
                    trackingMsg.getToken() == null || orderId == null
                ) throw new IllegalArgumentException();
                var token = firebase.verifyToken(trackingMsg.getToken());
                var user = users.findByFirebaseUid(token.getUid()).orElseThrow();
                var order = orders.findById(orderId).orElseThrow();
                boolean allowed =
                    user.getId().equals(order.getUser().getId()) ||
                    "ADMIN".equals(user.getRole()) ||
                    ("DELIVERY".equals(user.getRole()) &&
                        deliveries
                            .findByOrderId(orderId)
                            .map(
                                d ->
                                    d.getDeliveryBoy() != null &&
                                    user.getId().equals(d.getDeliveryBoy().getId())
                            )
                            .orElse(false));
                if (
                    !token.isEmailVerified() || !Boolean.TRUE.equals(user.getIsActive()) || !allowed
                ) throw new IllegalArgumentException();
                session
                    .getAttributes()
                    .put("expiresAt", ((Number) token.getClaims().get("exp")).longValue() * 1000L);
                sessionOrderMap.put(session.getId(), "ORDER_" + orderId);

                Map<String, Object> response = new HashMap<>();
                response.put("status", "SUBSCRIBED");
                response.put("orderId", orderId);
                response.put("message", "You are now tracking order #" + orderId);

                session.sendMessage(new TextMessage(objectMapper.writeValueAsString(response)));
            }
        } catch (Exception e) {
            sessionOrderMap.remove(session.getId());
            session.close(CloseStatus.POLICY_VIOLATION);
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status)
        throws IOException {
        sessions.remove(session.getId());
        sessionOrderMap.remove(session.getId());
    }

    public void broadcastLocationUpdate(Integer orderId, LocationUpdate update) throws IOException {
        String orderKey = "ORDER_" + orderId;

        for (Map.Entry<String, String> entry : sessionOrderMap.entrySet()) {
            if (entry.getValue().equals(orderKey)) {
                WebSocketSession session = sessions.get(entry.getKey());
                if (isAuthorizedSession(session)) {
                    Map<String, Object> message = new HashMap<>();
                    message.put("type", "LOCATION_UPDATE");
                    message.put("orderId", orderId);
                    message.put("latitude", update.getLatitude());
                    message.put("longitude", update.getLongitude());
                    message.put("accuracy", update.getAccuracy());
                    message.put("timestamp", update.getTimestamp());
                    message.put("status", update.getStatus());

                    session.sendMessage(new TextMessage(objectMapper.writeValueAsString(message)));
                }
            }
        }
    }

    public void broadcastStatusUpdate(Integer orderId, String status, String message)
        throws IOException {
        String orderKey = "ORDER_" + orderId;

        for (Map.Entry<String, String> entry : sessionOrderMap.entrySet()) {
            if (entry.getValue().equals(orderKey)) {
                WebSocketSession session = sessions.get(entry.getKey());
                if (isAuthorizedSession(session)) {
                    Map<String, Object> msg = new HashMap<>();
                    msg.put("type", "STATUS_UPDATE");
                    msg.put("orderId", orderId);
                    msg.put("status", status);
                    msg.put("message", message);
                    msg.put("timestamp", System.currentTimeMillis());

                    session.sendMessage(new TextMessage(objectMapper.writeValueAsString(msg)));
                }
            }
        }
    }

    private boolean isAuthorizedSession(WebSocketSession session) throws IOException {
        if (session == null || !session.isOpen()) return false;
        Object expiry = session.getAttributes().get("expiresAt");
        if (!(expiry instanceof Long) || (Long) expiry <= System.currentTimeMillis()) {
            sessionOrderMap.remove(session.getId());
            session.close(CloseStatus.POLICY_VIOLATION);
            return false;
        }
        return true;
    }
}
