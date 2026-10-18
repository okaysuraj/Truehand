package com.truehand.service;

import com.truehand.model.Delivery;
import com.truehand.model.Location;
import com.truehand.repository.DeliveryRepository;
import com.truehand.repository.LocationRepository;
import com.truehand.websocket.LocationUpdate;
import com.truehand.websocket.TrackingWebSocketHandler;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

/** Coordinates delivery assignment, status transitions, and order tracking updates. */
@Service
@org.springframework.transaction.annotation.Transactional
@RequiredArgsConstructor
@lombok.extern.slf4j.Slf4j
public class DeliveryService {

    private final DeliveryRepository deliveryRepository;
    private final LocationRepository locationRepository;
    private final TrackingWebSocketHandler webSocketHandler;
    private final com.truehand.repository.UserRepository userRepository;
    private final com.truehand.repository.DeliveryPersonnelRepository personnelRepository;
    private final com.truehand.repository.OrderRepository orderRepository;
    private final OrderService orderService;
    private final SettlementService settlements;
    private final OrderEventService events;
    private final org.springframework.jdbc.core.JdbcTemplate jdbc;

    @FunctionalInterface
    private interface Broadcast {
        void run() throws java.io.IOException;
    }

    private void afterCommit(Broadcast broadcast) {
        org.springframework.transaction.support.TransactionSynchronizationManager.registerSynchronization(
            new org.springframework.transaction.support.TransactionSynchronization() {
                @Override
                public void afterCommit() {
                    try {
                        broadcast.run();
                    } catch (Exception failure) {
                        log.warn(
                            "Delivery broadcast failed: {}",
                            failure.getClass().getSimpleName()
                        );
                    }
                }
            }
        );
    }

    public void assignDelivery(Integer orderId, Integer deliveryBoyId) {
        Delivery delivery = deliveryRepository
            .findByOrderIdForUpdate(orderId)
            .orElseThrow(() ->
                new org.springframework.web.server.ResponseStatusException(
                    org.springframework.http.HttpStatus.NOT_FOUND,
                    "Delivery not found"
                )
            );

        com.truehand.model.User deliveryBoy = userRepository
            .findById(deliveryBoyId)
            .orElseThrow(() ->
                new org.springframework.web.server.ResponseStatusException(
                    org.springframework.http.HttpStatus.NOT_FOUND,
                    "Delivery boy not found"
                )
            );
        if (
            !"DELIVERY".equals(deliveryBoy.getRole()) ||
            !Boolean.TRUE.equals(deliveryBoy.getIsActive()) ||
            !personnelRepository
                .findByUserId(deliveryBoyId)
                .map(
                    p ->
                        "APPROVED".equals(p.getKycStatus()) &&
                        Boolean.TRUE.equals(p.getIsAvailable())
                )
                .orElse(false)
        ) throw new IllegalArgumentException(
            "An active, approved, available delivery partner is required"
        );
        if (
            !"PAID".equals(delivery.getOrder().getPaymentStatus()) ||
            !java.util.Set.of("CONFIRMED", "PROCESSING", "SHIPPED").contains(
                delivery.getOrder().getStatus()
            )
        ) throw new IllegalArgumentException("Only a paid, unfulfilled order can be assigned");
        if (
            !java.util.Set.of("PENDING", "ASSIGNED").contains(delivery.getStatus())
        ) throw new IllegalArgumentException("An in-progress delivery cannot be reassigned");

        delivery.setDeliveryBoy(deliveryBoy);
        delivery.setStatus("ASSIGNED");
        events.record(
            orderId,
            "assigned:" + deliveryBoyId,
            "ASSIGNED",
            "Delivery partner assigned."
        );
        deliveryRepository.save(delivery);

        afterCommit(() ->
            webSocketHandler.broadcastStatusUpdate(orderId, "ASSIGNED", "Delivery partner assigned")
        );
    }

    public List<Delivery> getDeliveriesByPartner(Integer deliveryBoyId) {
        return deliveryRepository.findByDeliveryBoyIdOrderByIdDesc(deliveryBoyId);
    }

    public void startDelivery(Integer orderId) {
        Delivery delivery = deliveryRepository
            .findByOrderIdForUpdate(orderId)
            .orElseThrow(() ->
                new org.springframework.web.server.ResponseStatusException(
                    org.springframework.http.HttpStatus.NOT_FOUND,
                    "Delivery not found"
                )
            );

        if (
            !"ASSIGNED".equals(delivery.getStatus()) ||
            !"PAID".equals(delivery.getOrder().getPaymentStatus()) ||
            !"SHIPPED".equals(delivery.getOrder().getStatus())
        ) throw new IllegalArgumentException(
            "Delivery must be assigned, paid and shipped before starting"
        );
        delivery.setStatus("IN_TRANSIT");
        events.record(
            orderId,
            "delivery-started",
            "OUT_FOR_DELIVERY",
            "Delivery partner started the delivery."
        );
        delivery.getOrder().setStatus("OUT_FOR_DELIVERY");
        orderRepository.save(delivery.getOrder());
        deliveryRepository.save(delivery);

        // Notify clients via WebSocket
        afterCommit(() ->
            webSocketHandler.broadcastStatusUpdate(
                orderId,
                "IN_TRANSIT",
                "Your delivery is on the way"
            )
        );
    }

