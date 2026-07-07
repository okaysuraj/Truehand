package com.truehand.service;

import com.truehand.model.Delivery;
import com.truehand.model.Location;
import com.truehand.repository.DeliveryRepository;
import com.truehand.repository.LocationRepository;
import com.truehand.websocket.LocationUpdate;
import com.truehand.websocket.TrackingWebSocketHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DeliveryService {
    private final DeliveryRepository deliveryRepository;
    private final LocationRepository locationRepository;
    private final TrackingWebSocketHandler webSocketHandler;
    private final com.truehand.repository.UserRepository userRepository;

    public void assignDelivery(Integer orderId, Integer deliveryBoyId) {
        Delivery delivery = deliveryRepository.findByOrderId(orderId)
                .orElseThrow(() -> new RuntimeException("Delivery not found"));
        
        com.truehand.model.User deliveryBoy = userRepository.findById(deliveryBoyId)
                .orElseThrow(() -> new RuntimeException("Delivery boy not found"));

        delivery.setDeliveryBoy(deliveryBoy);
        delivery.setStatus("ASSIGNED");
        deliveryRepository.save(delivery);
        
        try {
            webSocketHandler.broadcastStatusUpdate(orderId, "ASSIGNED", "Delivery partner assigned");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public List<Delivery> getDeliveriesByPartner(Integer deliveryBoyId) {
        return deliveryRepository.findAll().stream()
            .filter(d -> d.getDeliveryBoy() != null && d.getDeliveryBoy().getId().equals(deliveryBoyId))
            .collect(java.util.stream.Collectors.toList());
    }

    public void startDelivery(Integer orderId) {
        Delivery delivery = deliveryRepository.findByOrderId(orderId)
                .orElseThrow(() -> new RuntimeException("Delivery not found"));
        
        delivery.setStatus("IN_TRANSIT");
        deliveryRepository.save(delivery);
        
        // Notify clients via WebSocket
        try {
            webSocketHandler.broadcastStatusUpdate(orderId, "IN_TRANSIT", "Your delivery is on the way");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void updateLocation(Integer orderId, BigDecimal latitude, BigDecimal longitude, BigDecimal accuracy) {
        Delivery delivery = deliveryRepository.findByOrderId(orderId)
                .orElseThrow(() -> new RuntimeException("Delivery not found"));
        
        // Save location
        Location location = Location.builder()
                .delivery(delivery)
                .latitude(latitude)
                .longitude(longitude)
                .accuracy(accuracy != null ? accuracy : BigDecimal.ZERO)
                .timestamp(LocalDateTime.now())
                .build();
        
        locationRepository.save(location);
        
        // Broadcast to clients
        try {
            LocationUpdate update = LocationUpdate.builder()
                    .latitude(latitude)
                    .longitude(longitude)
                    .accuracy(accuracy != null ? accuracy.doubleValue() : 0.0)
                    .timestamp(System.currentTimeMillis())
                    .status(delivery.getStatus())
                    .build();
            
            webSocketHandler.broadcastLocationUpdate(orderId, update);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void completeDelivery(Integer orderId) {
        Delivery delivery = deliveryRepository.findByOrderId(orderId)
                .orElseThrow(() -> new RuntimeException("Delivery not found"));
        
        delivery.setStatus("DELIVERED");
        delivery.setActualDeliveryTime(LocalDateTime.now());
        deliveryRepository.save(delivery);
        
        try {
            webSocketHandler.broadcastStatusUpdate(orderId, "DELIVERED", "Your order has been delivered");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public Delivery getDelivery(Integer orderId) {
        return deliveryRepository.findByOrderId(orderId)
                .orElseThrow(() -> new RuntimeException("Delivery not found"));
    }

    // A fake warehouse coordinate in India (Bangalore roughly)
    private static final BigDecimal WAREHOUSE_LAT = new BigDecimal("12.9716");
    private static final BigDecimal WAREHOUSE_LNG = new BigDecimal("77.5946");

    public void simulateLocationUpdate(Integer orderId) {
        Delivery delivery = deliveryRepository.findByOrderId(orderId)
                .orElseThrow(() -> new RuntimeException("Delivery not found"));

        if (!"IN_TRANSIT".equals(delivery.getStatus()) && !"OUT_FOR_DELIVERY".equals(delivery.getStatus())) {
            startDelivery(orderId);
            delivery = deliveryRepository.findByOrderId(orderId).get();
        }

        java.util.List<Location> locations = locationRepository.findByDeliveryIdOrderByTimestampDesc(delivery.getId());
        
        BigDecimal newLat, newLng;
        if (locations.isEmpty()) {
            newLat = WAREHOUSE_LAT;
            newLng = WAREHOUSE_LNG;
        } else {
            Location last = locations.get(0);
            double jitterLat = 0.0005 + (Math.random() * 0.001);
            double jitterLng = 0.0005 + (Math.random() * 0.001);
            newLat = last.getLatitude().add(new BigDecimal(String.valueOf(jitterLat)));
            newLng = last.getLongitude().add(new BigDecimal(String.valueOf(jitterLng)));
        }

        updateLocation(orderId, newLat, newLng, new BigDecimal("10.0"));
    }
}
