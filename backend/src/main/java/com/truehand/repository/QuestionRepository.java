package com.truehand.repository;

import com.truehand.model.Question;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Integer> {
    List<Question> findByProductIdOrderByCreatedAtDesc(Integer productId);
    List<Question> findByProductSellerIdOrderByCreatedAtDesc(Integer sellerId);
}
