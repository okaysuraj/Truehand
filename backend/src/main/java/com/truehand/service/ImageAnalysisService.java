package com.truehand.service;

import java.awt.Color;
import java.awt.image.BufferedImage;
import java.io.*;
import java.util.*;
import javax.imageio.ImageIO;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class ImageAnalysisService {

    public record Analysis(
        byte[] bytes,
        String hash,
        int red,
        int green,
        int blue,
        int width,
        int height,
        String fingerprint
    ) {}

    public Analysis analyze(MultipartFile file) throws IOException {
        if (file.isEmpty() || file.getSize() > 10 * 1024 * 1024) throw new IllegalArgumentException(
            "Upload a JPEG, PNG or WebP photograph up to 10 MB"
        );
        String claimed = file.getContentType();
        if (
            !Set.of("image/jpeg", "image/png", "image/webp").contains(
                claimed == null ? "" : claimed
            )
        ) throw new IllegalArgumentException("JPEG, PNG and WebP photographs are supported");
        byte[] raw = file.getBytes();
        BufferedImage image;
        try (var input = ImageIO.createImageInputStream(new ByteArrayInputStream(raw))) {
            var readers = ImageIO.getImageReaders(input);
            if (!readers.hasNext()) throw new IllegalArgumentException(
                "File contents are not a supported photograph"
            );
            var reader = readers.next();
            try {
                reader.setInput(input, true, true);
                String format = reader.getFormatName().toLowerCase(Locale.ROOT);
                String detected = switch (format) {
                    case "jpeg", "jpg" -> "image/jpeg";
                    case "png" -> "image/png";
                    case "webp" -> "image/webp";
                    default -> "";
                };
                if (!claimed.equals(detected)) throw new IllegalArgumentException(
                    "Photograph contents do not match its file type"
                );
                int width = reader.getWidth(0),
                    height = reader.getHeight(0);
                if (
                    width < 1 ||
                    height < 1 ||
                    width > 12000 ||
                    height > 12000 ||
                    (long) width * height > 25000000L
                ) throw new IllegalArgumentException(
                    "Photograph dimensions exceed 25 megapixels or 12000 pixels per side"
                );
                var parameters = reader.getDefaultReadParam();
                int scale = Math.max(1, (Math.max(width, height) + 2047) / 2048);
                parameters.setSourceSubsampling(scale, scale, 0, 0);
                image = reader.read(0, parameters);
            } finally {
                reader.dispose();
            }
        } catch (IllegalArgumentException invalid) {
            throw invalid;
        } catch (IOException | RuntimeException invalid) {
            throw new IllegalArgumentException("Photograph cannot be decoded safely");
        }
        if (image == null) throw new IllegalArgumentException(
            "Photograph contains no decodable image"
        );
        // Re-encode decoded pixels. Original metadata and trailing file payloads are not uploaded.
        var clean = new BufferedImage(
            image.getWidth(),
            image.getHeight(),
            BufferedImage.TYPE_INT_RGB
        );
        var graphics = clean.createGraphics();
        try {
            graphics.setColor(Color.WHITE);
            graphics.fillRect(0, 0, clean.getWidth(), clean.getHeight());
            graphics.drawImage(image, 0, 0, null);
        } finally {
            graphics.dispose();
        }
        var sample = new BufferedImage(9, 8, BufferedImage.TYPE_INT_RGB);
        graphics = sample.createGraphics();
        try {
            graphics.drawImage(clean, 0, 0, 9, 8, null);
        } finally {
            graphics.dispose();
        }
        StringBuilder hash = new StringBuilder(64);
        for (int y = 0; y < 8; y++) for (int x = 0; x < 8; x++) hash.append(
            luminance(sample.getRGB(x, y)) > luminance(sample.getRGB(x + 1, y)) ? '1' : '0'
        );
        long red = 0,
            green = 0,
            blue = 0;
        int count = 0;
        for (int y = 0; y < clean.getHeight(); y += Math.max(1, clean.getHeight() / 32)) for (
            int x = 0;
            x < clean.getWidth();
            x += Math.max(1, clean.getWidth() / 32)
        ) {
            int pixel = clean.getRGB(x, y);
            red += (pixel >>> 16) & 255;
            green += (pixel >>> 8) & 255;
            blue += pixel & 255;
            count++;
        }
        var output = new ByteArrayOutputStream();
        if (!ImageIO.write(clean, "jpeg", output)) throw new IllegalStateException(
            "JPEG encoder unavailable"
        );
        String fingerprint;
        try {
            fingerprint = HexFormat.of().formatHex(
                java.security.MessageDigest.getInstance("SHA-256").digest(raw)
            );
        } catch (java.security.NoSuchAlgorithmException impossible) {
            throw new IllegalStateException(impossible);
        }
        return new Analysis(
            output.toByteArray(),
            hash.toString(),
            (int) (red / count),
            (int) (green / count),
            (int) (blue / count),
            clean.getWidth(),
            clean.getHeight(),
            fingerprint
        );
    }

    private static int luminance(int color) {
        return (
            (((color >>> 16) & 255) * 299 + ((color >>> 8) & 255) * 587 + (color & 255) * 114) /
            1000
        );
    }
}
