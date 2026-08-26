package com.truehand.controller;

import com.truehand.model.SupportRequest;
import com.truehand.model.User;
import com.truehand.repository.SupportRequestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
@RequestMapping("/api/support")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class SupportRequestController {
    private final SupportRequestRepository supportRequestRepository;

    @GetMapping
    public ResponseEntity<List<SupportRequest>> getSupportRequests(Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        return ResponseEntity.ok(supportRequestRepository.findByUserId(user.getId()));
    }

    @PostMapping
    public ResponseEntity<SupportRequest> createSupportRequest(@RequestBody SupportRequest request, Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        request.setUser(user);
        request.setRequestId("TH-REQ-" + (int)(Math.random() * 10000));
        request.setStatus("Open");
        
        String now = LocalDateTime.now().format(DateTimeFormatter.ofPattern("MMM dd, yyyy"));
        request.setDate(now);
        request.setLastUpdate(now);
        
        return ResponseEntity.ok(supportRequestRepository.save(request));
    }
}
