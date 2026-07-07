package com.truehand.config;

import com.truehand.model.Product;
import com.truehand.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final ProductRepository productRepository;
    private final com.truehand.repository.CategoryRepository categoryRepository;

    @Override
    public void run(String... args) throws Exception {
        if (productRepository.count() == 0) {
            List<Product> products = new ArrayList<>();
            Random random = new Random();
            
            String[] categories = {"Electronics", "Clothing", "Home", "Books", "Toys"};
            String[] adjectives = {"Premium", "Vintage", "Wireless", "Organic", "Smart", "Ergonomic", "Handcrafted", "Luxury", "Essential", "Minimalist"};
            String[] nouns = {"Headphones", "T-Shirt", "Coffee Mug", "Notebook", "Speaker", "Watch", "Chair", "Lamp", "Keyboard", "Backpack"};
            
            for (int i = 1; i <= 100; i++) {
                String category = categories[random.nextInt(categories.length)];
                String name = adjectives[random.nextInt(adjectives.length)] + " " + nouns[random.nextInt(nouns.length)];
                String description = "This is a wonderful " + name.toLowerCase() + " that fits perfectly in the " + category + " category. Experience top quality and amazing features.";
                BigDecimal price = BigDecimal.valueOf(10 + (290 * random.nextDouble())).setScale(2, java.math.RoundingMode.HALF_UP);
                
                com.truehand.model.Category categoryEntity = categoryRepository.findByName(category).orElseGet(() -> {
                    com.truehand.model.Category newCategory = com.truehand.model.Category.builder().name(category).build();
                    return categoryRepository.save(newCategory);
                });

                Product product = Product.builder()
                        .name(name + " " + i)
                        .description(description)
                        .category(categoryEntity)
                        .price(price)
                        .stockQuantity(random.nextInt(100) + 1)
                        .imageUrl("https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=2070")
                        .isAvailable(true)
                        .averageRating(3 + (2 * random.nextDouble()))
                        .reviewCount(random.nextInt(500))
                        .build();
                        
                products.add(product);
            }
            
            productRepository.saveAll(products);
            System.out.println("Seeded 100 products successfully!");
        }
    }
}
