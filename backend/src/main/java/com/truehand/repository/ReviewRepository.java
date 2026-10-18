package com.truehand.repository;

import com.truehand.model.Review;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Integer> {
    List<Review> findByProductId(Integer productId);
    boolean existsByUserIdAndProductId(Integer userId, Integer productId);
}
