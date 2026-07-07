package com.truehand.controller;

import com.truehand.dto.DeliveryPersonnelDTO;
import com.truehand.service.DeliveryPersonnelService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/delivery-personnel")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class DeliveryPersonnelController {
    private final DeliveryPersonnelService service;

    @PostMapping("/{userId}/kyc")
    public ResponseEntity<DeliveryPersonnelDTO> submitKYC(@PathVariable Integer userId, @RequestBody DeliveryPersonnelDTO dto) {
        return ResponseEntity.ok(service.submitKYC(userId, dto));
    }

    @GetMapping("/{userId}/kyc")
    public ResponseEntity<DeliveryPersonnelDTO> getKYC(@PathVariable Integer userId) {
        return ResponseEntity.ok(service.getProfile(userId));
    }

    @PutMapping("/{userId}/availability")
    public ResponseEntity<DeliveryPersonnelDTO> updateAvailability(
            @PathVariable Integer userId, 
            @RequestBody java.util.Map<String, Boolean> body) {
        return ResponseEntity.ok(service.updateAvailability(userId, body.get("isAvailable")));
    }
}
