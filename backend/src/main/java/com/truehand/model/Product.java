package com.truehand.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "products")
@lombok.Getter
@lombok.Setter
@lombok.ToString(onlyExplicitlyIncluded = true)
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Product {

    @lombok.ToString.Include
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;

    @Column(nullable = false)
    private BigDecimal price;

    @Column(columnDefinition = "INT DEFAULT 0")
    private Integer stockQuantity;

    @Column(columnDefinition = "TEXT")
    private String imageUrl;

    @Column(columnDefinition = "BOOLEAN DEFAULT TRUE")
    private Boolean isAvailable;

    @Column(columnDefinition = "VARCHAR(255) DEFAULT 'APPROVED'")
    @Builder.Default
    private String approvalStatus = "APPROVED";

    private BigDecimal salePrice;
    private LocalDateTime saleStartsAt;
    private LocalDateTime saleEndsAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "seller_id")
    private User seller;

    @Column(updatable = false)
    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();

    @Builder.Default
    private LocalDateTime updatedAt = LocalDateTime.now();

    @Column(columnDefinition = "DOUBLE PRECISION DEFAULT 0.0")
    @Builder.Default
    private Double averageRating = 0.0;

    @Column(columnDefinition = "INT DEFAULT 0")
    @Builder.Default
    private Integer reviewCount = 0;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
    private List<OrderItem> orderItems;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Review> reviews;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ProductVariant> variants;
}
