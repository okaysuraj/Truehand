package com.truehand.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import jakarta.annotation.PostConstruct;
import java.io.IOException;
import java.util.Map;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class CloudinaryService {

    @Value("${cloudinary.url:}")
    private String cloudinaryUrl;

    private Cloudinary cloudinary;

    @PostConstruct
    public void init() {
        if (!cloudinaryUrl.isBlank() && !cloudinaryUrl.contains("API_KEY")) {
            cloudinary = new Cloudinary(cloudinaryUrl);
        }
    }

    public String uploadValidatedImage(byte[] bytes) throws IOException {
        if (cloudinary == null) {
            throw new org.springframework.web.server.ResponseStatusException(
                org.springframework.http.HttpStatus.SERVICE_UNAVAILABLE,
                "Media uploads are not configured"
            );
        }
        if (bytes.length > 10 * 1024 * 1024) throw new IllegalArgumentException(
            "Decoded photograph exceeds the upload limit"
        );
        Map uploadResult = cloudinary
            .uploader()
            .upload(bytes, ObjectUtils.asMap("resource_type", "image"));
        String url = String.valueOf(uploadResult.get("secure_url"));
        if (!url.startsWith("https://")) throw new IOException(
            "Media provider did not return a secure image URL"
        );
        return url;
    }
}
