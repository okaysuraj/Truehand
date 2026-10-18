package com.truehand.controller;

import com.truehand.service.CloudinaryService;
import java.util.Collections;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/media")
@RequiredArgsConstructor
public class MediaController {

    private final com.truehand.service.IndexedMediaService media;

    @PostMapping("/upload")
    public ResponseEntity<?> uploadImage(@RequestParam("file") MultipartFile file) {
        try {
            return ResponseEntity.ok(media.upload(file));
        } catch (java.io.IOException e) {
            return ResponseEntity.status(502).body(
                java.util.Map.of("error", "Image upload failed. Please retry.")
            );
        }
    }
}
