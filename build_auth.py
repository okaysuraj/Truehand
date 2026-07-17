import os

auth_model = """package com.truehand.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "password_reset_tokens")
@Data
public class PasswordResetToken {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private String token;
    private LocalDateTime expiryDate;

    @PrePersist
    protected void onCreate() {
        expiryDate = LocalDateTime.now().plusHours(1); // 1 hour expiry
    }
}
"""

auth_repo = """package com.truehand.repository;

import com.truehand.model.PasswordResetToken;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Integer> {
    Optional<PasswordResetToken> findByToken(String token);
    Optional<PasswordResetToken> findByUserId(Integer userId);
}
"""

auth_controller_addon = """package com.truehand.controller;

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
"""

def write(path, content):
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

base = 'backend/src/main/java/com/truehand/'
write(base + 'model/PasswordResetToken.java', auth_model)
write(base + 'repository/PasswordResetTokenRepository.java', auth_repo)
write(base + 'controller/PasswordController.java', auth_controller_addon)

print('Auth enhancement backend created.')
