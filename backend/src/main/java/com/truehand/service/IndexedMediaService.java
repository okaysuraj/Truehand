package com.truehand.service;

import com.truehand.security.AccessPolicy;
import java.util.*;
import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class IndexedMediaService {

    private final ImageAnalysisService images;
    private final CloudinaryService cloudinary;
    private final AccessPolicy access;
    private final JdbcTemplate jdbc;
    private final ProductService products;

    @Transactional
    public Map<String, Object> upload(MultipartFile file) throws java.io.IOException {
        int userId = access.currentUser().getId();
        var image = images.analyze(file);
        String url = cloudinary.uploadValidatedImage(image.bytes());
        Long id = jdbc.queryForObject(
            "insert into uploaded_media_assets(user_id,url,fingerprint,perceptual_hash,average_red,average_green,average_blue,width,height) values(?,?,?,?::bit(64),?,?,?,?,?) returning id",
            Long.class,
            userId,
            url,
            image.fingerprint(),
            image.hash(),
            image.red(),
            image.green(),
            image.blue(),
            image.width(),
            image.height()
        );
        return Map.of("url", url, "assetId", id, "width", image.width(), "height", image.height());
    }

    @Transactional
    public Map<String, Object> search(MultipartFile file) throws java.io.IOException {
        int userId = access.currentUser().getId();
        var image = images.analyze(file);
        var matches = jdbc.query(
            "select p.id,bit_count(a.perceptual_hash # ?::bit(64)) as edge_difference,(abs(a.average_red-?)+abs(a.average_green-?)+abs(a.average_blue-?)) as colour_difference from products p join uploaded_media_assets a on a.url=p.image_url left join users seller on seller.id=p.seller_id where p.is_available=true and p.approval_status='APPROVED' and (p.seller_id is null or seller.is_active=true) and bit_count(a.perceptual_hash # ?::bit(64))<=20 and (abs(a.average_red-?)+abs(a.average_green-?)+abs(a.average_blue-?))<=180 order by edge_difference,colour_difference,p.id limit 20",
            (rs, index) ->
                Map.<String, Object>of(
                    "productId",
                    rs.getInt("id"),
                    "edgeDifference",
                    rs.getInt("edge_difference"),
                    "colourDifference",
                    rs.getInt("colour_difference")
                ),
            image.hash(),
            image.red(),
            image.green(),
            image.blue(),
            image.hash(),
            image.red(),
            image.green(),
            image.blue()
        );
        var results = matches
            .stream()
            .map(row -> {
                var result = new LinkedHashMap<String, Object>(row);
                result.put("product", products.getProduct((Integer) row.get("productId")));
                return result;
            })
            .toList();
        Long id = jdbc.queryForObject(
            "insert into image_searches(user_id,fingerprint,match_count) values(?,?,?) returning id",
            Long.class,
            userId,
            image.fingerprint(),
            results.size()
        );
        return Map.of(
            "searchId",
            id,
            "matches",
            results,
            "method",
            "Colour and edge similarity to uploaded product photographs. Lower differences indicate closer appearance; results do not establish product identity."
        );
    }

    public List<Map<String, Object>> history() {
        return jdbc.queryForList(
            "select id,match_count as \"matchCount\",created_at as \"createdAt\" from image_searches where user_id=? order by id desc limit 50",
            access.currentUser().getId()
        );
    }
}
