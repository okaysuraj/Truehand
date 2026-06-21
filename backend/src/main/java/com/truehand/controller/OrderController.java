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
}
