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
            
            String[] categories = {"Ceramics", "Textiles", "Woodwork", "Glasswork", "Metalwork", "Jewelry", "Leather", "Sculpture"};
            String[] adjectives = {"Hand-Thrown", "Woven", "Raw", "Carved", "Smoke Tinted", "Forged", "Minimalist", "Rustic", "Artisan", "Bespoke"};
            String[] nouns = {"Vase", "Throw", "Sculpture", "Nesting Set", "Glassware", "Knife", "Serving Bowl", "Planter", "Tea Bowl", "Pendant"};
            
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
                        .imageUrl(getRandomImage(random))
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


    private String getRandomImage(Random random) {
        String[] images = {
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDBZsoNDKzt0sNNNaz_kkg_AucXnrM4BDTnl3Htj_EyczMMM2kUr3fsSAAzA5avsLC4P3Njo1IlRfwfNwDzXdQGd_psaQ6mmCr62wxnoasEpPDpQXQ419PJR_h3uTbhQDeJ3x4K5CAipg26juxdJ8qh4m462MdMIQZTRFkxbBVxtyNQFqCtfihbeR8_MU8nFCIHqNZZTDPMf4qEDyCqGmWCRA1zZoEuh6gJ4uAMUlzYUVni7nB48hHzEw",
            "https://lh3.googleusercontent.com/aida-public/AB6AXuA_I4nhUfp3d2Zzoc96FbyCm9YMdTJRRS7xFs7tHKpUyOaeQ-9oftw_YQLawUH6Gcp-mtHwiqzjxGn8VY2aWp-X7BEjEFtPQKAs6sugXHGJMjdo2dzbjw2oaTHK3q6tf0SJ59BPGuHDI6N-f4QhP1YFfv6i4UN6jV9FrlHnQpfhPW0POybsfcFMSqF2Yo1f_dCta_gU4NCUgy2CquDC_fyF8HQKGNjALPeeqmF8DbN3uDEuLPZz5-Kb9A",
            "https://lh3.googleusercontent.com/aida-public/AB6AXuBtExz30CUj3OhHY1qRJT7iqKjlA9owNKpJOiK-Au2lQn8jlbdXjp4f5lwhvkZeb_mCCQctKKkZr1IPtZDaDUihMrsKNYMsfLU8F__veHjFnFgtDRBictWZ9qj5CfmWIxkNLS6GgK8zTh6nkzPm9OgAPoZR60g1mQL0cjNzVNiDiZPg0z10EuS4LYLBkbqQeSDGjeljCWLmsXoBa9EKITfu4BAvzuBCkDPuIpUw_jBKTHQazw_GkZwZKw",
            "https://lh3.googleusercontent.com/aida-public/AB6AXuAihgFBpVMJrO3PO3Nkh0kMNQ_O3fG1p1x6mmmQjhpuxwDJtojvNkz0hHHUz-Dh0FHrXCTr4JxY3U7XlM97FLLPZ0a19omKGqfFJg0aGD2DNr1yFoLUxyimit52f4VN6cjsv3z0fKvXLvOc_Kjwm_aautVn6LWP1mFnNTlcFyjHCdSlA8vGC9eQMvut6TxHemacNecCLXNaL26n7wGEcz8cER6qPbmVU-JcxAzHzYX7lsksV-PGoXoJMA",
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDl32JIaQbyVRfKquoWr73CBK1P7KEV3FclqyVydZOXMW9b83FV7EglQeDBblwAxNrdVTtU1zGODJuR-ITbtOV_kxNg5U3lQaJmwi5nM8nG6WAqB_yN3luvUoNa9kUE0XRNoJ59nFaXxzPZ7-Z49tZfwG8M91aHCkskouHxtDctoQFL4_2KLhHEITPcaXWh8U-WiowONVUJU3DFhT8ULsza8-8imKcb6BuhOqPokG7v5laz--K2E3KwRQ"
        };
        return images[random.nextInt(images.length)];
    }
}
