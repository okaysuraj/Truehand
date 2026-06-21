package com.truehand.service;

import com.truehand.dto.ReviewDTO;
import com.truehand.model.Order;
import com.truehand.model.Product;
import com.truehand.model.Review;
import com.truehand.model.User;
import com.truehand.repository.OrderRepository;
import com.truehand.repository.ProductRepository;
import com.truehand.repository.ReviewRepository;
import com.truehand.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReviewService {
    private final ReviewRepository reviewRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final OrderRepository orderRepository;

    public ReviewDTO addReview(ReviewDTO dto, String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Product product = productRepository.findById(dto.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found"));

        if (reviewRepository.existsByUserIdAndProductId(user.getId(), product.getId())) {
            throw new RuntimeException("You have already reviewed this product");
        }

        List<Order> userOrders = orderRepository.findOrdersByUserAndProduct(user.getId(), product.getId());
        if (userOrders.isEmpty()) {
            throw new RuntimeException("You must purchase this product before reviewing it");
        }

        // Just attach to the first order they made containing this product
        Order order = userOrders.get(0);

        Review review = Review.builder()
                .product(product)
                .user(user)
                .order(order)
                .rating(dto.getRating())
                .comment(dto.getComment())
                .build();

        review = reviewRepository.save(review);

        // Recalculate average rating
        List<Review> allReviews = reviewRepository.findByProductId(product.getId());
        double sum = allReviews.stream().mapToDouble(Review::getRating).sum();
        double avg = sum / allReviews.size();
        
        product.setAverageRating(avg);
        product.setReviewCount(allReviews.size());
        productRepository.save(product);

        return mapToDTO(review);
    }

    public List<ReviewDTO> getReviewsByProduct(Integer productId) {
        return reviewRepository.findByProductId(productId)
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    private ReviewDTO mapToDTO(Review review) {
        return ReviewDTO.builder()
                .id(review.getId())
                .productId(review.getProduct() != null ? review.getProduct().getId() : null)
                .userId(review.getUser().getId())
                .userName(review.getUser().getFirstName() + " " + review.getUser().getLastName())
                .rating(review.getRating())
                .comment(review.getComment())
                .createdAt(review.getCreatedAt())
                .build();
    }
}
