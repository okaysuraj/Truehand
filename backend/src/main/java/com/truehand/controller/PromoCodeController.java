package com.truehand.controller;

import com.truehand.model.PromoCode;
import com.truehand.repository.PromoCodeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/promo")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class PromoCodeController {

    private final PromoCodeRepository promoCodeRepository;

    @GetMapping("/validate")
    public ResponseEntity<?> validatePromoCode(@RequestParam String code) {
        return promoCodeRepository.findByCodeAndIsActiveTrue(code.toUpperCase())
                .filter(promo -> promo.getValidUntil().isAfter(LocalDateTime.now()))
                .map(promo -> ResponseEntity.ok(promo))
                .orElseGet(() -> ResponseEntity.badRequest().body((PromoCode) null)); // Using cast to appease generics or return simple error
    }
}
