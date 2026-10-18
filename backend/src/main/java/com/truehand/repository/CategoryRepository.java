package com.truehand.repository;

import com.truehand.model.Category;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Integer> {
    Optional<Category> findByName(String name);
    java.util.List<Category> findByParentCategoryId(Integer parentId);
}