    public void updateLocation(
        Integer orderId,
        BigDecimal latitude,
        BigDecimal longitude,
        BigDecimal accuracy
    ) {
        if (
            latitude == null ||
            longitude == null ||
            latitude.abs().compareTo(new BigDecimal("90")) > 0 ||
            longitude.abs().compareTo(new BigDecimal("180")) > 0 ||
            accuracy == null ||
            accuracy.signum() < 0 ||
            accuracy.compareTo(new BigDecimal("99999999.99")) > 0
        ) throw new IllegalArgumentException("Invalid GPS coordinates or accuracy");
        Delivery delivery = deliveryRepository
            .findByOrderIdForUpdate(orderId)
            .orElseThrow(() ->
                new org.springframework.web.server.ResponseStatusException(
                    org.springframework.http.HttpStatus.NOT_FOUND,
                    "Delivery not found"
                )
            );

        if (!"IN_TRANSIT".equals(delivery.getStatus())) throw new IllegalArgumentException(
            "Location updates require an in-transit delivery"
        );
        // Save location
        Location location = Location.builder()
            .delivery(delivery)
            .latitude(latitude)
            .longitude(longitude)
            .accuracy(accuracy)
            .timestamp(LocalDateTime.now(java.time.ZoneOffset.UTC))
            .build();

        locationRepository.save(location);

        if (delivery.getDeliveryBoy() != null) jdbc.update(
            "insert into fleet_vehicles(agent_id,current_lat,current_lng,last_ping_at,status) values(?,?,?,now() at time zone 'UTC','IN_TRANSIT') on conflict(agent_id) do update set current_lat=excluded.current_lat,current_lng=excluded.current_lng,last_ping_at=excluded.last_ping_at,status=excluded.status",
            delivery.getDeliveryBoy().getId(),
            latitude.doubleValue(),
            longitude.doubleValue()
        );
        LocationUpdate update = LocationUpdate.builder()
            .latitude(latitude)
            .longitude(longitude)
            .accuracy(accuracy.doubleValue())
            .timestamp(System.currentTimeMillis())
            .status(delivery.getStatus())
            .build();

        afterCommit(() -> webSocketHandler.broadcastLocationUpdate(orderId, update));
    }

    public void completeDelivery(Integer orderId) {
        Delivery delivery = deliveryRepository
            .findByOrderIdForUpdate(orderId)
            .orElseThrow(() ->
                new org.springframework.web.server.ResponseStatusException(
                    org.springframework.http.HttpStatus.NOT_FOUND,
                    "Delivery not found"
                )
            );
        if ("DELIVERED".equals(delivery.getStatus())) return;
        if (
            delivery.getOtpVerifiedAt() == null ||
            delivery.getOtpVerifiedAt().isBefore(LocalDateTime.now().minusMinutes(10)) ||
            !"IN_TRANSIT".equals(delivery.getStatus())
        ) throw new IllegalArgumentException("A current verified handover OTP is required");
        delivery.setStatus("DELIVERED");
        delivery.setActualDeliveryTime(LocalDateTime.now());
        delivery.getOrder().setStatus("DELIVERED");
        orderRepository.save(delivery.getOrder());
        deliveryRepository.save(delivery);
        settlements.deliver(orderId);
        events.record(
            orderId,
            "delivered",
            "DELIVERED",
            "Delivery completed with verified handover."
        );

        if (delivery.getDeliveryBoy() != null) jdbc.update(
            "update fleet_vehicles set status='ACTIVE' where agent_id=?",
            delivery.getDeliveryBoy().getId()
        );
        afterCommit(() ->
            webSocketHandler.broadcastStatusUpdate(
                orderId,
                "DELIVERED",
                "Your order has been delivered"
            )
        );
    }

    public Delivery getDelivery(Integer orderId) {
        return deliveryRepository
            .findByOrderId(orderId)
            .orElseThrow(() ->
                new org.springframework.web.server.ResponseStatusException(
                    org.springframework.http.HttpStatus.NOT_FOUND,
                    "Delivery not found"
                )
            );
    }

    public java.util.Map<String, Object> getDeliveryView(Integer orderId) {
        Delivery delivery = getDelivery(orderId);
        var result = new java.util.LinkedHashMap<String, Object>();
        result.put("orderNumber", delivery.getOrder().getOrderNumber());
        result.put("id", delivery.getId());
        result.put("orderId", orderId);
        result.put("order", orderService.getOrder(orderId));
        result.put("status", delivery.getStatus());
        result.put("estimatedDeliveryTime", delivery.getEstimatedDeliveryTime());
        result.put("actualDeliveryTime", delivery.getActualDeliveryTime());
        if (delivery.getDeliveryBoy() != null) {
            var agent = delivery.getDeliveryBoy();
            result.put(
                "deliveryBoy",
                java.util.Map.of(
                    "id",
                    agent.getId(),
                    "firstName",
                    agent.getFirstName() == null ? "" : agent.getFirstName(),
                    "lastName",
                    agent.getLastName() == null ? "" : agent.getLastName()
                )
            );
        }
        var locations = locationRepository
            .findTop100ByDeliveryIdOrderByTimestampDesc(delivery.getId())
            .stream()
            .map(l -> {
                var point = new java.util.LinkedHashMap<String, Object>();
                point.put("latitude", l.getLatitude());
                point.put("longitude", l.getLongitude());
                point.put("accuracy", l.getAccuracy());
                point.put("timestamp", l.getTimestamp());
                return point;
            })
            .toList();
        result.put("locations", locations);
        result.put("currentLocation", locations.isEmpty() ? null : locations.get(0));
        return result;
    }
}
