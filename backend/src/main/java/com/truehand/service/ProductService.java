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

    public ProductDTO createProduct(ProductDTO productDTO, Integer sellerId) {
        User seller = null;
        if (sellerId != null) {
            seller = userRepository.findById(sellerId).orElse(null);
        }

        Product product = Product.builder()
                .name(productDTO.getName())
                .description(productDTO.getDescription())
                .category(productDTO.getCategory())
                .price(productDTO.getPrice())
                .stockQuantity(productDTO.getStockQuantity())
                .imageUrl(productDTO.getImageUrl())
                .isAvailable(productDTO.getIsAvailable() != null ? productDTO.getIsAvailable() : true)
                .seller(seller)
                .build();

        Product savedProduct = productRepository.save(product);
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
        if (productDTO.getCategory() != null) product.setCategory(productDTO.getCategory());
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

    private ProductDTO mapToDTO(Product product) {
        ProductDTO.ProductDTOBuilder builder = ProductDTO.builder()
                .id(product.getId())
                .name(product.getName())
                .description(product.getDescription())
                .category(product.getCategory())
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
