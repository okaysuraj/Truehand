package com.truehand.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.Map;

@Service
public class CloudinaryService {

    @Value("${cloudinary.url:cloudinary://API_KEY:API_SECRET@CLOUD_NAME}")
    private String cloudinaryUrl;

    private Cloudinary cloudinary;

    @PostConstruct
    public void init() {
        if (!cloudinaryUrl.contains("API_KEY")) {
            cloudinary = new Cloudinary(cloudinaryUrl);
        }
    }

    public String uploadImage(MultipartFile file) throws IOException {
        if (cloudinary == null) {
            // Return placeholder if not configured
            return "https://picsum.photos/500/500?random=" + Math.random();
        }
        Map uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.emptyMap());
        return uploadResult.get("secure_url").toString();
    }
}
