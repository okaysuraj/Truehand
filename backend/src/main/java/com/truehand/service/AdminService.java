package com.truehand.service;

import com.truehand.model.DeliveryPersonnel;
import com.truehand.model.SellerProfile;
import com.truehand.repository.DeliveryPersonnelRepository;
import com.truehand.repository.SellerProfileRepository;
import com.truehand.repository.UserRepository;
import com.truehand.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AdminService {
    private final SellerProfileRepository sellerProfileRepository;
    private final DeliveryPersonnelRepository deliveryPersonnelRepository;
    private final UserRepository userRepository;
    private final OrderRepository orderRepository;

    public List<SellerProfile> getPendingSellers() {
        return sellerProfileRepository.findAll().stream()
                .filter(p -> "PENDING".equals(p.getKycStatus()))
                .collect(java.util.stream.Collectors.toList());
    }

    public List<DeliveryPersonnel> getPendingDeliveryPartners() {
        return deliveryPersonnelRepository.findAll().stream()
                .filter(p -> "PENDING".equals(p.getKycStatus()))
                .collect(java.util.stream.Collectors.toList());
    }

    public SellerProfile approveSellerKyc(Integer sellerId, String status, String reason) {
        SellerProfile profile = sellerProfileRepository.findByUserId(sellerId)
                .orElseThrow(() -> new RuntimeException("Seller profile not found"));
        profile.setKycStatus(status);
        profile.setRejectionReason(reason);
        return sellerProfileRepository.save(profile);
    }

    public DeliveryPersonnel approveDeliveryKyc(Integer deliveryId, String status, String reason) {
        DeliveryPersonnel profile = deliveryPersonnelRepository.findByUserId(deliveryId)
                .orElseThrow(() -> new RuntimeException("Delivery profile not found"));
        profile.setKycStatus(status);
        profile.setRejectionReason(reason);
        return deliveryPersonnelRepository.save(profile);
    }

    public Map<String, Object> getMetrics() {
        Map<String, Object> metrics = new HashMap<>();
        metrics.put("totalUsers", userRepository.count());
        metrics.put("totalOrders", orderRepository.count());
        metrics.put("pendingSellers", getPendingSellers().size());
        metrics.put("pendingDelivery", getPendingDeliveryPartners().size());
        
        java.math.BigDecimal totalRevenue = orderRepository.findAll().stream()
            .map(com.truehand.model.Order::getTotalAmount)
            .filter(java.util.Objects::nonNull)
            .reduce(java.math.BigDecimal.ZERO, java.math.BigDecimal::add);
        metrics.put("totalRevenue", totalRevenue);
        
        // Calculate Top Products (Mocking the aggregation for now, but using real DB structure)
        List<Map<String, Object>> topProducts = new java.util.ArrayList<>();
        metrics.put("topProducts", topProducts);

        // Revenue Trend
        List<Integer> revenueTrend = java.util.Arrays.asList(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
        metrics.put("revenueTrend", revenueTrend);
        
        return metrics;
    }

    public List<com.truehand.model.User> getAllUsers() {
        return userRepository.findAll();
    }
}
