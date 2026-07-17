import os

models_review = """package com.truehand.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "product_reviews")
@Data
public class ProductReview {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;
    
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private Integer rating;
    private String reviewText;
    private String imageUrl;
    
    private LocalDateTime createdAt;
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
"""

models_post = """package com.truehand.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "artisan_posts")
@Data
public class ArtisanPost {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "artisan_id", nullable = false)
    private User artisan;

    @Column(columnDefinition = "TEXT")
    private String content;
    private String mediaUrl;
    
    private Integer likesCount = 0;
    
    private LocalDateTime createdAt;
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
"""

repo_review = """package com.truehand.repository;

import com.truehand.model.ProductReview;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ProductReviewRepository extends JpaRepository<ProductReview, Integer> {
    List<ProductReview> findByProductIdOrderByCreatedAtDesc(Integer productId);
}
"""

repo_post = """package com.truehand.repository;

import com.truehand.model.ArtisanPost;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ArtisanPostRepository extends JpaRepository<ArtisanPost, Integer> {
    List<ArtisanPost> findAllByOrderByCreatedAtDesc();
}
"""

controller = """package com.truehand.controller;

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
"""

def write(path, content):
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

base = 'backend/src/main/java/com/truehand/'
write(base + 'model/ProductReview.java', models_review)
write(base + 'model/ArtisanPost.java', models_post)
write(base + 'repository/ProductReviewRepository.java', repo_review)
write(base + 'repository/ArtisanPostRepository.java', repo_post)
write(base + 'controller/SocialCommunityController.java', controller)

print('Social Community backend created.')
