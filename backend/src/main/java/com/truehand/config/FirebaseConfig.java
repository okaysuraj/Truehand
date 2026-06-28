package com.truehand.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.util.StringUtils;

import javax.annotation.PostConstruct;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.stream.Stream;

@Configuration
public class FirebaseConfig {
    @Value("${GOOGLE_APPLICATION_CREDENTIALS:}")
    private String googleApplicationCredentials;

    @Value("${firebase.credentials.path:}")
    private String firebaseCredentialsPath;

    @PostConstruct
    public void init() throws IOException {
        if (FirebaseApp.getApps().isEmpty()) {
            GoogleCredentials credentials;
            String resolvedPath = Stream.of(googleApplicationCredentials, firebaseCredentialsPath)
                    .filter(StringUtils::hasText)
                    .findFirst()
                    .orElse("");

            if (StringUtils.hasText(resolvedPath)) {
                try (InputStream serviceAccount = new FileInputStream(resolvedPath)) {
                    credentials = GoogleCredentials.fromStream(serviceAccount);
                }
            } else {
                credentials = GoogleCredentials.getApplicationDefault();
            }

            FirebaseOptions options = FirebaseOptions.builder()
                    .setCredentials(credentials)
                    .build();
            FirebaseApp.initializeApp(options);
        }
    }
}
