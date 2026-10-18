package com.truehand.service;

import com.truehand.model.DeliveryPersonnel;
import com.truehand.model.SellerProfile;
import com.truehand.repository.DeliveryPersonnelRepository;
import com.truehand.repository.OrderRepository;
import com.truehand.repository.SellerProfileRepository;
import com.truehand.repository.UserRepository;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final SellerProfileRepository sellerProfileRepository;
    private final DeliveryPersonnelRepository deliveryPersonnelRepository;
    private final UserRepository userRepository;
    private final OrderRepository orderRepository;
    private final org.springframework.jdbc.core.JdbcTemplate jdbc;

    private org.springframework.data.domain.Pageable page(
        org.springframework.data.domain.Pageable pageable
    ) {
        return com.truehand.controller.PagedResponses.bounded(
            pageable,
            org.springframework.data.domain.Sort.by(
                org.springframework.data.domain.Sort.Direction.DESC,
                "id"
            )
        );
    }

    public org.springframework.data.domain.Page<SellerProfile> getPendingSellers(
        org.springframework.data.domain.Pageable pageable
    ) {
        return sellerProfileRepository.findByKycStatus("PENDING", page(pageable));
    }

    public org.springframework.data.domain.Page<DeliveryPersonnel> getPendingDeliveryPartners(
        org.springframework.data.domain.Pageable pageable
    ) {
        return deliveryPersonnelRepository.findByKycStatus("PENDING", page(pageable));
    }

    private void validateDecision(String status, String reason) {
        if (
            !java.util.Set.of("APPROVED", "REJECTED").contains(status == null ? "" : status)
        ) throw new IllegalArgumentException("Use APPROVED or REJECTED");
        if (reason != null && reason.length() > 255) throw new IllegalArgumentException(
            "Rejection reason must be at most 255 characters"
        );
    }

    public SellerProfile approveSellerKyc(Integer sellerId, String status, String reason) {
        validateDecision(status, reason);
        SellerProfile profile = sellerProfileRepository
            .findByUserId(sellerId)
            .orElseThrow(() ->
                new org.springframework.web.server.ResponseStatusException(
                    org.springframework.http.HttpStatus.NOT_FOUND,
                    "Seller profile not found"
                )
            );
        profile.setKycStatus(status);
        profile.setRejectionReason("REJECTED".equals(status) ? reason : null);
        return sellerProfileRepository.save(profile);
    }

    public DeliveryPersonnel approveDeliveryKyc(Integer deliveryId, String status, String reason) {
        validateDecision(status, reason);
        DeliveryPersonnel profile = deliveryPersonnelRepository
            .findByUserId(deliveryId)
            .orElseThrow(() ->
                new org.springframework.web.server.ResponseStatusException(
                    org.springframework.http.HttpStatus.NOT_FOUND,
                    "Delivery profile not found"
                )
            );
        profile.setKycStatus(status);
        profile.setRejectionReason("REJECTED".equals(status) ? reason : null);
        return deliveryPersonnelRepository.save(profile);
    }

    @org.springframework.transaction.annotation.Transactional(readOnly = true)
    public Map<String, Object> getMetrics() {
        Map<String, Object> metrics = new HashMap<>();
        metrics.put("totalUsers", userRepository.count());
        metrics.put("totalOrders", orderRepository.count());
        metrics.put("pendingSellers", sellerProfileRepository.countByKycStatus("PENDING"));
        metrics.put("pendingDelivery", deliveryPersonnelRepository.countByKycStatus("PENDING"));

        String paid = "payment_status='PAID' and status not in ('CANCELED','CANCELLED')";
        metrics.put(
            "totalRevenue",
            jdbc.queryForObject(
                "select coalesce(sum(total_amount),0) from orders where " + paid,
                java.math.BigDecimal.class
            )
        );
        metrics.put(
            "topProducts",
            jdbc.queryForList(
                "select p.id as \"productId\",p.name,sum(oi.quantity) as quantity from order_items oi join orders o on o.id=oi.order_id join products p on p.id=oi.product_id where o.payment_status='PAID' and o.status not in ('CANCELED','CANCELLED') group by p.id,p.name order by sum(oi.quantity) desc,p.id limit 10"
            )
        );
        var firstMonth = java.time.YearMonth.now(java.time.ZoneOffset.UTC).minusMonths(11);
        var monthly = jdbc.query(
            "select to_char(created_at,'YYYY-MM') as month,sum(total_amount) as amount from orders where " +
                paid +
                " and created_at>=? and created_at<? group by to_char(created_at,'YYYY-MM')",
            (rs, index) -> Map.entry(rs.getString("month"), rs.getBigDecimal("amount")),
            firstMonth.atDay(1).atStartOfDay(),
            firstMonth.plusMonths(12).atDay(1).atStartOfDay()
        );
        var amounts = monthly
            .stream()
            .collect(java.util.stream.Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));
        List<java.math.BigDecimal> revenueTrend = new java.util.ArrayList<>();
        List<String> revenueMonths = new java.util.ArrayList<>();
        for (int index = 0; index < 12; index++) {
            var month = firstMonth.plusMonths(index);
            revenueMonths.add(month.toString());
            revenueTrend.add(amounts.getOrDefault(month.toString(), java.math.BigDecimal.ZERO));
        }
        metrics.put("revenueTrend", revenueTrend);
        metrics.put("revenueMonths", revenueMonths);

        return metrics;
    }

    public org.springframework.data.domain.Page<com.truehand.model.User> getAllUsers(
        org.springframework.data.domain.Pageable pageable
    ) {
        return userRepository.findAll(page(pageable));
    }
}
