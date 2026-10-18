package com.truehand.controller;

import com.truehand.model.Category;
import com.truehand.repository.CategoryRepository;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryRepository categoryRepository;

    @GetMapping
    public ResponseEntity<List<Category>> getAllCategories() {
        return ResponseEntity.ok(categoryRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getCategoryById(@PathVariable Integer id) {
        return categoryRepository
            .findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/{id}/subcategories")
    public ResponseEntity<List<Category>> getSubcategories(@PathVariable Integer id) {
        if (!categoryRepository.existsById(id)) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(categoryRepository.findByParentCategoryId(id));
    }

    @PostMapping
    public ResponseEntity<?> createCategory(@RequestBody Map<String, Object> body) {
        String name = (String) body.get("name");
        if (name == null || name.isBlank()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Category name is required"));
        }

        String description = (String) body.get("description");
        String imageUrl = (String) body.get("imageUrl");
        Integer parentId =
            body.get("parentId") != null ? Integer.valueOf(body.get("parentId").toString()) : null;

        Category parent = null;
        if (parentId != null) {
            parent = categoryRepository.findById(parentId).orElse(null);
        }

        Category category = Category.builder()
            .name(name)
            .description(description)
            .imageUrl(imageUrl)
            .parentCategory(parent)
            .build();

        return ResponseEntity.ok(categoryRepository.save(category));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateCategory(
        @PathVariable Integer id,
        @RequestBody Map<String, Object> body
    ) {
        return categoryRepository
            .findById(id)
            .map(category -> {
                if (body.containsKey("name") && body.get("name") != null) {
                    category.setName((String) body.get("name"));
                }
                if (body.containsKey("description")) {
                    category.setDescription((String) body.get("description"));
                }
                if (body.containsKey("imageUrl")) {
                    category.setImageUrl((String) body.get("imageUrl"));
                }
                return ResponseEntity.ok(categoryRepository.save(category));
            })
            .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCategory(@PathVariable Integer id) {
        if (!categoryRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        categoryRepository.deleteById(id);
        return ResponseEntity.ok(Map.of("message", "Category deleted successfully"));
    }
}
