package com.truehand.repository;

import com.truehand.model.ProductReview;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ProductReviewRepository extends JpaRepository<ProductReview, Integer> {
    List<ProductReview> findByProductIdOrderByCreatedAtDesc(Integer productId);
}
