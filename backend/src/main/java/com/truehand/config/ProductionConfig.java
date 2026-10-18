package com.truehand.config;

import jakarta.annotation.PostConstruct;
import java.net.URI;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.core.env.Environment;

@Configuration
@Profile("prod")
@RequiredArgsConstructor
public class ProductionConfig {

    private final Environment environment;

    @PostConstruct
    void validate() {
        if (
            !environment.getProperty("firebase.enabled", Boolean.class, true)
        ) throw new IllegalStateException(
            "Firebase identity verification must be enabled in production"
        );
        String emulator = environment.getProperty("FIREBASE_AUTH_EMULATOR_HOST");
        if (emulator != null && !emulator.isBlank()) throw new IllegalStateException(
            "Firebase Authentication emulator configuration is forbidden in production"
        );
        if (
            !environment.getProperty("api.rate-limit.enabled", Boolean.class, true)
        ) throw new IllegalStateException(
            "Authenticated request protection must be enabled in production"
        );
        for (String name : new String[] {
            "DATABASE_URL",
            "DATABASE_USERNAME",
            "DATABASE_PASSWORD",
            "STRIPE_SECRET_KEY",
            "STRIPE_WEBHOOK_SECRET",
            "CLOUDINARY_URL",
            "CORS_ALLOWED_ORIGINS",
            "FRONTEND_BASE_URL",
            "MAIL_HOST",
            "MAIL_USERNAME",
            "MAIL_PASSWORD",
            "MAIL_FROM",
            "DATA_ENCRYPTION_KEY",
        }) {
            String value = environment.getProperty(name);
            if (value == null || value.isBlank()) throw new IllegalStateException(
                "Required production configuration is missing: " + name
            );
        }
        try {
            if (
                java.util.Base64.getDecoder()
                    .decode(environment.getProperty("DATA_ENCRYPTION_KEY"))
                    .length != 32
            ) throw new IllegalArgumentException();
        } catch (Exception failure) {
            throw new IllegalStateException("DATA_ENCRYPTION_KEY must encode 32 bytes");
        }
        for (String origin : environment.getProperty("CORS_ALLOWED_ORIGINS").split(",")) {
            URI uri = URI.create(origin.trim());
            if (
                !"https".equals(uri.getScheme()) ||
                uri.getHost() == null ||
                uri.getUserInfo() != null ||
                uri.getQuery() != null ||
                (uri.getPath() != null && !uri.getPath().isEmpty())
            ) throw new IllegalStateException(
                "Production CORS origins must be explicit HTTPS origins"
            );
        }
        URI frontend = URI.create(environment.getProperty("FRONTEND_BASE_URL"));
        if (
            !"https".equals(frontend.getScheme()) || frontend.getHost() == null
        ) throw new IllegalStateException("Production frontend URL must use HTTPS");
    }
}
