package com.truehand.service;

import com.truehand.dto.SellerOrderItemDTO;
import com.truehand.dto.SellerProfileDTO;
import com.truehand.dto.SellerStatsDTO;
import com.truehand.model.OrderItem;
import com.truehand.repository.OrderItemRepository;
import com.truehand.repository.OrderRepository;
import com.truehand.repository.ProductRepository;
import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.stereotype.Service;

@Service
@org.springframework.transaction.annotation.Transactional
@RequiredArgsConstructor
public class SellerService {

    private final OrderItemRepository orderItemRepository;
    private final ProductRepository productRepository;
    private final com.truehand.repository.SellerProfileRepository sellerProfileRepository;
    private final com.truehand.repository.UserRepository userRepository;
    private final OrderRepository orderRepository;
    private final FulfillmentService fulfillments;

    public SellerStatsDTO getSellerStats(Integer sellerId) {
        BigDecimal revenue = orderItemRepository.sumRevenueBySellerId(sellerId);
        if (revenue == null) revenue = BigDecimal.ZERO;

        Integer activeOrders = orderItemRepository.countActiveOrdersBySellerId(sellerId);
        if (activeOrders == null) activeOrders = 0;

        Integer totalProducts = productRepository.countBySellerId(sellerId);

        return SellerStatsDTO.builder()
            .totalRevenue(revenue)
            .activeOrders(activeOrders)
            .totalProducts(totalProducts)
            .build();
    }

    @org.springframework.transaction.annotation.Transactional(readOnly = true)
    public org.springframework.data.domain.Page<SellerOrderItemDTO> getSellerOrders(
        Integer sellerId,
        org.springframework.data.domain.Pageable pageable
    ) {
        var items = orderItemRepository.findSellerHistory(
            sellerId,
            com.truehand.controller.PagedResponses.bounded(pageable)
        );
        var states = fulfillments.statuses(
            items
                .getContent()
                .stream()
                .map(item -> item.getOrder().getId())
                .distinct()
                .toList(),
            sellerId
        );
        return items.map(item ->
            mapToDTO(
                item,
                states.getOrDefault(item.getOrder().getId(), item.getOrder().getStatus())
            )
        );
    }

    public SellerOrderItemDTO updateOrderStatus(
        Integer sellerId,
        String orderNumber,
        String status
    ) {
        com.truehand.model.Order order = orderRepository
            .findByOrderNumber(orderNumber)
            .orElseThrow(() ->
                new org.springframework.web.server.ResponseStatusException(
                    org.springframework.http.HttpStatus.NOT_FOUND,
                    "Order not found"
                )
            );

        // Ensure this seller has an item in this order
        OrderItem matchedItem = orderItemRepository
            .findFirstBySellerIdSnapshotAndOrder_IdOrderByIdAsc(sellerId, order.getId())
            .orElseThrow(() ->
                new org.springframework.web.server.ResponseStatusException(
                    org.springframework.http.HttpStatus.FORBIDDEN,
                    "Not authorized to update this order"
                )
            );

        fulfillments.transition(order.getId(), sellerId, status);
        return mapToDTO(matchedItem);
    }

    private SellerOrderItemDTO mapToDTO(OrderItem item) {
        return mapToDTO(
            item,
            fulfillments.status(
                item.getOrder().getId(),
                item.getSellerIdSnapshot(),
                item.getOrder().getStatus()
            )
        );
    }

    private SellerOrderItemDTO mapToDTO(OrderItem item, String status) {
        return SellerOrderItemDTO.builder()
            .id(item.getId())
            .sellerId(item.getSellerIdSnapshot())
            .orderNumber(item.getOrder().getOrderNumber())
            .deliveryAddress(item.getOrder().getDeliveryAddressSnapshot())
            .paymentStatus(item.getOrder().getPaymentStatus())
            .customerCity(
                item.getOrder().getDeliveryAddress() != null
                    ? item.getOrder().getDeliveryAddress().getCity()
                    : "N/A"
            )
            .productName(
                item.getProductNameSnapshot() != null
                    ? item.getProductNameSnapshot()
                    : item.getProduct().getName()
            )
            .productImageUrl(item.getImageUrlSnapshot())
            .quantity(item.getQuantity())
            .priceAtPurchase(item.getPriceAtPurchase())
            .orderDate(item.getOrder().getCreatedAt())
            .orderStatus(status)
            .variantSku(item.getVariantSkuSnapshot())
            .variantDescription(item.getVariantDescriptionSnapshot())
            .build();
    }

    public SellerProfileDTO submitKYC(Integer sellerId, SellerProfileDTO dto) {
        com.truehand.model.User user = userRepository
            .findById(sellerId)
            .orElseThrow(() ->
                new org.springframework.web.server.ResponseStatusException(
                    org.springframework.http.HttpStatus.NOT_FOUND,
                    "User not found"
                )
            );

        com.truehand.model.SellerProfile profile = sellerProfileRepository
            .findByUserId(sellerId)
            .orElse(com.truehand.model.SellerProfile.builder().user(user).build());

        profile.setBusinessName(dto.getBusinessName());
        if (
            dto.getBusinessName() == null ||
            dto.getBusinessName().isBlank() ||
            dto.getIfscCode() == null ||
            !dto.getIfscCode().matches("[A-Z]{4}0[A-Z0-9]{6}")
        ) throw new IllegalArgumentException("Business name and valid IFSC are required");
        if (dto.getPanNumber() != null && !dto.getPanNumber().startsWith("****")) {
            if (
                !dto.getPanNumber().matches("[A-Z]{5}[0-9]{4}[A-Z]")
            ) throw new IllegalArgumentException("Enter a valid PAN");
            profile.setPanNumber(dto.getPanNumber());
        }
        profile.setGstNumber(dto.getGstNumber());
        if (dto.getBankAccountNumber() != null && !dto.getBankAccountNumber().startsWith("****")) {
            if (
                !dto.getBankAccountNumber().matches("[0-9]{6,34}")
            ) throw new IllegalArgumentException("Enter a valid bank account number");
            profile.setBankAccountNumber(dto.getBankAccountNumber());
        }
        profile.setIfscCode(dto.getIfscCode());
        profile.setKycStatus("PENDING"); // Reset to pending upon resubmission
        profile.setRejectionReason(null);

        sellerProfileRepository.save(profile);
        return mapProfileToDTO(profile);
    }

    public SellerProfileDTO getProfile(Integer sellerId) {
        com.truehand.model.SellerProfile profile = sellerProfileRepository
            .findByUserId(sellerId)
            .orElseThrow(() ->
                new org.springframework.web.server.ResponseStatusException(
                    org.springframework.http.HttpStatus.NOT_FOUND,
                    "Profile not found"
                )
            );
        return mapProfileToDTO(profile);
    }

    private SellerProfileDTO mapProfileToDTO(com.truehand.model.SellerProfile profile) {
        return SellerProfileDTO.builder()
            .businessName(profile.getBusinessName())
            .panNumber(com.truehand.security.EncryptedValueConverter.mask(profile.getPanNumber()))
            .gstNumber(profile.getGstNumber())
            .bankAccountNumber(
                com.truehand.security.EncryptedValueConverter.mask(profile.getBankAccountNumber())
            )
            .ifscCode(profile.getIfscCode())
            .kycStatus(profile.getKycStatus())
            .rejectionReason(profile.getRejectionReason())
            .build();
    }
}
