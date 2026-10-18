package com.truehand.controller;

import com.truehand.dto.OrderDTO;
import com.truehand.model.User;
import com.truehand.service.OrderService;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;
    private final com.truehand.security.AccessPolicy accessPolicy;

    @PostMapping
    public ResponseEntity<OrderDTO> createOrderAuthenticated(
        @RequestBody OrderDTO dto,
        Authentication authentication
    ) {
        Integer userId = accessPolicy.currentUser().getId();
        return ResponseEntity.ok(orderService.createOrder(userId, dto));
    }

    @PostMapping("/user/{userId}")
    @org.springframework.security.access.prepost.PreAuthorize("@accessPolicy.isOwner(#userId)")
    public ResponseEntity<OrderDTO> createOrder(
        @PathVariable Integer userId,
        @RequestBody OrderDTO dto
    ) {
        return ResponseEntity.ok(orderService.createOrder(userId, dto));
    }

    @GetMapping
    public ResponseEntity<?> getCurrentUserOrders(
        @RequestParam(defaultValue = "false") boolean paged,
        org.springframework.data.domain.Pageable pageable
    ) {
        Integer userId = accessPolicy.currentUser().getId();
        return ResponseEntity.ok(
            PagedResponses.body(orderService.getUserOrders(userId, pageable), paged)
        );
    }

    @GetMapping("/{id}")
    @org.springframework.security.access.prepost.PreAuthorize("@accessPolicy.canReadOrder(#id)")
    public ResponseEntity<OrderDTO> getOrder(@PathVariable Integer id) {
        return ResponseEntity.ok(orderService.getOrder(id));
    }

    @GetMapping("/user/{userId}")
    @org.springframework.security.access.prepost.PreAuthorize("@accessPolicy.isOwner(#userId)")
    public ResponseEntity<?> getUserOrders(
        @PathVariable Integer userId,
        @RequestParam(defaultValue = "false") boolean paged,
        org.springframework.data.domain.Pageable pageable
    ) {
        return ResponseEntity.ok(
            PagedResponses.body(orderService.getUserOrders(userId, pageable), paged)
        );
    }

    @GetMapping("/all")
    @org.springframework.security.access.prepost.PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getAllOrders(
        @RequestParam(defaultValue = "false") boolean paged,
        org.springframework.data.domain.Pageable pageable
    ) {
        return ResponseEntity.ok(PagedResponses.body(orderService.getAllOrders(pageable), paged));
    }

    @PutMapping("/{id}/status")
    @org.springframework.security.access.prepost.PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<OrderDTO> updateOrderStatus(
        @PathVariable Integer id,
        @RequestBody Map<String, String> payload
    ) {
        String status = payload.get("status");
        if (status == null || status.isBlank()) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(orderService.updateOrderStatus(id, status));
    }

    @PostMapping("/{id}/cancel")
    @org.springframework.security.access.prepost.PreAuthorize("@accessPolicy.ownsOrder(#id)")
    public ResponseEntity<OrderDTO> cancelOrder(
        @PathVariable Integer id,
        @RequestBody Map<String, String> payload
    ) {
        String reason = payload.get("reason");
        return ResponseEntity.ok(orderService.cancelOrder(id, reason));
    }

    @PostMapping("/{id}/returns")
    @org.springframework.security.access.prepost.PreAuthorize("@accessPolicy.ownsOrder(#id)")
    public ResponseEntity<OrderDTO> requestReturn(
        @PathVariable Integer id,
        @RequestBody Map<String, String> payload
    ) {
        String reason = payload.get("reason");
        String method = payload.get("method");
        String comments = payload.get("comments");
        return ResponseEntity.ok(orderService.requestReturn(id, reason, method, comments));
    }

    @PostMapping("/{id}/issues")
    @org.springframework.security.access.prepost.PreAuthorize("@accessPolicy.ownsOrder(#id)")
    public ResponseEntity<Map<String, String>> reportIssue(
        @PathVariable Integer id,
        @RequestBody Map<String, String> payload
    ) {
        String subject = payload.get("subject");
        String description = payload.get("description");
        return ResponseEntity.ok(orderService.reportIssue(id, subject, description));
    }
}
