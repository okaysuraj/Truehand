package com.truehand.service;

import com.truehand.model.ProductVariant;
import com.truehand.repository.ProductRepository;
import com.truehand.repository.ProductVariantRepository;
import java.math.BigDecimal;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class VariantService {

    private final ProductRepository products;
    private final ProductVariantRepository variants;

    public ProductVariant save(Integer productId, Integer variantId, Map<String, Object> body) {
        var product = products
            .findByIdForUpdate(productId)
            .orElseThrow(() -> new IllegalArgumentException("Product not found"));
        var variant =
            variantId == null
                ? ProductVariant.builder().product(product).build()
                : variants
                      .findByIdForUpdate(variantId)
                      .orElseThrow(() -> new IllegalArgumentException("Variant not found"));
        if (!productId.equals(variant.getProduct().getId())) throw new IllegalArgumentException(
            "Variant does not belong to this product"
        );
        String sku = String.valueOf(body.getOrDefault("sku", "")).trim();
        if (!sku.matches("[A-Za-z0-9_-]{1,100}")) throw new IllegalArgumentException(
            "SKU must contain 1 to 100 letters, digits, underscores or hyphens"
        );
        BigDecimal extra = new BigDecimal(
            String.valueOf(body.getOrDefault("additionalPrice", "0"))
        ).setScale(2, java.math.RoundingMode.UNNECESSARY);
        int stock = Integer.parseInt(String.valueOf(body.getOrDefault("stockQuantity", "0")));
        if (
            extra.signum() < 0 || extra.precision() > 15 || stock < 0
        ) throw new IllegalArgumentException("Invalid variant price or stock");
        variant.setSku(sku);
        variant.setStockQuantity(stock);
        variant.setAdditionalPrice(extra);
        variant.setSize(optional(body, "size"));
        variant.setColor(optional(body, "color"));
        String image = optional(body, "imageUrl");
        if (image != null && !image.startsWith("https://")) throw new IllegalArgumentException(
            "Image URL must use HTTPS"
        );
        variant.setImageUrl(image);
        variant.setIsActive(true);
        return variants.saveAndFlush(variant);
    }

    private String optional(Map<String, Object> body, String key) {
        Object value = body.get(key);
        if (value == null || value.toString().isBlank()) return null;
        String text = value.toString().trim();
        if (text.length() > 255) throw new IllegalArgumentException("Variant field is too long");
        return text;
    }

    public void retire(Integer productId, Integer variantId) {
        products.findByIdForUpdate(productId).orElseThrow();
        var variant = variants.findByIdForUpdate(variantId).orElseThrow();
        if (!productId.equals(variant.getProduct().getId())) throw new IllegalArgumentException(
            "Variant does not belong to this product"
        );
        variant.setIsActive(false);
        variants.save(variant);
    }
}
