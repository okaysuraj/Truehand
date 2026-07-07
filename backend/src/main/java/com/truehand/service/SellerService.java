package com.truehand.service;

import com.truehand.dto.SellerOrderItemDTO;
import com.truehand.dto.SellerStatsDTO;
import com.truehand.dto.SellerProfileDTO;
import com.truehand.model.OrderItem;
import com.truehand.repository.OrderItemRepository;
import com.truehand.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import com.truehand.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SellerService {

    private final OrderItemRepository orderItemRepository;
    private final ProductRepository productRepository;
    private final com.truehand.repository.SellerProfileRepository sellerProfileRepository;
    private final com.truehand.repository.UserRepository userRepository;
    private final OrderRepository orderRepository;

    public SellerStatsDTO getSellerStats(Integer sellerId) {
        BigDecimal revenue = orderItemRepository.sumRevenueBySellerId(sellerId);
        if (revenue == null) revenue = BigDecimal.ZERO;

        Integer activeOrders = orderItemRepository.countActiveOrdersBySellerId(sellerId);
        if (activeOrders == null) activeOrders = 0;

        Integer totalProducts = productRepository.findBySellerId(sellerId).size();

        return SellerStatsDTO.builder()
                .totalRevenue(revenue)
                .activeOrders(activeOrders)
                .totalProducts(totalProducts)
                .build();
    }

    public List<SellerOrderItemDTO> getSellerOrders(Integer sellerId) {
        List<OrderItem> items = orderItemRepository.findByProductSellerId(sellerId);
        return items.stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    public SellerOrderItemDTO updateOrderStatus(Integer sellerId, String orderNumber, String status) {
        com.truehand.model.Order order = orderRepository.findByOrderNumber(orderNumber)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        
        // Ensure this seller has an item in this order
        List<OrderItem> items = orderItemRepository.findByProductSellerId(sellerId);
        boolean hasItem = items.stream().anyMatch(i -> i.getOrder().getId().equals(order.getId()));
        if (!hasItem) {
            throw new RuntimeException("Not authorized to update this order");
        }

        order.setStatus(status); // e.g. SHIPPED, DELIVERED, CANCELLED
        orderRepository.save(order);

        // Just returning the first item matching as a representation
        OrderItem matchedItem = items.stream().filter(i -> i.getOrder().getId().equals(order.getId())).findFirst().get();
        return mapToDTO(matchedItem);
    }

    private SellerOrderItemDTO mapToDTO(OrderItem item) {
        return SellerOrderItemDTO.builder()
                .orderNumber(item.getOrder().getOrderNumber())
                .customerCity(item.getOrder().getDeliveryAddress() != null ? item.getOrder().getDeliveryAddress().getCity() : "N/A")
                .productName(item.getProduct().getName())
                .productImageUrl(item.getProduct().getImageUrl())
                .quantity(item.getQuantity())
                .priceAtPurchase(item.getPriceAtPurchase())
                .orderDate(item.getOrder().getCreatedAt())
                .orderStatus(item.getOrder().getStatus())
                .build();
    }

    public SellerProfileDTO submitKYC(Integer sellerId, SellerProfileDTO dto) {
        com.truehand.model.User user = userRepository.findById(sellerId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        com.truehand.model.SellerProfile profile = sellerProfileRepository.findByUserId(sellerId)
                .orElse(com.truehand.model.SellerProfile.builder().user(user).build());

        profile.setBusinessName(dto.getBusinessName());
        profile.setPanNumber(dto.getPanNumber());
        profile.setGstNumber(dto.getGstNumber());
        profile.setBankAccountNumber(dto.getBankAccountNumber());
        profile.setIfscCode(dto.getIfscCode());
        profile.setKycStatus("PENDING"); // Reset to pending upon resubmission
        profile.setRejectionReason(null);

        sellerProfileRepository.save(profile);
        return mapProfileToDTO(profile);
    }

    public SellerProfileDTO getProfile(Integer sellerId) {
        com.truehand.model.SellerProfile profile = sellerProfileRepository.findByUserId(sellerId)
                .orElseThrow(() -> new RuntimeException("Profile not found"));
        return mapProfileToDTO(profile);
    }

    private SellerProfileDTO mapProfileToDTO(com.truehand.model.SellerProfile profile) {
        return SellerProfileDTO.builder()
                .businessName(profile.getBusinessName())
                .panNumber(profile.getPanNumber())
                .gstNumber(profile.getGstNumber())
                .bankAccountNumber(profile.getBankAccountNumber())
                .ifscCode(profile.getIfscCode())
                .kycStatus(profile.getKycStatus())
                .rejectionReason(profile.getRejectionReason())
                .build();
    }
}
