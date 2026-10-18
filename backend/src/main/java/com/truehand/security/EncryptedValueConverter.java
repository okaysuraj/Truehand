package com.truehand.security;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import javax.crypto.Cipher;
import javax.crypto.spec.GCMParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
@Converter
public class EncryptedValueConverter implements AttributeConverter<String, String> {

    private final String key;

    public EncryptedValueConverter(@Value("${data.encryption.key:}") String key) {
        this.key = key;
    }

    private SecretKeySpec secret() {
        try {
            byte[] bytes = Base64.getDecoder().decode(key);
            if (bytes.length != 32) throw new IllegalArgumentException();
            return new SecretKeySpec(bytes, "AES");
        } catch (Exception failure) {
            throw new IllegalStateException(
                "A base64 encoded 32 byte DATA_ENCRYPTION_KEY is required to store bank details"
            );
        }
    }

    @Override
    public String convertToDatabaseColumn(String value) {
        if (value == null || value.isBlank()) return value;
        try {
            byte[] nonce = new byte[12];
            new java.security.SecureRandom().nextBytes(nonce);
            Cipher cipher = Cipher.getInstance("AES/GCM/NoPadding");
            cipher.init(Cipher.ENCRYPT_MODE, secret(), new GCMParameterSpec(128, nonce));
            return (
                "enc:v1:" +
                Base64.getEncoder().encodeToString(nonce) +
                ":" +
                Base64.getEncoder().encodeToString(
                    cipher.doFinal(value.getBytes(StandardCharsets.UTF_8))
                )
            );
        } catch (Exception failure) {
            throw new IllegalStateException("Unable to encrypt financial details", failure);
        }
    }

    @Override
    public String convertToEntityAttribute(String value) {
        if (value == null || value.isBlank()) return value;
        if (!value.startsWith("enc:v1:")) return value;
        try {
            String[] parts = value.split(":");
            Cipher cipher = Cipher.getInstance("AES/GCM/NoPadding");
            cipher.init(
                Cipher.DECRYPT_MODE,
                secret(),
                new GCMParameterSpec(128, Base64.getDecoder().decode(parts[2]))
            );
            return new String(
                cipher.doFinal(Base64.getDecoder().decode(parts[3])),
                StandardCharsets.UTF_8
            );
        } catch (Exception failure) {
            throw new IllegalStateException("Unable to decrypt financial details", failure);
        }
    }

    public static String mask(String value) {
        return value == null ? null : "****" + value.substring(Math.max(0, value.length() - 4));
    }
}
