package com.truehand.controller;

import com.truehand.model.SupportRequest;
import com.truehand.model.User;
import com.truehand.repository.SupportRequestRepository;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/support")
@RequiredArgsConstructor
public class SupportRequestController {

    private final SupportRequestRepository supportRequestRepository;
    private final com.truehand.service.MarketplaceFeatureService features;
    private final com.truehand.security.AccessPolicy accessPolicy;

    @GetMapping
    public ResponseEntity<List<SupportRequest>> getSupportRequests(Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        return ResponseEntity.ok(supportRequestRepository.findByUserId(user.getId()));
    }

    @PostMapping
    public ResponseEntity<SupportRequest> createSupportRequest(
        @RequestBody SupportRequest request,
        Authentication authentication
    ) {
        User user = (User) authentication.getPrincipal();
        if (
            request.getSubject() == null ||
            request.getSubject().isBlank() ||
            request.getDescription() == null ||
            request.getDescription().isBlank()
        ) throw new IllegalArgumentException("Subject and description are required");
        if (
            request.getSubject().length() > 200 || request.getDescription().length() > 10000
        ) throw new IllegalArgumentException("Subject or description exceeds the permitted length");
        if (
            request.getType() != null &&
            !java.util.Set.of("GENERAL", "ORDER", "DISPUTE", "ACCOUNT").contains(request.getType())
        ) throw new IllegalArgumentException("Invalid support request type");
        request.setSubject(request.getSubject().trim());
        request.setDescription(request.getDescription().trim());
        request.setId(null);
        request.setUser(user);
        request.setRequestId("TH-REQ-" + java.util.UUID.randomUUID());
        request.setStatus("OPEN");
        if (request.getType() == null) request.setType("GENERAL");
        if (
            request.getOrderId() != null && !accessPolicy.ownsOrder(request.getOrderId())
        ) throw new org.springframework.web.server.ResponseStatusException(
            org.springframework.http.HttpStatus.FORBIDDEN,
            "Access denied"
        );

        String now = java.time.LocalDate.now(java.time.ZoneOffset.UTC).toString();
        request.setDate(now);
        request.setLastUpdate(now);

        return ResponseEntity.ok(supportRequestRepository.save(request));
    }

    @GetMapping("/{id}")
    public ResponseEntity<SupportRequest> getRequest(@PathVariable Integer id) {
        var request = supportRequestRepository
            .findById(id)
            .orElseThrow(() ->
                new org.springframework.web.server.ResponseStatusException(
                    org.springframework.http.HttpStatus.NOT_FOUND,
                    "Support request not found"
                )
            );
        accessPolicy.requireOwner(request.getUser().getId());
        return ResponseEntity.ok(request);
    }

    @GetMapping("/{id}/messages")
    public Object messages(@PathVariable int id) {
        return features.messages(id);
    }

    @PostMapping("/{id}/messages")
    public Object message(@PathVariable int id, @RequestBody Map<String, Object> body) {
        return features.message(id, body);
    }
}
