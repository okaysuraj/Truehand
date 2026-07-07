package com.truehand.service;

import com.truehand.dto.ProductDTO;
import com.truehand.model.Product;
import com.truehand.model.User;
import com.truehand.model.Wishlist;
import com.truehand.repository.ProductRepository;
import com.truehand.repository.UserRepository;
import com.truehand.repository.WishlistRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class WishlistService {

    private final WishlistRepository wishlistRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final ProductService productService; // to map to DTO

    public List<ProductDTO> getUserWishlist(Integer userId) {
        return wishlistRepository.findByUserId(userId).stream()
                .map(w -> productService.getProduct(w.getProduct().getId()))
                .collect(Collectors.toList());
    }

    public void addProductToWishlist(Integer userId, Integer productId) {
        if (wishlistRepository.findByUserIdAndProductId(userId, productId).isPresent()) {
            return; // Already in wishlist
        }
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        Product product = productRepository.findById(productId).orElseThrow(() -> new RuntimeException("Product not found"));

        Wishlist wishlist = Wishlist.builder()
                .user(user)
                .product(product)
                .build();
        wishlistRepository.save(wishlist);
    }

    public void removeProductFromWishlist(Integer userId, Integer productId) {
        wishlistRepository.findByUserIdAndProductId(userId, productId)
                .ifPresent(wishlistRepository::delete);
    }
}
