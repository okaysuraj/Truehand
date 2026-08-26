package com.truehand.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.util.StringUtils;

import javax.annotation.PostConstruct;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;

@Configuration
public class FirebaseConfig {

    @Value("${FIREBASE_PROJECT_ID:}")
    private String projectId;

    @Value("${FIREBASE_PRIVATE_KEY_ID:}")
    private String privateKeyId;

    @Value("${FIREBASE_PRIVATE_KEY:}")
    private String privateKey;

    @Value("${FIREBASE_CLIENT_EMAIL:}")
    private String clientEmail;

    @Value("${FIREBASE_CLIENT_ID:}")
    private String clientId;

    @Value("${FIREBASE_CLIENT_X509_CERT_URL:}")
    private String clientX509CertUrl;

    @PostConstruct
    public void init() throws IOException {
        if (FirebaseApp.getApps().isEmpty()) {
            GoogleCredentials credentials;

            if (StringUtils.hasText(projectId) && StringUtils.hasText(privateKey) && StringUtils.hasText(clientEmail)) {
                // Ensure newlines are properly escaped for JSON if they aren't already
                String formattedPrivateKey = privateKey.replace("\"", "\\\"");
                
                String jsonConfig = String.format("{\n" +
                        "  \"type\": \"service_account\",\n" +
                        "  \"project_id\": \"%s\",\n" +
                        "  \"private_key_id\": \"%s\",\n" +
                        "  \"private_key\": \"%s\",\n" +
                        "  \"client_email\": \"%s\",\n" +
                        "  \"client_id\": \"%s\",\n" +
                        "  \"auth_uri\": \"https://accounts.google.com/o/oauth2/auth\",\n" +
                        "  \"token_uri\": \"https://oauth2.googleapis.com/token\",\n" +
                        "  \"auth_provider_x509_cert_url\": \"https://www.googleapis.com/oauth2/v1/certs\",\n" +
                        "  \"client_x509_cert_url\": \"%s\",\n" +
                        "  \"universe_domain\": \"googleapis.com\"\n" +
                        "}", projectId, privateKeyId, formattedPrivateKey, clientEmail, clientId, clientX509CertUrl);

                try (InputStream serviceAccount = new ByteArrayInputStream(jsonConfig.getBytes(StandardCharsets.UTF_8))) {
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
