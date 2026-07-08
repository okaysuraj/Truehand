package com.truehand.service;

import com.truehand.dto.ProductDTO;
import com.truehand.model.Product;
import com.truehand.repository.ProductRepository;
import com.truehand.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class ProductServiceTest {

    @Mock
    private ProductRepository productRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private ProductService productService;

    private Product product;
    private ProductDTO productDTO;

    @BeforeEach
    void setUp() {
        product = Product.builder()
                .id(1)
                .name("Test Product")
                .description("Test Description")
                .category(com.truehand.model.Category.builder().id(1).name("Home").build())
                .price(new BigDecimal("19.99"))
                .stockQuantity(10)
                .isAvailable(true)
                .build();

        productDTO = ProductDTO.builder()
                .name("Test Product")
                .description("Test Description")
                .category("Home")
                .price(new BigDecimal("19.99"))
                .stockQuantity(10)
                .isAvailable(true)
                .build();
    }

    @Test
    void createProduct_ShouldReturnSavedProductDTO() {
        when(productRepository.save(any(Product.class))).thenReturn(product);

        ProductDTO savedDTO = productService.createProduct(productDTO);

        assertNotNull(savedDTO);
        assertEquals("Test Product", savedDTO.getName());
        assertEquals("Home", savedDTO.getCategory());
        verify(productRepository, times(1)).save(any(Product.class));
    }

    @Test
    void getProduct_WhenProductExists_ShouldReturnProductDTO() {
        when(productRepository.findById(1)).thenReturn(Optional.of(product));

        ProductDTO found = productService.getProduct(1);

        assertNotNull(found);
        assertEquals(1, found.getId());
        assertEquals("Test Product", found.getName());
    }

    @Test
    void getProduct_WhenProductDoesNotExist_ShouldThrowException() {
        when(productRepository.findById(99)).thenReturn(Optional.empty());

        Exception exception = assertThrows(RuntimeException.class, () -> productService.getProduct(99));
        assertEquals("Product not found", exception.getMessage());
    }
}
