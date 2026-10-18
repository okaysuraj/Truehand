package com.truehand.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.truehand.security.AccessPolicy;
import com.truehand.service.MarketplaceFeatureService;
import com.truehand.service.ProductService;
import java.math.BigDecimal;
import java.util.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/account/catalog-assistance")
@RequiredArgsConstructor
public class CatalogAssistanceController {

    private final MarketplaceFeatureService features;
    private final ProductService products;
    private final AccessPolicy access;
    private final JdbcTemplate jdbc;
    private final ObjectMapper mapper;

    @GetMapping
    public Object history() {
        return features.query(
            "select id,question,catalog_query,response,created_at from catalog_assistance where user_id=? order by id desc limit 50",
            features.userId()
        );
    }

    @PostMapping
    @Transactional
    public Object ask(@RequestBody Map<String, Object> body)
        throws com.fasterxml.jackson.core.JsonProcessingException {
        String question = features.text(body, "question", 1000),
            key = features.text(body, "requestKey", 36);
        if (!UUID.fromString(key).toString().equals(key)) throw new IllegalArgumentException(
            "A request key is required"
        );
        int userId = access.currentUser().getId();
        jdbc.queryForObject("select id from users where id=? for update", Integer.class, userId);
        String query =
            body.get("search") instanceof String search && !search.isBlank()
                ? features.text(body, "search", 200)
                : extractQuery(question);
        var old = features.query(
            "select id,question,catalog_query,response,created_at,product_ids::text as ids from catalog_assistance where user_id=? and request_key=?",
            userId,
            key
        );
        if (!old.isEmpty()) {
            var row = new LinkedHashMap<>(old.get(0));
            if (
                !question.equals(row.get("question")) || !query.equals(row.get("catalogQuery"))
            ) throw new IllegalArgumentException("Request key belongs to another query");
            List<Integer> ids = mapper.readValue(
                (String) row.remove("ids"),
                new com.fasterxml.jackson.core.type.TypeReference<>() {}
            );
            row.put(
                "products",
                ids
                    .stream()
                    .map(products::getProduct)
                    .filter(
                        dto ->
                            "APPROVED".equals(dto.getStatus()) &&
                            Boolean.TRUE.equals(dto.getIsAvailable())
                    )
                    .toList()
            );
            return row;
        }
        BigDecimal maximum = null;
        var price = java.util.regex.Pattern.compile(
            "(?i)(?:under|below|less than|up to)\\s*(?:INR|Rs\\.?|₹)?\\s*(\\d{1,9}(?:\\.\\d{1,2})?)"
        ).matcher(question);
        if (price.find()) maximum = new BigDecimal(price.group(1));
        var matches = query.isBlank()
            ? List.<com.truehand.dto.ProductDTO>of()
            : products
                  .getFilteredProducts(query, null, null, maximum, null, PageRequest.of(0, 20))
                  .getContent();
        String response = matches.isEmpty()
            ? "No available catalog products matched this query. Try a product name, material or category, or contact support."
            : "Matched " +
              matches.size() +
              " available catalog products. Prices and stock below are from the database; review the product options before purchasing.";
        var saved = new LinkedHashMap<>(
            features.one(
                "insert into catalog_assistance(user_id,request_key,question,catalog_query,product_ids,response) values(?,?,?,?,?::jsonb,?) returning id,question,catalog_query,response,created_at",
                userId,
                key,
                question,
                query,
                mapper.writeValueAsString(
                    matches.stream().map(com.truehand.dto.ProductDTO::getId).toList()
                ),
                response
            )
        );
        saved.put("products", matches);
        return saved;
    }

    private static String extractQuery(String question) {
        String cleaned = question
            .toLowerCase(Locale.ROOT)
            .replaceAll(
                "(?:under|below|less than|up to)\\s*(?:inr|rs\\.?|₹)?\\s*\\d+(?:\\.\\d+)?",
                ""
            );
        Set<String> stop = Set.of(
            "find",
            "show",
            "me",
            "some",
            "a",
            "an",
            "the",
            "please",
            "want",
            "i",
            "need",
            "looking",
            "for",
            "can",
            "you",
            "recommend",
            "products",
            "product",
            "with",
            "to",
            "buy",
            "inr",
            "rupees"
        );
        String query = java.util.Arrays.stream(cleaned.split("[^\\p{L}\\p{N}]+"))
            .filter(word -> !word.isBlank() && !stop.contains(word))
            .limit(10)
            .collect(java.util.stream.Collectors.joining(" "));
        return query.length() > 200 ? query.substring(0, 200) : query;
    }
}
