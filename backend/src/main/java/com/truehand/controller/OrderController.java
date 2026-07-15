package com.truehand.controller;

import com.truehand.dto.OrderDTO;
import com.truehand.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class OrderController {
    private final OrderService orderService;

    @PostMapping
    public ResponseEntity<OrderDTO> createOrder(@RequestBody OrderDTO dto) {
        Integer userId = 1; // Get from JWT token in production
        return ResponseEntity.ok(orderService.createOrder(userId, dto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderDTO> getOrder(@PathVariable Integer id) {
        return ResponseEntity.ok(orderService.getOrder(id));
    }

    @GetMapping
    public ResponseEntity<?> getUserOrders() {
        Integer userId = 1; // Get from JWT token in production
        return ResponseEntity.ok(orderService.getUserOrders(userId));
    }

    @PostMapping("/{id}/cancel")
    public ResponseEntity<OrderDTO> cancelOrder(@PathVariable Integer id, @RequestBody java.util.Map<String, String> payload) {
        String reason = payload.get("reason");
        return ResponseEntity.ok(orderService.cancelOrder(id, reason));
    }

    @PostMapping("/{id}/returns")
    public ResponseEntity<OrderDTO> requestReturn(@PathVariable Integer id, @RequestBody java.util.Map<String, String> payload) {
        String reason = payload.get("reason");
        String method = payload.get("method");
        String comments = payload.get("comments");
        return ResponseEntity.ok(orderService.requestReturn(id, reason, method, comments));
    }

    @PostMapping("/{id}/issues")
    public ResponseEntity<java.util.Map<String, String>> reportIssue(@PathVariable Integer id, @RequestBody java.util.Map<String, String> payload) {
        String subject = payload.get("subject");
        String description = payload.get("description");
        return ResponseEntity.ok(orderService.reportIssue(id, subject, description));
    }
}
