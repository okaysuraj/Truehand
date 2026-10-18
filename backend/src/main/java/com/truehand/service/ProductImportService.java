package com.truehand.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.truehand.dto.ProductDTO;
import com.truehand.security.AccessPolicy;
import java.math.BigDecimal;
import java.nio.charset.StandardCharsets;
import java.util.*;
import lombok.RequiredArgsConstructor;
import org.apache.commons.csv.CSVFormat;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
@Transactional
@RequiredArgsConstructor
public class ProductImportService {

    private final ProductService products;
    private final AccessPolicy access;
    private final JdbcTemplate jdbc;
    private final ObjectMapper mapper;
    private static final List<String> HEADERS = List.of(
        "name",
        "description",
        "category",
        "price",
        "stockQuantity",
        "imageUrl"
    );

    public Map<String, Object> upload(MultipartFile file, boolean preview, String requestKey)
        throws java.io.IOException {
        var user = access.currentUser();
        if (
            !Set.of("SELLER", "ADMIN").contains(user.getRole())
        ) throw new org.springframework.web.server.ResponseStatusException(
            org.springframework.http.HttpStatus.FORBIDDEN,
            "Seller access required"
        );
        if (file.isEmpty() || file.getSize() > 2 * 1024 * 1024) throw new IllegalArgumentException(
            "Upload a UTF-8 CSV file up to 2 MB"
        );
        byte[] bytes = file.getBytes();
        String content;
        try {
            content = StandardCharsets.UTF_8.newDecoder()
                .decode(java.nio.ByteBuffer.wrap(bytes))
                .toString();
        } catch (java.nio.charset.CharacterCodingException invalid) {
            throw new IllegalArgumentException("CSV must use UTF-8 encoding");
        }
        if (content.startsWith("\uFEFF")) content = content.substring(1);
        var rows = new ArrayList<ProductDTO>();
        var errors = new ArrayList<Map<String, Object>>();
        try (
            var parser = CSVFormat.RFC4180.builder()
                .setHeader()
                .setSkipHeaderRecord(true)
                .setIgnoreEmptyLines(true)
                .get()
                .parse(new java.io.StringReader(content))
        ) {
            if (!parser.getHeaderNames().equals(HEADERS)) throw new IllegalArgumentException(
                "CSV headers must be: " + String.join(",", HEADERS)
            );
            for (var record : parser) {
                if (record.getRecordNumber() > 500) throw new IllegalArgumentException(
                    "CSV imports are limited to 500 products"
                );
                try {
                    if (!record.isConsistent()) throw new IllegalArgumentException(
                        "Expected six columns"
                    );
                    var dto = ProductDTO.builder()
                        .name(record.get("name").trim())
                        .description(record.get("description").trim())
                        .category(record.get("category").trim())
                        .price(new BigDecimal(record.get("price").trim()))
                        .stockQuantity(Integer.valueOf(record.get("stockQuantity").trim()))
                        .imageUrl(record.get("imageUrl").trim())
                        .isAvailable(true)
                        .build();
                    ProductService.validateProduct(dto);
                    if (
                        dto.getCategory().isBlank() ||
                        jdbc.queryForObject(
                            "select count(*) from categories where name=?",
                            Integer.class,
                            dto.getCategory()
                        ) == 0
                    ) throw new IllegalArgumentException("Select an existing category");
                    rows.add(dto);
                } catch (IllegalArgumentException invalid) {
                    errors.add(
                        Map.of(
                            "row",
                            record.getRecordNumber() + 1,
                            "error",
                            invalid instanceof NumberFormatException
                                ? "Price and stock must be valid numbers"
                                : invalid.getMessage()
                        )
                    );
                }
            }
        } catch (java.io.UncheckedIOException | java.io.IOException invalid) {
            throw new IllegalArgumentException(
                "CSV is malformed. Check quoting and column separators."
            );
        }
        if (rows.isEmpty() && errors.isEmpty()) throw new IllegalArgumentException(
            "CSV contains no products"
        );
        if (preview || !errors.isEmpty()) return Map.of(
            "valid",
            errors.isEmpty(),
            "rowCount",
            rows.size() + errors.size(),
            "rows",
            rows,
            "errors",
            errors,
            "createdCount",
            0
        );
        if (
            requestKey == null || !UUID.fromString(requestKey).toString().equals(requestKey)
        ) throw new IllegalArgumentException("A valid import request key is required");
        String hash;
        try {
            hash = HexFormat.of().formatHex(
                java.security.MessageDigest.getInstance("SHA-256").digest(bytes)
            );
        } catch (java.security.NoSuchAlgorithmException impossible) {
            throw new IllegalStateException(impossible);
        }
        jdbc.queryForObject(
            "select id from users where id=? for update",
            Integer.class,
            user.getId()
        );
        var previous = jdbc.queryForList(
            "select file_sha256,created_product_ids::text as ids from product_import_jobs where seller_id=? and request_key=?",
            user.getId(),
            requestKey
        );
        if (!previous.isEmpty()) {
            if (
                !hash.equals(previous.get(0).get("file_sha256"))
            ) throw new IllegalArgumentException("This request key belongs to a different import");
            var ids = mapper.readValue((String) previous.get(0).get("ids"), List.class);
            return Map.of(
                "valid",
                true,
                "createdCount",
                ids.size(),
                "productIds",
                ids,
                "replayed",
                true
            );
        }
        var ids = rows
            .stream()
            .map(dto -> products.createProduct(dto, user.getId()).getId())
            .toList();
        jdbc.update(
            "insert into product_import_jobs(seller_id,request_key,file_sha256,created_product_ids) values(?,?,?,?::jsonb)",
            user.getId(),
            requestKey,
            hash,
            mapper.writeValueAsString(ids)
        );
        return Map.of(
            "valid",
            true,
            "createdCount",
            ids.size(),
            "productIds",
            ids,
            "replayed",
            false
        );
    }
}
