package com.truehand.controller;

import com.truehand.dto.ReviewDTO;
import com.truehand.service.ReviewService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/reviews")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;

    @GetMapping("/product/{productId}")
    public ResponseEntity<List<ReviewDTO>> getReviewsByProduct(@PathVariable Integer productId) {
        return ResponseEntity.ok(reviewService.getReviewsByProduct(productId));
    }

    @PostMapping
    public ResponseEntity<ReviewDTO> addReview(
        @RequestBody ReviewDTO reviewDTO,
        Authentication authentication
    ) {
        if (authentication == null) {
            return ResponseEntity.status(401).build();
        }
        String email;
        if (authentication.getPrincipal() instanceof com.truehand.model.User) {
            email = ((com.truehand.model.User) authentication.getPrincipal()).getEmail();
        } else {
            email = authentication.getName();
        }
        return ResponseEntity.ok(reviewService.addReview(reviewDTO, email));
    }
}
