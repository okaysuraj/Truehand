package com.truehand.controller;

import com.truehand.model.PasswordResetToken;
import com.truehand.model.User;
import com.truehand.repository.PasswordResetTokenRepository;
import com.truehand.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/auth/password")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class PasswordController {
    private final UserRepository userRepository;
    private final PasswordResetTokenRepository tokenRepository;
    private final PasswordEncoder passwordEncoder;

    @PostMapping("/forgot")
    public ResponseEntity<?> forgotPassword(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        User user = userRepository.findByEmail(email).orElse(null);
        if (user == null) {
            return ResponseEntity.badRequest().body("User not found");
        }

        PasswordResetToken token = tokenRepository.findByUserId(user.getId()).orElse(new PasswordResetToken());
        token.setUser(user);
        token.setToken(UUID.randomUUID().toString());
        tokenRepository.save(token);

        // In a real app, send email here. We return it for testing.
        return ResponseEntity.ok(Map.of("message", "Token generated", "token", token.getToken()));
    }

    @PostMapping("/reset")
    public ResponseEntity<?> resetPassword(@RequestBody Map<String, String> body) {
        String tokenStr = body.get("token");
        String newPassword = body.get("password");

        PasswordResetToken token = tokenRepository.findByToken(tokenStr).orElse(null);
        if (token == null || token.getExpiryDate().isBefore(java.time.LocalDateTime.now())) {
            return ResponseEntity.badRequest().body("Invalid or expired token");
        }

        User user = token.getUser();
        user.setPasswordHash(passwordEncoder.encode(newPassword));
        userRepository.save(user);

        tokenRepository.delete(token);

        return ResponseEntity.ok(Map.of("message", "Password successfully reset"));
    }
}
