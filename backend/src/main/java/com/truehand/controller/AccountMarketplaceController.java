package com.truehand.controller;

import com.truehand.service.MarketplaceFeatureService;
import java.util.*;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

/** Customer preferences, product alerts, and saved product collections. */
@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class AccountMarketplaceController {

    private final MarketplaceFeatureService features;
    private final com.truehand.service.OrderService orders;
    private final com.truehand.service.ProductService products;

    @GetMapping("/account/purchased-products")
    public Object purchased() {
        return features
            .query(
                "select distinct p.id from products p join order_items oi on oi.product_id=p.id join orders o on o.id=oi.order_id where o.user_id=? and o.payment_status='PAID' and p.approval_status='APPROVED' and p.is_available=true order by p.id desc limit 100",
                features.userId()
            )
            .stream()
            .map(row -> products.getProduct((Integer) row.get("id")))
            .toList();
    }

    @GetMapping("/notifications/preferences/{id}")
    public Object preferences(@PathVariable int id) {
        return features.preferences(id);
    }

    @PostMapping("/notifications/preferences/{id}")
    public Object preferences(
        @PathVariable int id,
        @RequestBody Map<String, Map<String, Boolean>> body
    ) {
        return features.savePreferences(id, body);
    }

    @PostMapping("/products/{id}/view")
    public void viewed(@PathVariable int id) {
        features.viewed(id);
    }

    @GetMapping("/account/alerts")
    public Object alerts() {
        return features.alerts();
    }

    @PostMapping("/account/alerts")
    public Object alert(@RequestBody Map<String, Object> body) {
        return features.saveAlert(body);
    }

    @DeleteMapping("/account/alerts/{id}")
    public void deleteAlert(@PathVariable long id) {
        features.deleteAlert(id);
    }

    @GetMapping("/account/collections")
    public Object collections() {
        return features.collections();
    }

    @PostMapping("/account/collections")
    public Object collection(@RequestBody Map<String, Object> body) {
        return features.createCollection(body);
    }

    @GetMapping("/account/collections/{id}/products")
    public Object collectionProducts(@PathVariable long id) {
        return features.collectionProducts(id);
    }

    @PostMapping("/account/collections/{id}/products/{product}")
    public void addCollectionProduct(@PathVariable long id, @PathVariable int product) {
        features.collectionProduct(id, product, true);
    }

    @DeleteMapping("/account/collections/{id}/products/{product}")
    public void removeCollectionProduct(@PathVariable long id, @PathVariable int product) {
        features.collectionProduct(id, product, false);
    }

    @DeleteMapping("/account/collections/{id}")
    public void deleteCollection(@PathVariable long id) {
        features.deleteCollection(id);
    }

    @GetMapping("/account/lists/{kind}")
    public Object choices(@PathVariable String kind) {
        return features.choices(kind);
    }

    @PostMapping("/account/lists/{kind}/{product}")
    public void addChoice(@PathVariable String kind, @PathVariable int product) {
        features.choice(kind, product, true);
    }

    @DeleteMapping("/account/lists/{kind}/{product}")
    public void removeChoice(@PathVariable String kind, @PathVariable int product) {
        features.choice(kind, product, false);
    }
}
