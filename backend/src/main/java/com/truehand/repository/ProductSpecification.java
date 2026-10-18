package com.truehand.repository;

import com.truehand.model.Product;
import jakarta.persistence.criteria.Predicate;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import org.springframework.data.jpa.domain.Specification;

public class ProductSpecification {

    public static Specification<Product> getProductsByFilters(
        String search,
        String category,
        BigDecimal minPrice,
        BigDecimal maxPrice,
        Double minRating
    ) {
        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            // Always only show available products
            predicates.add(criteriaBuilder.isTrue(root.get("isAvailable")));

            if (search != null && !search.isBlank()) {
                for (String word : search.trim().toLowerCase(java.util.Locale.ROOT).split("\\s+")) {
                    String searchPattern =
                        "%" +
                        word.replace("\\", "\\\\").replace("%", "\\%").replace("_", "\\_") +
                        "%";
                    Predicate namePredicate = criteriaBuilder.like(
                        criteriaBuilder.lower(root.get("name")),
                        searchPattern,
                        '\\'
                    );
                    Predicate descPredicate = criteriaBuilder.like(
                        criteriaBuilder.lower(root.get("description")),
                        searchPattern,
                        '\\'
                    );
                    predicates.add(criteriaBuilder.or(namePredicate, descPredicate));
                }
            }

            if (category != null && !category.isEmpty()) {
                predicates.add(criteriaBuilder.equal(root.get("category").get("name"), category));
            }

            var price = effectivePrice(root, criteriaBuilder);
            if (minPrice != null) {
                predicates.add(criteriaBuilder.greaterThanOrEqualTo(price, minPrice));
            }

            if (maxPrice != null) {
                predicates.add(criteriaBuilder.lessThanOrEqualTo(price, maxPrice));
            }

            if (minRating != null) {
                predicates.add(
                    criteriaBuilder.greaterThanOrEqualTo(root.get("averageRating"), minRating)
                );
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }

    public static jakarta.persistence.criteria.Expression<BigDecimal> effectivePrice(
        jakarta.persistence.criteria.Root<Product> root,
        jakarta.persistence.criteria.CriteriaBuilder cb
    ) {
        var now = java.time.LocalDateTime.now(java.time.ZoneOffset.UTC);
        return cb
            .<BigDecimal>selectCase()
            .when(
                cb.and(
                    cb.isNotNull(root.get("salePrice")),
                    cb.lessThanOrEqualTo(root.get("saleStartsAt"), now),
                    cb.greaterThan(root.get("saleEndsAt"), now)
                ),
                root.get("salePrice")
            )
            .otherwise(root.get("price"));
    }
}
