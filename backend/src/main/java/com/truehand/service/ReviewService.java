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
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@org.springframework.transaction.annotation.Transactional
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final OrderRepository orderRepository;

    public ReviewDTO addReview(ReviewDTO dto, String userEmail) {
        if (
            dto.getRating() == null || dto.getRating() < 1 || dto.getRating() > 5
        ) throw new IllegalArgumentException("Rating must be between 1 and 5");
        User user = userRepository
            .findByEmail(userEmail)
            .orElseThrow(() ->
                new org.springframework.web.server.ResponseStatusException(
                    org.springframework.http.HttpStatus.NOT_FOUND,
                    "User not found"
                )
            );

        Product product = productRepository
            .findByIdForUpdate(dto.getProductId())
            .orElseThrow(() ->
                new org.springframework.web.server.ResponseStatusException(
                    org.springframework.http.HttpStatus.NOT_FOUND,
                    "Product not found"
                )
            );

        if (reviewRepository.existsByUserIdAndProductId(user.getId(), product.getId())) {
            throw new IllegalArgumentException("You have already reviewed this product");
        }

        List<Order> userOrders = orderRepository.findReviewableOrders(
            user.getId(),
            product.getId(),
            org.springframework.data.domain.PageRequest.of(0, 1)
        );
        if (userOrders.isEmpty()) {
            throw new IllegalArgumentException(
                "You must purchase this product before reviewing it"
            );
        }

        // Use the most recent delivered, paid purchase without loading the buyer's history.
        Order order = userOrders.get(0);

        Review review = Review.builder()
            .product(product)
            .user(user)
            .order(order)
            .rating(dto.getRating())
            .comment(dto.getComment())
            .build();

        // PostgreSQL updates the aggregate under the product lock. Do not load every review.
        review = reviewRepository.saveAndFlush(review);

        return mapToDTO(review);
    }

    public List<ReviewDTO> getReviewsByProduct(Integer productId) {
        return reviewRepository
            .findByProductId(productId)
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
