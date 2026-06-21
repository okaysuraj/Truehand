package com.truehand.service;

import com.truehand.dto.SellerOrderItemDTO;
import com.truehand.dto.SellerStatsDTO;
import com.truehand.model.OrderItem;
import com.truehand.repository.OrderItemRepository;
import com.truehand.repository.ProductRepository;
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

    private SellerOrderItemDTO mapToDTO(OrderItem item) {
        return SellerOrderItemDTO.builder()
                .orderNumber(item.getOrder().getOrderNumber())
                .customerCity(item.getOrder().getDeliveryCity())
                .productName(item.getProduct().getName())
                .productImageUrl(item.getProduct().getImageUrl())
                .quantity(item.getQuantity())
                .priceAtPurchase(item.getPriceAtPurchase())
                .orderDate(item.getOrder().getCreatedAt())
                .orderStatus(item.getOrder().getStatus())
                .build();
    }
}
