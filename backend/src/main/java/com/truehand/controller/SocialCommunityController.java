package com.truehand.controller;

import com.truehand.model.ArtisanPost;
import com.truehand.model.ProductReview;
import com.truehand.repository.ArtisanPostRepository;
import com.truehand.repository.ProductRepository;
import com.truehand.repository.ProductReviewRepository;
import com.truehand.repository.UserRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/social")
@RequiredArgsConstructor
public class SocialCommunityController {

    private final ProductReviewRepository reviewRepository;
    private final ArtisanPostRepository postRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final com.truehand.security.AccessPolicy access;
    private final com.truehand.service.ReviewService reviews;

    @GetMapping("/products/{productId}/reviews")
    public ResponseEntity<List<com.truehand.dto.ReviewDTO>> getReviews(
        @PathVariable Integer productId
    ) {
        return ResponseEntity.ok(reviews.getReviewsByProduct(productId));
    }

    @PostMapping("/products/{productId}/reviews")
    public ResponseEntity<com.truehand.dto.ReviewDTO> addReview(
        @PathVariable Integer productId,
        @RequestBody com.truehand.dto.ReviewDTO review,
        @RequestParam(required = false) Integer userId
    ) {
        var user = access.currentUser();
        if (
            userId != null && !userId.equals(user.getId())
        ) throw new org.springframework.web.server.ResponseStatusException(
            org.springframework.http.HttpStatus.FORBIDDEN,
            "Access denied"
        );
        review.setProductId(productId);
        return ResponseEntity.ok(reviews.addReview(review, user.getEmail()));
    }

    @GetMapping("/feed")
    public ResponseEntity<List<PostView>> getFeed() {
        return ResponseEntity.ok(
            postRepository.findAllByOrderByCreatedAtDesc().stream().map(this::view).toList()
        );
    }

    @PostMapping("/feed")
    @org.springframework.security.access.prepost.PreAuthorize("hasAnyRole('SELLER', 'ADMIN')")
    public ResponseEntity<PostView> createPost(
        @RequestBody ArtisanPost post,
        @RequestParam(required = false) Integer artisanId
    ) {
        var user = access.currentUser();
        if (
            artisanId != null && !artisanId.equals(user.getId())
        ) throw new org.springframework.web.server.ResponseStatusException(
            org.springframework.http.HttpStatus.FORBIDDEN,
            "Access denied"
        );
        if (
            post.getContent() == null ||
            post.getContent().isBlank() ||
            post.getContent().length() > 10000
        ) throw new IllegalArgumentException(
            "Post content is required and must be at most 10000 characters"
        );
        post.setId(null);
        post.setArtisan(user);
        post.setLikesCount(0);
        post.setCreatedAt(null);
        return ResponseEntity.ok(view(postRepository.save(post)));
    }

    public record Author(Integer id, String firstName, String lastName) {}

    public record PostView(
        Integer id,
        Author artisan,
        String content,
        String mediaUrl,
        Integer likesCount,
        java.time.LocalDateTime createdAt
    ) {}

    private PostView view(ArtisanPost post) {
        var author = post.getArtisan();
        return new PostView(
            post.getId(),
            new Author(author.getId(), author.getFirstName(), author.getLastName()),
            post.getContent(),
            post.getMediaUrl(),
            post.getLikesCount(),
            post.getCreatedAt()
        );
    }
}
