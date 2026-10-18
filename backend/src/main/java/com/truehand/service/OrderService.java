package com.truehand.service;

import com.truehand.dto.OrderDTO;
import com.truehand.model.*;
import com.truehand.repository.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/** Reserves stock and records checkout, cancellation, and after-sales order transitions. */
@Service
@Transactional
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final ProductRepository productRepository;
    private final ProductVariantRepository variants;
    private final UserRepository userRepository;
    private final DeliveryRepository deliveryRepository;
    private final AddressRepository addressRepository;
    private final PromoService promos;
    private final SupportRequestRepository supportRequestRepository;
    private final OrderEventService events;
    private final FulfillmentService fulfillments;
    private final CommercePolicyService policies;

    @Transactional
    public OrderDTO createOrder(Integer userId, OrderDTO dto) {
        User user = userRepository
            .findByIdForUpdate(userId)
            .orElseThrow(() ->
                new org.springframework.web.server.ResponseStatusException(
                    org.springframework.http.HttpStatus.NOT_FOUND,
                    "User not found"
                )
            );

        if (dto.getCheckoutKey() == null || !dto.getCheckoutKey().matches("[A-Za-z0-9-]{16,100}")) {
            throw new IllegalArgumentException("A unique checkoutKey is required");
        }
        String checkoutKey = userId + ":" + dto.getCheckoutKey();
        var existing = orderRepository.findByCheckoutKey(checkoutKey);
        if (existing.isPresent()) return mapToDTO(existing.get());
        Address address = checkoutAddress(userId, dto);
        var quantities = checkoutQuantities(dto);
        LocalDateTime now = LocalDateTime.now(java.time.ZoneOffset.UTC);
        List<OrderItem> items = new ArrayList<>();
        for (var entry : quantities.entrySet()) {
            items.add(reserveItem(entry.getKey(), entry.getValue(), now));
        }
        BigDecimal finalAmount = items
            .stream()
            .map(item -> item.getPriceAtPurchase().multiply(BigDecimal.valueOf(item.getQuantity())))
            .reduce(BigDecimal.ZERO, BigDecimal::add);
        PromoService.Quote quote = null;
        if (dto.getPromoCode() != null && !dto.getPromoCode().isBlank()) {
            quote = promos.apply(dto.getPromoCode(), userId, items, true);
            finalAmount = finalAmount.subtract(quote.discountAmount());
        }
        if (finalAmount.signum() <= 0) throw new IllegalArgumentException(
            "Order total must be positive"
        );

        Order order = Order.builder()
            .user(user)
            .orderNumber(
                "TH-" +
                    UUID.randomUUID().toString().replace("-", "").toUpperCase(java.util.Locale.ROOT)
            )
            .totalAmount(finalAmount)
            .status("PENDING")
            .paymentStatus("PENDING")
            .paymentExpiresAt(now.plusMinutes(30))
            .checkoutKey(checkoutKey)
            .deliveryAddress(address)
            .deliveryAddressSnapshot(
                java.util.stream.Stream.of(
                    address.getStreetAddress(),
                    address.getCity(),
                    address.getState(),
                    address.getPostalCode(),
                    address.getCountry()
                )
                    .filter(java.util.Objects::nonNull)
                    .collect(java.util.stream.Collectors.joining(", "))
            )
            .specialInstructions(dto.getSpecialInstructions())
            .createdAt(LocalDateTime.now())
            .updatedAt(LocalDateTime.now())
            .build();

        Order saved = orderRepository.save(order);

        List<OrderItem> savedItems = new ArrayList<>();
        for (OrderItem item : items) {
            item.setOrder(saved);
            savedItems.add(orderItemRepository.save(item));
        }
        saved.setOrderItems(savedItems);

        // Create initial delivery entry
        Delivery delivery = Delivery.builder().order(saved).status("PENDING").build();
        deliveryRepository.save(delivery);
        saved.setDelivery(delivery);
        orderRepository.flush();
        if (quote != null) promos.reserve(quote, saved.getId(), userId);
        events.record(saved.getId(), "created", "PENDING", "Order placed; awaiting payment.");
        return mapToDTO(saved);
    }

    // Sort stock locks by product and variant so overlapping checkouts cannot deadlock.
    private record Choice(Integer productId, Integer variantId) {}

    private Address checkoutAddress(Integer userId, OrderDTO dto) {
        if (dto.getAddressId() == null) throw new IllegalArgumentException(
            "Select a saved delivery address"
        );
        Address address = addressRepository
            .findById(dto.getAddressId())
            .orElseThrow(() -> new IllegalArgumentException("Delivery address not found"));
        if (!userId.equals(address.getUser().getId())) throw new IllegalArgumentException(
            "Address does not belong to this account"
        );
        return address;
    }

    private java.util.Map<Choice, Integer> checkoutQuantities(OrderDTO dto) {
        if (
            dto.getOrderItems() == null ||
            dto.getOrderItems().isEmpty() ||
            dto.getOrderItems().size() > 100
        ) {
            throw new IllegalArgumentException("An order requires between 1 and 100 items");
        }
        // Deterministic lock order prevents deadlocks between carts containing the same products.
        java.util.Map<Choice, Integer> quantities = new java.util.TreeMap<>(
            java.util.Comparator.comparing(Choice::productId).thenComparing(
                Choice::variantId,
                java.util.Comparator.nullsFirst(Integer::compareTo)
            )
        );
        for (var item : dto.getOrderItems()) {
            if (
                item.getProductId() == null ||
                item.getQuantity() == null ||
                item.getQuantity() < 1 ||
                item.getQuantity() > 1000
            ) {
                throw new IllegalArgumentException("Invalid product or quantity");
            }
            quantities.merge(
                new Choice(item.getProductId(), item.getVariantId()),
                item.getQuantity(),
                Math::addExact
            );
        }
        return quantities;
    }

    private OrderItem reserveItem(Choice choice, int qty, LocalDateTime now) {
        Product product = productRepository
            .findByIdForUpdate(choice.productId())
            .orElseThrow(() -> new IllegalArgumentException("Product not found"));
        if (
            product.getSeller() != null && !policies.acceptingOrders(product.getSeller().getId())
        ) throw new IllegalArgumentException("This seller is not accepting new orders");
        ProductVariant variant =
            choice.variantId() == null
                ? null
                : variants
                      .findByIdForUpdate(choice.variantId())
                      .orElseThrow(() -> new IllegalArgumentException("Variant not found"));
        if (
            variant != null &&
            (!product.getId().equals(variant.getProduct().getId()) ||
                !Boolean.TRUE.equals(variant.getIsActive()))
        ) throw new IllegalArgumentException(
            "Variant does not belong to this product or is retired"
        );
        if (
            variant == null && product.getVariants() != null && !product.getVariants().isEmpty()
        ) throw new IllegalArgumentException("Choose a product variant");
        Integer stock = variant == null ? product.getStockQuantity() : variant.getStockQuantity();
        if (
            qty > 1000 ||
            !Boolean.TRUE.equals(product.getIsAvailable()) ||
            !"APPROVED".equals(product.getApprovalStatus()) ||
            (product.getSeller() != null &&
                !Boolean.TRUE.equals(product.getSeller().getIsActive())) ||
            stock == null ||
            stock < qty
        ) {
            throw new IllegalArgumentException(
                "Product is unavailable or has insufficient stock: " + product.getName()
            );
        }
        BigDecimal price = product.getPrice();
        if (
            product.getSalePrice() != null &&
            product.getSaleStartsAt() != null &&
            product.getSaleEndsAt() != null &&
            !now.isBefore(product.getSaleStartsAt()) &&
            now.isBefore(product.getSaleEndsAt())
        ) price = product.getSalePrice();
        if (variant != null) price = price.add(variant.getAdditionalPrice());
        if (price == null || price.signum() <= 0) throw new IllegalArgumentException(
            "Invalid product price"
        );
        if (variant == null) {
            product.setStockQuantity(stock - qty);
            productRepository.save(product);
        } else {
            variant.setStockQuantity(stock - qty);
            variants.save(variant);
        }
        return OrderItem.builder()
            .product(product)
            .sellerIdSnapshot(product.getSeller() == null ? null : product.getSeller().getId())
            .variant(variant)
            .variantSkuSnapshot(variant == null ? null : variant.getSku())
            .variantDescriptionSnapshot(
                variant == null
                    ? null
                    : java.util.stream.Stream.of(variant.getSize(), variant.getColor())
                          .filter(java.util.Objects::nonNull)
                          .collect(Collectors.joining(" / "))
            )
            .productNameSnapshot(product.getName())
            .imageUrlSnapshot(
                variant != null && variant.getImageUrl() != null
                    ? variant.getImageUrl()
                    : product.getImageUrl()
            )
            .quantity(qty)
            .priceAtPurchase(price)
            .createdAt(now)
            .build();
    }

    public OrderDTO getOrder(Integer id) {
        return orderRepository
            .findById(id)
            .map(this::mapToDTO)
            .orElseThrow(() ->
                new org.springframework.web.server.ResponseStatusException(
                    org.springframework.http.HttpStatus.NOT_FOUND,
                    "Order not found"
                )
            );
    }

    @Transactional(readOnly = true)
    public org.springframework.data.domain.Page<OrderDTO> getUserOrders(
        Integer userId,
        org.springframework.data.domain.Pageable pageable
    ) {
        return history(
            orderRepository.findPageIdsByUserId(
                userId,
                com.truehand.controller.PagedResponses.bounded(pageable)
            )
        );
    }

    @Transactional(readOnly = true)
    public org.springframework.data.domain.Page<OrderDTO> getAllOrders(
        org.springframework.data.domain.Pageable pageable
    ) {
        return history(
            orderRepository.findPageIds(com.truehand.controller.PagedResponses.bounded(pageable))
        );
    }

    private org.springframework.data.domain.Page<OrderDTO> history(
        org.springframework.data.domain.Page<Integer> ids
    ) {
        if (ids.isEmpty()) return new org.springframework.data.domain.PageImpl<>(
            List.of(),
            ids.getPageable(),
            ids.getTotalElements()
        );
        var loaded = orderRepository
            .findHistoryByIds(ids.getContent())
            .stream()
            .collect(Collectors.toMap(Order::getId, this::mapToDTO));
        return ids.map(loaded::get);
    }

    public OrderDTO updateOrderStatus(Integer id, String status) {
        Order order = orderRepository
            .findByIdForUpdate(id)
            .orElseThrow(() ->
                new org.springframework.web.server.ResponseStatusException(
                    org.springframework.http.HttpStatus.NOT_FOUND,
                    "Order not found"
                )
            );
        String expected = switch (order.getStatus()) {
            case "CONFIRMED" -> "PROCESSING";
            case "PROCESSING" -> "SHIPPED";
            case "SHIPPED" -> null;
            case "OUT_FOR_DELIVERY" -> null;
            default -> null;
        };
        if (
            !"PAID".equals(order.getPaymentStatus()) || !java.util.Objects.equals(expected, status)
        ) {
            throw new IllegalArgumentException("Invalid order status transition");
        }
        if (!fulfillments.transitionAll(id, status)) order.setStatus(status);
        events.record(
            id,
            "admin-status:" + status,
            order.getStatus(),
            "Order fulfillment updated by an administrator."
        );
        order.setUpdatedAt(LocalDateTime.now());
        return mapToDTO(orderRepository.save(order));
    }

    public OrderDTO cancelOrder(Integer id, String reason) {
        Order order = orderRepository
            .findByIdForUpdate(id)
            .orElseThrow(() ->
                new org.springframework.web.server.ResponseStatusException(
                    org.springframework.http.HttpStatus.NOT_FOUND,
                    "Order not found"
                )
            );

        if ("CANCELLED".equals(order.getStatus())) return mapToDTO(order);
        if (order.getPaymentIntentId() != null || "PAID".equals(order.getPaymentStatus())) {
            throw new IllegalArgumentException(
                "Payment cancellation or refund must be processed before cancelling this order"
            );
        }
        if (!"PENDING".equals(order.getStatus())) {
            throw new IllegalArgumentException("Order cannot be cancelled in its current state.");
        }

        for (OrderItem item : order
            .getOrderItems()
            .stream()
            .sorted(
                java.util.Comparator.comparing((OrderItem i) ->
                    i.getProduct().getId()
                ).thenComparing(i -> i.getVariant() == null ? 0 : i.getVariant().getId())
            )
            .toList()) {
            Product product = productRepository
                .findByIdForUpdate(item.getProduct().getId())
                .orElseThrow();
            if (item.getVariant() == null) {
                product.setStockQuantity(product.getStockQuantity() + item.getQuantity());
                productRepository.save(product);
            } else {
                var variant = variants.findByIdForUpdate(item.getVariant().getId()).orElseThrow();
                variant.setStockQuantity(variant.getStockQuantity() + item.getQuantity());
                variants.save(variant);
            }
        }
        order.setStatus("CANCELLED");
        promos.release(id);
        events.record(id, "cancelled", "CANCELLED", "Unpaid checkout cancelled.");
        order.setUpdatedAt(LocalDateTime.now());
        return mapToDTO(orderRepository.save(order));
    }

    public OrderDTO requestReturn(Integer id, String reason, String method, String comments) {
        Order order = orderRepository
            .findByIdForUpdate(id)
            .orElseThrow(() ->
                new org.springframework.web.server.ResponseStatusException(
                    org.springframework.http.HttpStatus.NOT_FOUND,
                    "Order not found"
                )
            );

        if ("RETURN_REQUESTED".equals(order.getStatus())) return mapToDTO(order);
        if (!"DELIVERED".equals(order.getStatus())) {
            throw new IllegalArgumentException("Only delivered orders can be returned.");
        }

        if (
            reason == null || reason.isBlank() || reason.length() > 2000
        ) throw new IllegalArgumentException("A return reason is required");
        order.setStatus("RETURN_REQUESTED");
        events.record(id, "return-requested", "RETURN_REQUESTED", "Customer requested a return.");
        createTicket(
            order,
            "Return request",
            "Reason: " + reason + "\nMethod: " + method + "\n" + comments,
            "RETURN"
        );
        order.setUpdatedAt(LocalDateTime.now());
        return mapToDTO(orderRepository.save(order));
    }

    public java.util.Map<String, String> reportIssue(
        Integer id,
        String subject,
        String description
    ) {
        Order order = orderRepository
            .findById(id)
            .orElseThrow(() ->
                new org.springframework.web.server.ResponseStatusException(
                    org.springframework.http.HttpStatus.NOT_FOUND,
                    "Order not found"
                )
            );

        SupportRequest ticket = createTicket(order, subject, description, "ORDER_ISSUE");
        java.util.Map<String, String> response = new java.util.HashMap<>();
        response.put("message", "Issue reported successfully");
        response.put("requestId", ticket.getRequestId());
        response.put("orderId", id.toString());
        response.put("status", "TICKET_CREATED");

        return response;
    }

    private SupportRequest createTicket(
        Order order,
        String subject,
        String description,
        String type
    ) {
        if (
            subject == null || subject.isBlank() || description == null || description.isBlank()
        ) throw new IllegalArgumentException("Subject and description are required");
        String now = LocalDateTime.now().toString();
        return supportRequestRepository.save(
            SupportRequest.builder()
                .requestId("TH-REQ-" + UUID.randomUUID())
                .user(order.getUser())
                .orderId(order.getId())
                .subject(subject)
                .description(description)
                .type(type)
                .status("OPEN")
                .date(now)
                .lastUpdate(now)
                .build()
        );
    }

    private OrderDTO mapToDTO(Order order) {
        List<OrderDTO.OrderItemDTO> itemDTOs = null;
        if (order.getOrderItems() != null) {
            itemDTOs = order
                .getOrderItems()
                .stream()
                .map(oi ->
                    OrderDTO.OrderItemDTO.builder()
                        .id(oi.getId())
                        .productId(oi.getProduct() != null ? oi.getProduct().getId() : null)
                        .variantId(oi.getVariant() == null ? null : oi.getVariant().getId())
                        .variantSku(oi.getVariantSkuSnapshot())
                        .variantDescription(oi.getVariantDescriptionSnapshot())
                        .productName(
                            oi.getProductNameSnapshot() != null
                                ? oi.getProductNameSnapshot()
                                : oi.getProduct() != null
                                  ? oi.getProduct().getName()
                                  : null
                        )
                        .imageUrl(oi.getImageUrlSnapshot())
                        .quantity(oi.getQuantity())
                        .priceAtPurchase(oi.getPriceAtPurchase())
                        .discountAmount(oi.getDiscountAmount())
                        .build()
                )
                .collect(Collectors.toList());
        }

        return OrderDTO.builder()
            .id(order.getId())
            .userId(order.getUser() != null ? order.getUser().getId() : null)
            .addressId(
                order.getDeliveryAddress() != null ? order.getDeliveryAddress().getId() : null
            )
            .paymentIntentId(order.getPaymentIntentId())
            .paymentExpiresAt(order.getPaymentExpiresAt())
            .orderNumber(order.getOrderNumber())
            .totalAmount(order.getTotalAmount())
            .status(order.getStatus())
            .paymentStatus(order.getPaymentStatus())
            .deliveryAddress(
                order.getDeliveryAddressSnapshot() != null
                    ? order.getDeliveryAddressSnapshot()
                    : order.getDeliveryAddress() != null
                      ? order.getDeliveryAddress().getStreetAddress()
                      : null
            )
            .specialInstructions(order.getSpecialInstructions())
            .createdAt(order.getCreatedAt())
            .orderItems(itemDTOs)
            .delivery(
                order.getDelivery() == null
                    ? null
                    : com.truehand.dto.DeliveryDTO.builder()
                          .id(order.getDelivery().getId())
                          .orderId(order.getId())
                          .status(order.getDelivery().getStatus())
                          .estimatedDeliveryTime(order.getDelivery().getEstimatedDeliveryTime())
                          .actualDeliveryTime(order.getDelivery().getActualDeliveryTime())
                          .build()
            )
            .build();
    }
}
