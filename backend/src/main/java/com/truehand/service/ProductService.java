package com.truehand.service;

import com.truehand.dto.ProductDTO;
import com.truehand.model.Product;
import com.truehand.model.User;
import com.truehand.repository.ProductRepository;
import com.truehand.repository.UserRepository;
import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/** Catalog queries and seller product changes, including public visibility and current pricing. */
@Service
@Transactional
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final com.truehand.repository.CategoryRepository categoryRepository;
    private final com.truehand.repository.ProductVariantRepository productVariantRepository;
    private final VariantService variantService;
    private final CommercePolicyService policies;
    private final NotificationDispatchService dispatches;

    public ProductDTO createProduct(ProductDTO productDTO, Integer sellerId) {
        validateProduct(productDTO);
        if (
            productDTO.getName() == null ||
            productDTO.getName().isBlank() ||
            productDTO.getPrice() == null ||
            productDTO.getPrice().signum() <= 0 ||
            productDTO.getStockQuantity() == null ||
            productDTO.getStockQuantity() < 0
        ) throw new IllegalArgumentException(
            "Name, positive price and nonnegative stock are required"
        );
        User seller = null;
        if (sellerId != null) {
            seller = userRepository.findById(sellerId).orElse(null);
        }

        com.truehand.model.Category category = null;
        if (productDTO.getCategory() != null) {
            category = categoryRepository
                .findByName(productDTO.getCategory())
                .orElseThrow(() -> new IllegalArgumentException("Select an existing category"));
        }

        Product product = Product.builder()
            .name(productDTO.getName())
            .description(productDTO.getDescription())
            .category(category)
            .price(productDTO.getPrice())
            .stockQuantity(productDTO.getStockQuantity())
            .imageUrl(productDTO.getImageUrl())
            .isAvailable(productDTO.getIsAvailable() != null ? productDTO.getIsAvailable() : true)
            .approvalStatus("PENDING")
            .seller(seller)
            .build();

        Product savedProduct = productRepository.save(product);

        if (productDTO.getVariants() != null && !productDTO.getVariants().isEmpty()) {
            var variants = new java.util.ArrayList<com.truehand.model.ProductVariant>();
            for (var v : productDTO.getVariants()) {
                var body = new java.util.HashMap<String, Object>();
                body.put("sku", v.getSku());
                body.put("size", v.getSize());
                body.put("color", v.getColor());
                body.put(
                    "additionalPrice",
                    v.getAdditionalPrice() == null ? BigDecimal.ZERO : v.getAdditionalPrice()
                );
                body.put("stockQuantity", v.getStockQuantity() == null ? 0 : v.getStockQuantity());
                body.put("imageUrl", v.getImageUrl());
                variants.add(variantService.save(savedProduct.getId(), null, body));
            }
            savedProduct.setVariants(variants);
        }

        return mapToDTO(savedProduct);
    }

    public ProductDTO createProduct(ProductDTO productDTO) {
        return createProduct(productDTO, productDTO.getSellerId());
    }

    public ProductDTO getProduct(Integer id) {
        return productRepository
            .findById(id)
            .map(this::mapToDTO)
            .orElseThrow(() ->
                new org.springframework.web.server.ResponseStatusException(
                    org.springframework.http.HttpStatus.NOT_FOUND,
                    "Product not found"
                )
            );
    }

    public Page<ProductDTO> getAllProducts(Pageable pageable) {
        return catalogPage(publicProducts(), pageable)
            .map(this::mapToDTO)
            .map(dto -> dto); // Only APPROVED products have isAvailable=true via updateProductStatus
    }

    public List<ProductDTO> getTrendingProducts() {
        org.springframework.data.domain.Pageable topTen =
            org.springframework.data.domain.PageRequest.of(
                0,
                10,
                org.springframework.data.domain.Sort.by(
                    org.springframework.data.domain.Sort.Direction.DESC,
                    "reviewCount",
                    "averageRating"
                )
            );
        return productRepository
            .findAll(publicProducts(), topTen)
            .getContent()
            .stream()
            .map(this::mapToDTO)
            .collect(Collectors.toList());
    }

    public List<ProductDTO> getFlashSaleProducts() {
        return getFlashSaleProducts(
            org.springframework.data.domain.PageRequest.of(0, 100)
        ).getContent();
    }

    public Page<ProductDTO> getFlashSaleProducts(Pageable pageable) {
        var now = java.time.LocalDateTime.now();
        org.springframework.data.jpa.domain.Specification<Product> sale = (root, query, cb) ->
            cb.and(
                cb.isNotNull(root.get("salePrice")),
                cb.lessThanOrEqualTo(root.get("saleStartsAt"), now),
                cb.greaterThan(root.get("saleEndsAt"), now)
            );
        return catalogPage(publicProducts().and(sale), pageable).map(this::mapToDTO);
    }

    public List<ProductDTO> searchByName(String name) {
        return getFilteredProducts(
            name,
            null,
            null,
            null,
            null,
            org.springframework.data.domain.PageRequest.of(0, 100)
        ).getContent();
    }

    public Page<ProductDTO> getFilteredProducts(
        String search,
        String category,
        java.math.BigDecimal minPrice,
        java.math.BigDecimal maxPrice,
        Double minRating,
        Pageable pageable
    ) {
        if (
            (search != null && search.length() > 200) ||
            (category != null && category.length() > 255)
        ) throw new IllegalArgumentException("Search or category is too long");
        if (
            (minPrice != null && minPrice.signum() < 0) ||
            (maxPrice != null && maxPrice.signum() < 0) ||
            (minPrice != null && maxPrice != null && minPrice.compareTo(maxPrice) > 0)
        ) throw new IllegalArgumentException("Invalid price range");
        if (
            minRating != null && (!Double.isFinite(minRating) || minRating < 0 || minRating > 5)
        ) throw new IllegalArgumentException("Rating must be between 0 and 5");
        org.springframework.data.jpa.domain.Specification<Product> spec =
            com.truehand.repository.ProductSpecification.getProductsByFilters(
                search,
                category,
                minPrice,
                maxPrice,
                minRating
            );
        return catalogPage(spec.and(publicProducts()), pageable).map(this::mapToDTO);
    }

    public List<ProductDTO> getByCategory(String category) {
        return getFilteredProducts(
            null,
            category,
            null,
            null,
            null,
            org.springframework.data.domain.PageRequest.of(0, 100)
        ).getContent();
    }

    public List<ProductDTO> getProductsBySeller(Integer sellerId) {
        return getProductsBySeller(
            sellerId,
            true,
            null,
            org.springframework.data.domain.PageRequest.of(0, 100)
        ).getContent();
    }

    public Page<ProductDTO> getProductsBySeller(
        Integer sellerId,
        boolean owner,
        String search,
        Pageable pageable
    ) {
        if (search != null && search.length() > 200) throw new IllegalArgumentException(
            "Search is too long"
        );
        org.springframework.data.jpa.domain.Specification<Product> scope = (root, query, cb) ->
            cb.equal(root.get("seller").get("id"), sellerId);
        if (!owner) scope = scope.and(publicProducts());
        if (search != null && !search.isBlank()) {
            String escaped = search
                .toLowerCase(java.util.Locale.ROOT)
                .replace("\\", "\\\\")
                .replace("%", "\\%")
                .replace("_", "\\_");
            scope = scope.and((root, query, cb) ->
                cb.like(cb.lower(root.get("name")), "%" + escaped + "%", '\\')
            );
        }
        return catalogPage(scope, pageable).map(this::mapToDTO);
    }

    public ProductDTO updateProduct(Integer id, ProductDTO productDTO) {
        Product product = productRepository
            .findByIdForUpdate(id)
            .orElseThrow(() ->
                new org.springframework.web.server.ResponseStatusException(
                    org.springframework.http.HttpStatus.NOT_FOUND,
                    "Product not found"
                )
            );
        boolean changed =
            (productDTO.getName() != null &&
                !java.util.Objects.equals(product.getName(), productDTO.getName())) ||
            (productDTO.getDescription() != null &&
                !java.util.Objects.equals(product.getDescription(), productDTO.getDescription())) ||
            (productDTO.getImageUrl() != null &&
                !java.util.Objects.equals(product.getImageUrl(), productDTO.getImageUrl())) ||
            (productDTO.getCategory() != null &&
                !java.util.Objects.equals(
                    product.getCategory() == null ? null : product.getCategory().getName(),
                    productDTO.getCategory()
                ));
        if (productDTO.getName() != null) product.setName(productDTO.getName());
        if (productDTO.getDescription() != null) product.setDescription(
            productDTO.getDescription()
        );
        if (productDTO.getCategory() != null) {
            com.truehand.model.Category category = categoryRepository
                .findByName(productDTO.getCategory())
                .orElseThrow(() -> new IllegalArgumentException("Select an existing category"));
            product.setCategory(category);
        }
        if (productDTO.getPrice() != null) product.setPrice(productDTO.getPrice());
        if (
            product.getPrice().signum() <= 0 ||
            (productDTO.getStockQuantity() != null && productDTO.getStockQuantity() < 0)
        ) throw new IllegalArgumentException("Invalid price or stock");
        if (productDTO.getStockQuantity() != null) {
            if (
                product.getVariants() != null && !product.getVariants().isEmpty()
            ) throw new IllegalArgumentException(
                "Update SKU stock through the product variants page"
            );
            product.setStockQuantity(productDTO.getStockQuantity());
        }
        if (productDTO.getImageUrl() != null) product.setImageUrl(productDTO.getImageUrl());
        if (productDTO.getIsAvailable() != null) product.setIsAvailable(
            productDTO.getIsAvailable()
        );
        validateProduct(
            ProductDTO.builder()
                .name(product.getName())
                .description(product.getDescription())
                .price(product.getPrice())
                .stockQuantity(product.getStockQuantity())
                .imageUrl(product.getImageUrl())
                .build()
        );
        if (changed) product.setApprovalStatus("PENDING");

        Product updatedProduct = productRepository.save(product);
        return mapToDTO(updatedProduct);
    }

    public void deleteProduct(Integer id) {
        Product product = productRepository.findById(id).orElseThrow();
        product.setIsAvailable(false);
        product.setApprovalStatus("WITHDRAWN");
        productRepository.save(product);
    }

    public List<ProductDTO> getPendingProducts() {
        return getPendingProducts(
            org.springframework.data.domain.PageRequest.of(0, 100)
        ).getContent();
    }

    public Page<ProductDTO> getPendingProducts(Pageable pageable) {
        return catalogPage(
            (root, query, cb) -> cb.equal(root.get("approvalStatus"), "PENDING"),
            pageable
        ).map(this::mapToDTO);
    }

    public ProductDTO updateProductStatus(Integer id, String status) {
        if (
            !java.util.Set.of("APPROVED", "REJECTED").contains(status == null ? "" : status)
        ) throw new IllegalArgumentException("Use APPROVED or REJECTED");
        Product product = productRepository
            .findByIdForUpdate(id)
            .orElseThrow(() ->
                new org.springframework.web.server.ResponseStatusException(
                    org.springframework.http.HttpStatus.NOT_FOUND,
                    "Product not found"
                )
            );
        boolean announcement =
            "APPROVED".equals(status) && !"APPROVED".equals(product.getApprovalStatus());
        product.setApprovalStatus(status);
        if ("REJECTED".equalsIgnoreCase(status)) {
            product.setIsAvailable(false);
        } else if ("APPROVED".equalsIgnoreCase(status)) {
            product.setIsAvailable(true);
        }
        Product saved = productRepository.saveAndFlush(product);
        if (announcement && visible(saved)) dispatches.publishProduct(id);
        return mapToDTO(saved);
    }

    public List<ProductDTO> getRecommendations(Integer productId) {
        Product currentProduct = productRepository
            .findById(productId)
            .orElseThrow(() ->
                new org.springframework.web.server.ResponseStatusException(
                    org.springframework.http.HttpStatus.NOT_FOUND,
                    "Product not found"
                )
            );
        if (
            !visible(currentProduct)
        ) throw new org.springframework.web.server.ResponseStatusException(
            org.springframework.http.HttpStatus.NOT_FOUND,
            "Product not found"
        );

        com.truehand.model.Category category = currentProduct.getCategory();
        if (category == null) return List.of();

        // Category-based recommendations from available, approved catalog records.
        return productRepository
            .findAll(
                publicProducts().and((root, query, cb) ->
                    cb.and(
                        cb.equal(root.get("category").get("id"), category.getId()),
                        cb.notEqual(root.get("id"), productId)
                    )
                ),
                org.springframework.data.domain.PageRequest.of(
                    0,
                    5,
                    org.springframework.data.domain.Sort.by(
                        org.springframework.data.domain.Sort.Order.desc("stockQuantity"),
                        org.springframework.data.domain.Sort.Order.asc("id")
                    )
                )
            )
            .map(this::mapToDTO)
            .getContent();
    }

    private ProductDTO mapToDTO(Product product) {
        ProductDTO.ProductDTOBuilder builder = ProductDTO.builder()
            .id(product.getId())
            .name(product.getName())
            .description(product.getDescription())
            .category(product.getCategory() != null ? product.getCategory().getName() : null)
            .price(effectivePrice(product))
            .originalPrice(product.getPrice())
            .saleEndsAt(product.getSaleEndsAt())
            .stockQuantity(product.getStockQuantity())
            .imageUrl(product.getImageUrl())
            .isAvailable(
                Boolean.TRUE.equals(product.getIsAvailable()) &&
                    (product.getSeller() == null ||
                        Boolean.TRUE.equals(product.getSeller().getIsActive()))
            )
            .status(product.getApprovalStatus())
            .createdAt(product.getCreatedAt());

        if (product.getSeller() != null) {
            builder.acceptingOrders(policies.acceptingOrders(product.getSeller().getId()));
            builder.sellerId(product.getSeller().getId());
            String sellerName = product.getSeller().getFirstName();
            if (product.getSeller().getLastName() != null) {
                sellerName += " " + product.getSeller().getLastName();
            }
            builder.sellerName(sellerName);
        }

        builder.averageRating(
            product.getAverageRating() == null ? 0.0 : product.getAverageRating()
        );
        builder.reviewCount(product.getReviewCount() == null ? 0 : product.getReviewCount());

        builder.hasVariants(product.getVariants() != null && !product.getVariants().isEmpty());
        if (product.getVariants() != null) builder.variants(
            product
                .getVariants()
                .stream()
                .filter(v -> Boolean.TRUE.equals(v.getIsActive()))
                .map(v ->
                    ProductDTO.ProductVariantDTO.builder()
                        .id(v.getId())
                        .sku(v.getSku())
                        .size(v.getSize())
                        .color(v.getColor())
                        .additionalPrice(v.getAdditionalPrice())
                        .stockQuantity(v.getStockQuantity())
                        .imageUrl(v.getImageUrl())
                        .build()
                )
                .toList()
        );
        if (
            product.getVariants() != null && !product.getVariants().isEmpty()
        ) builder.stockQuantity(
            product
                .getVariants()
                .stream()
                .filter(v -> Boolean.TRUE.equals(v.getIsActive()))
                .mapToInt(v -> v.getStockQuantity() == null ? 0 : v.getStockQuantity())
                .sum()
        );
        return builder.build();
    }

    private org.springframework.data.jpa.domain.Specification<Product> publicProducts() {
        return (root, query, cb) -> {
            var seller = root.join("seller", jakarta.persistence.criteria.JoinType.LEFT);
            return cb.and(
                cb.isTrue(root.get("isAvailable")),
                cb.equal(root.get("approvalStatus"), "APPROVED"),
                cb.or(cb.isNull(root.get("seller")), cb.isTrue(seller.get("isActive")))
            );
        };
    }

    private boolean visible(Product product) {
        return (
            Boolean.TRUE.equals(product.getIsAvailable()) &&
            "APPROVED".equals(product.getApprovalStatus()) &&
            (product.getSeller() == null || Boolean.TRUE.equals(product.getSeller().getIsActive()))
        );
    }

    public BigDecimal effectivePrice(Product product) {
        var now = java.time.LocalDateTime.now();
        return product.getSalePrice() != null &&
            product.getSaleStartsAt() != null &&
            product.getSaleEndsAt() != null &&
            !now.isBefore(product.getSaleStartsAt()) &&
            now.isBefore(product.getSaleEndsAt())
            ? product.getSalePrice()
            : product.getPrice();
    }

    private Page<Product> catalogPage(
        org.springframework.data.jpa.domain.Specification<Product> specification,
        Pageable pageable
    ) {
        var sorting = pageable.getSort().isSorted()
            ? pageable.getSort()
            : org.springframework.data.domain.Sort.by("id");
        var allowed = java.util.Set.of(
            "id",
            "name",
            "price",
            "averageRating",
            "createdAt",
            "reviewCount"
        );
        if (
            sorting.stream().count() > 3 ||
            sorting.stream().anyMatch(order -> !allowed.contains(order.getProperty()))
        ) throw new IllegalArgumentException("Unsupported catalog sort field");
        org.springframework.data.jpa.domain.Specification<Product> ordered = (root, query, cb) -> {
            if (
                query != null &&
                query.getResultType() != Long.class &&
                query.getResultType() != long.class
            ) {
                var orders = new java.util.ArrayList<jakarta.persistence.criteria.Order>();
                for (var sort : sorting) {
                    jakarta.persistence.criteria.Expression<?> value = sort
                        .getProperty()
                        .equals("price")
                        ? com.truehand.repository.ProductSpecification.effectivePrice(root, cb)
                        : root.get(sort.getProperty());
                    orders.add(sort.isAscending() ? cb.asc(value) : cb.desc(value));
                }
                orders.add(cb.asc(root.get("id")));
                query.orderBy(orders);
            }
            return cb.conjunction();
        };
        return productRepository.findAll(
            specification.and(ordered),
            org.springframework.data.domain.PageRequest.of(
                pageable.getPageNumber(),
                Math.min(100, pageable.getPageSize())
            )
        );
    }

    public static void validateProduct(ProductDTO dto) {
        if (
            dto.getName() == null || dto.getName().isBlank() || dto.getName().length() > 255
        ) throw new IllegalArgumentException("Product name must contain 1 to 255 characters");
        if (
            dto.getDescription() != null && dto.getDescription().length() > 10000
        ) throw new IllegalArgumentException("Product description cannot exceed 10000 characters");
        if (
            dto.getPrice() == null ||
            dto.getPrice().signum() <= 0 ||
            dto.getPrice().scale() > 2 ||
            dto.getPrice().precision() - dto.getPrice().scale() > 17
        ) throw new IllegalArgumentException(
            "Price must be a positive INR amount with at most two decimal places"
        );
        if (
            dto.getStockQuantity() == null || dto.getStockQuantity() < 0
        ) throw new IllegalArgumentException("Stock must be a nonnegative integer");
        if (dto.getImageUrl() != null && !dto.getImageUrl().isBlank()) try {
            var uri = java.net.URI.create(dto.getImageUrl());
            if (
                dto.getImageUrl().length() > 2000 ||
                !"https".equals(uri.getScheme()) ||
                uri.getHost() == null ||
                uri.getUserInfo() != null
            ) throw new IllegalArgumentException();
        } catch (IllegalArgumentException invalid) {
            throw new IllegalArgumentException("Product image must use an HTTPS URL");
        }
    }
}
