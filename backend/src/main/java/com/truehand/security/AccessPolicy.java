package com.truehand.security;

import com.truehand.model.User;
import com.truehand.repository.DeliveryRepository;
import com.truehand.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

@Component("accessPolicy")
@RequiredArgsConstructor
public class AccessPolicy {

    private final OrderRepository orders;
    private final DeliveryRepository deliveries;
    private final com.truehand.repository.ProductRepository products;

    public User currentUser() {
        var auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !(auth.getPrincipal() instanceof User user)) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Authentication required");
        }
        return user;
    }

    public boolean isOwner(Integer userId) {
        User user = currentUser();
        return user.getId().equals(userId) || "ADMIN".equals(user.getRole());
    }

    public void requireOwner(Integer userId) {
        if (!isOwner(userId)) throw new ResponseStatusException(
            HttpStatus.FORBIDDEN,
            "Access denied"
        );
    }

    public boolean canReadOrder(Integer orderId) {
        User user = currentUser();
        var order = orders
            .findById(orderId)
            .orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND, "Order not found")
            );
        if (isOwner(order.getUser().getId())) return true;
        return deliveries
            .findByOrderId(orderId)
            .map(d -> d.getDeliveryBoy() != null && user.getId().equals(d.getDeliveryBoy().getId()))
            .orElse(false);
    }

    public boolean ownsOrder(Integer orderId) {
        return orders
            .findById(orderId)
            .map(o -> isOwner(o.getUser().getId()))
            .orElse(false);
    }

    public boolean canUpdateDelivery(Integer orderId) {
        User user = currentUser();
        if ("ADMIN".equals(user.getRole())) return true;
        return (
            "DELIVERY".equals(user.getRole()) &&
            deliveries
                .findByOrderId(orderId)
                .map(
                    d ->
                        d.getDeliveryBoy() != null &&
                        user.getId().equals(d.getDeliveryBoy().getId())
                )
                .orElse(false)
        );
    }

    public boolean canEditProduct(Integer productId) {
        User user = currentUser();
        if ("ADMIN".equals(user.getRole())) return true;
        return (
            "SELLER".equals(user.getRole()) &&
            products
                .findById(productId)
                .map(p -> p.getSeller() != null && user.getId().equals(p.getSeller().getId()))
                .orElse(false)
        );
    }
}
