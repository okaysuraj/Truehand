package com.truehand.controller;

import com.truehand.model.ProductReview;
import com.truehand.model.ArtisanPost;
import com.truehand.repository.ProductReviewRepository;
import com.truehand.repository.ArtisanPostRepository;
import com.truehand.repository.ProductRepository;
import com.truehand.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/social")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class SocialCommunityController {
    private final ProductReviewRepository reviewRepository;
    private final ArtisanPostRepository postRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    @GetMapping("/products/{productId}/reviews")
    public ResponseEntity<List<ProductReview>> getReviews(@PathVariable Integer productId) {
        return ResponseEntity.ok(reviewRepository.findByProductIdOrderByCreatedAtDesc(productId));
    }
    
    @PostMapping("/products/{productId}/reviews")
    public ResponseEntity<ProductReview> addReview(
            @PathVariable Integer productId,
            @RequestBody ProductReview review,
            @RequestParam Integer userId) {
        review.setProduct(productRepository.findById(productId).orElseThrow());
        review.setUser(userRepository.findById(userId).orElseThrow());
        return ResponseEntity.ok(reviewRepository.save(review));
    }

    @GetMapping("/feed")
    public ResponseEntity<List<ArtisanPost>> getFeed() {
        return ResponseEntity.ok(postRepository.findAllByOrderByCreatedAtDesc());
    }
    
    @PostMapping("/feed")
    public ResponseEntity<ArtisanPost> createPost(
            @RequestBody ArtisanPost post,
            @RequestParam Integer artisanId) {
        post.setArtisan(userRepository.findById(artisanId).orElseThrow());
        return ResponseEntity.ok(postRepository.save(post));
    }
}
