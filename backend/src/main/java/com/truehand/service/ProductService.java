package com.truehand.service;

import com.truehand.dto.ProductDTO;
import com.truehand.model.Product;
import com.truehand.model.User;
import com.truehand.repository.ProductRepository;
import com.truehand.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final com.truehand.repository.CategoryRepository categoryRepository;
    private final com.truehand.repository.ProductVariantRepository productVariantRepository;

    public ProductDTO createProduct(ProductDTO productDTO, Integer sellerId) {
        User seller = null;
        if (sellerId != null) {
            seller = userRepository.findById(sellerId).orElse(null);
        }

        com.truehand.model.Category category = null;
        if (productDTO.getCategory() != null) {
             category = categoryRepository.findByName(productDTO.getCategory()).orElseGet(() -> {
                 com.truehand.model.Category newCat = com.truehand.model.Category.builder().name(productDTO.getCategory()).build();
                 return categoryRepository.save(newCat);
             });
        }

        Product product = Product.builder()
                .name(productDTO.getName())
                .description(productDTO.getDescription())
                .category(category)
                .price(productDTO.getPrice())
                .stockQuantity(productDTO.getStockQuantity())
                .imageUrl(productDTO.getImageUrl())
                .isAvailable(productDTO.getIsAvailable() != null ? productDTO.getIsAvailable() : true)
                .seller(seller)
                .build();

        Product savedProduct = productRepository.save(product);

        if (productDTO.getVariants() != null && !productDTO.getVariants().isEmpty()) {
            List<com.truehand.model.ProductVariant> variants = productDTO.getVariants().stream().map(v -> 
                com.truehand.model.ProductVariant.builder()
                    .product(savedProduct)
                    .sku(v.getSku())
                    .size(v.getSize())
                    .color(v.getColor())
                    .additionalPrice(v.getAdditionalPrice())
                    .stockQuantity(v.getStockQuantity())
                    .imageUrl(v.getImageUrl())
                    .build()
            ).collect(java.util.stream.Collectors.toList());
            productVariantRepository.saveAll(variants);
        }

        return mapToDTO(savedProduct);
    }

    public ProductDTO createProduct(ProductDTO productDTO) {
        return createProduct(productDTO, productDTO.getSellerId());
    }

    public ProductDTO getProduct(Integer id) {
        return productRepository.findById(id)
                .map(this::mapToDTO)
                .orElseThrow(() -> new RuntimeException("Product not found"));
    }

    public Page<ProductDTO> getAllProducts(Pageable pageable) {
        return productRepository.findByIsAvailableTrue(pageable)
                .map(this::mapToDTO);
    }

    public List<ProductDTO> getTrendingProducts() {
        // Fetch top 10 products sorted by price desc or random as trending stub
        org.springframework.data.domain.Pageable topTen = org.springframework.data.domain.PageRequest.of(0, 10, org.springframework.data.domain.Sort.by(org.springframework.data.domain.Sort.Direction.DESC, "stockQuantity"));
        return productRepository.findAll(topTen).getContent()
                .stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    public List<ProductDTO> searchByName(String name) {
        return productRepository.findByNameContainingIgnoreCase(name)
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public Page<ProductDTO> getFilteredProducts(String search, String category, java.math.BigDecimal minPrice, java.math.BigDecimal maxPrice, Double minRating, Pageable pageable) {
        org.springframework.data.jpa.domain.Specification<Product> spec = com.truehand.repository.ProductSpecification.getProductsByFilters(search, category, minPrice, maxPrice, minRating);
        return productRepository.findAll(spec, pageable).map(this::mapToDTO);
    }

    public List<ProductDTO> getByCategory(String category) {
        return productRepository.findByCategory(category)
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public List<ProductDTO> getProductsBySeller(Integer sellerId) {
        return productRepository.findBySellerId(sellerId)
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public ProductDTO updateProduct(Integer id, ProductDTO productDTO) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        if (productDTO.getName() != null) product.setName(productDTO.getName());
        if (productDTO.getDescription() != null) product.setDescription(productDTO.getDescription());
        if (productDTO.getCategory() != null) {
            com.truehand.model.Category category = categoryRepository.findByName(productDTO.getCategory()).orElseGet(() -> {
                com.truehand.model.Category newCat = com.truehand.model.Category.builder().name(productDTO.getCategory()).build();
                return categoryRepository.save(newCat);
            });
            product.setCategory(category);
        }
        if (productDTO.getPrice() != null) product.setPrice(productDTO.getPrice());
        if (productDTO.getStockQuantity() != null) product.setStockQuantity(productDTO.getStockQuantity());
        if (productDTO.getImageUrl() != null) product.setImageUrl(productDTO.getImageUrl());
        if (productDTO.getIsAvailable() != null) product.setIsAvailable(productDTO.getIsAvailable());

        Product updatedProduct = productRepository.save(product);
        return mapToDTO(updatedProduct);
    }

    public void deleteProduct(Integer id) {
        productRepository.deleteById(id);
    }

    public List<ProductDTO> getRecommendations(Integer productId) {
        Product currentProduct = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        com.truehand.model.Category category = currentProduct.getCategory();
        if (category == null) return List.of();

        // Smart Recommendation Stub: Same category, high stock, excluding self, limit 5
        return productRepository.findByCategory(category.getName())
                .stream()
                .filter(p -> !p.getId().equals(productId) && Boolean.TRUE.equals(p.getIsAvailable()))
                .sorted((p1, p2) -> {
                    Integer s1 = p1.getStockQuantity() == null ? 0 : p1.getStockQuantity();
                    Integer s2 = p2.getStockQuantity() == null ? 0 : p2.getStockQuantity();
                    return s2.compareTo(s1);
                })
                .limit(5)
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    private ProductDTO mapToDTO(Product product) {
        ProductDTO.ProductDTOBuilder builder = ProductDTO.builder()
                .id(product.getId())
                .name(product.getName())
                .description(product.getDescription())
                .category(product.getCategory() != null ? product.getCategory().getName() : null)
                .price(product.getPrice())
                .stockQuantity(product.getStockQuantity())
                .imageUrl(product.getImageUrl())
                .isAvailable(product.getIsAvailable());

        if (product.getSeller() != null) {
            builder.sellerId(product.getSeller().getId());
            String sellerName = product.getSeller().getFirstName();
            if (product.getSeller().getLastName() != null) {
                sellerName += " " + product.getSeller().getLastName();
            }
            builder.sellerName(sellerName);
        }
        
        if (product.getReviews() != null && !product.getReviews().isEmpty()) {
            double sum = 0;
            for (com.truehand.model.Review r : product.getReviews()) {
                sum += r.getRating();
            }
            builder.averageRating(sum / product.getReviews().size());
            builder.reviewCount(product.getReviews().size());
        } else {
            builder.averageRating(0.0);
            builder.reviewCount(0);
        }

        return builder.build();
    }
}
