package com.truehand.service;

import com.truehand.model.*;
import com.truehand.repository.*;
import java.math.BigDecimal;
import java.util.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class CartService {

    private final CartRepository carts;
    private final CartItemRepository items;
    private final UserRepository users;
    private final ProductRepository products;
    private final ProductService catalog;
    private final ProductVariantRepository variants;
    private final CommercePolicyService policies;

    private Cart cart(Integer userId) {
        User user = users.findByIdForUpdate(userId).orElseThrow();
        return carts
            .findByUserId(userId)
            .orElseGet(() ->
                carts.save(
                    Cart.builder()
                        .user(user)
                        .items(new ArrayList<>())
                        .totalAmount(BigDecimal.ZERO)
                        .build()
                )
            );
    }

    public List<Map<String, Object>> get(Integer userId) {
        return view(cart(userId));
    }

    public List<Map<String, Object>> setQuantity(
        Integer userId,
        Integer productId,
        int quantity,
        boolean increment
    ) {
        return setQuantity(userId, productId, null, quantity, increment);
    }

    public List<Map<String, Object>> setQuantity(
        Integer userId,
        Integer productId,
        Integer variantId,
        int quantity,
        boolean increment
    ) {
        Cart cart = cart(userId);
        CartItem existing = cart
            .getItems()
            .stream()
            .filter(
                i ->
                    i.getProduct().getId().equals(productId) &&
                    Objects.equals(
                        i.getVariant() == null ? null : i.getVariant().getId(),
                        variantId
                    )
            )
            .findFirst()
            .orElse(null);
        if (increment && quantity < 1) throw new IllegalArgumentException(
            "Quantity must be positive"
        );
        int next =
            increment && existing != null
                ? Math.addExact(existing.getQuantity(), quantity)
                : quantity;
        if (next < 0 || next > 1000) throw new IllegalArgumentException("Invalid quantity");
        if (next == 0) {
            if (existing != null) cart.getItems().remove(existing);
        } else {
            Product product = products
                .findById(productId)
                .orElseThrow(() -> new IllegalArgumentException("Product not found"));
            if (
                product.getSeller() != null &&
                (!Boolean.TRUE.equals(product.getSeller().getIsActive()) ||
                    !policies.acceptingOrders(product.getSeller().getId()))
            ) throw new IllegalArgumentException("This seller is not accepting new orders");
            ProductVariant variant =
                variantId == null
                    ? null
                    : variants
                          .findById(variantId)
                          .orElseThrow(() -> new IllegalArgumentException("Variant not found"));
            if (
                variant != null &&
                (!productId.equals(variant.getProduct().getId()) ||
                    !Boolean.TRUE.equals(variant.getIsActive()))
            ) throw new IllegalArgumentException("Invalid product variant");
            if (
                variant == null && product.getVariants() != null && !product.getVariants().isEmpty()
            ) throw new IllegalArgumentException("Choose a product variant");
            Integer stock =
                variant == null ? product.getStockQuantity() : variant.getStockQuantity();
            if (
                !Boolean.TRUE.equals(product.getIsAvailable()) ||
                !"APPROVED".equals(product.getApprovalStatus()) ||
                stock == null ||
                next > stock
            ) throw new IllegalArgumentException("Product unavailable or insufficient stock");
            if (existing == null) {
                existing = CartItem.builder().cart(cart).product(product).variant(variant).build();
                cart.getItems().add(existing);
            }
            existing.setQuantity(next);
            existing.setPrice(
                catalog
                    .getProduct(productId)
                    .getPrice()
                    .add(variant == null ? BigDecimal.ZERO : variant.getAdditionalPrice())
            );
        }
        carts.saveAndFlush(cart);
        return view(cart);
    }

    public void clear(Integer userId) {
        Cart cart = cart(userId);
        cart.getItems().clear();
        cart.setTotalAmount(BigDecimal.ZERO);
        carts.save(cart);
    }

    public void removePurchased(Integer userId, java.util.List<OrderItem> purchased) {
        Cart cart = cart(userId);
        for (OrderItem line : purchased == null ? java.util.List.<OrderItem>of() : purchased) {
            var existing = cart
                .getItems()
                .stream()
                .filter(
                    item ->
                        item.getProduct().getId().equals(line.getProduct().getId()) &&
                        Objects.equals(
                            item.getVariant() == null ? null : item.getVariant().getId(),
                            line.getVariant() == null ? null : line.getVariant().getId()
                        )
                )
                .findFirst();
            if (existing.isPresent()) {
                var item = existing.get();
                int remaining = item.getQuantity() - line.getQuantity();
                if (remaining <= 0) cart.getItems().remove(item);
                else item.setQuantity(remaining);
            }
        }
        carts.saveAndFlush(cart);
        view(cart);
    }

    private List<Map<String, Object>> view(Cart cart) {
        BigDecimal total = BigDecimal.ZERO;
        List<Map<String, Object>> result = new ArrayList<>();
        for (CartItem item : cart.getItems()) {
            var product = catalog.getProduct(item.getProduct().getId());
            var row = new LinkedHashMap<String, Object>();
            var variant = item.getVariant();
            var price = product
                .getPrice()
                .add(variant == null ? BigDecimal.ZERO : variant.getAdditionalPrice());
            row.put(
                "id",
                variant == null ? product.getId() : product.getId() + ":" + variant.getId()
            );
            row.put("productId", product.getId());
            row.put("variantId", variant == null ? null : variant.getId());
            row.put("variantSku", variant == null ? null : variant.getSku());
            row.put("name", product.getName());
            row.put("price", price);
            row.put(
                "imageUrl",
                variant != null && variant.getImageUrl() != null
                    ? variant.getImageUrl()
                    : product.getImageUrl()
            );
            row.put("category", product.getCategory());
            row.put(
                "stockQuantity",
                variant == null ? product.getStockQuantity() : variant.getStockQuantity()
            );
            row.put(
                "isAvailable",
                Boolean.TRUE.equals(product.getIsAvailable()) &&
                    (variant == null || Boolean.TRUE.equals(variant.getIsActive()))
            );
            row.put("quantity", item.getQuantity());
            total = total.add(price.multiply(BigDecimal.valueOf(item.getQuantity())));
            result.add(row);
        }
        cart.setTotalAmount(total);
        return result;
    }
}
