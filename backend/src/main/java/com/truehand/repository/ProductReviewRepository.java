package com.truehand.repository;

import com.truehand.model.ProductReview;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductReviewRepository extends JpaRepository<ProductReview, Integer> {
    List<ProductReview> findByProductIdOrderByCreatedAtDesc(Integer productId);
}
