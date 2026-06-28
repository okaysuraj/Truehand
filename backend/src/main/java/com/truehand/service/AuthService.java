package com.truehand.service;

import com.google.firebase.auth.FirebaseToken;
import com.truehand.dto.FirebaseLoginRequest;
import com.truehand.dto.LoginRequest;
import com.truehand.dto.LoginResponse;
import com.truehand.dto.RegisterRequest;
import com.truehand.model.User;
import com.truehand.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final FirebaseAuthService firebaseAuthService;

    public Map<String, String> register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        String role = request.getRole() == null ? "CUSTOMER" : request.getRole();
        User user = User.builder()
                .email(request.getEmail())
                .passwordHash(passwordEncoder.encode(UUID.randomUUID().toString()))
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .phone(request.getPhone())
                .address(request.getAddress())
                .city(request.getCity())
                .state(request.getState())
                .postalCode(request.getPostalCode())
                .role(role)
                .emailVerified(true)
                .isActive(true)
                .build();

        userRepository.save(user);
        return Map.of("message", "Please sign up in Firebase and then authenticate with the backend.");
    }

    public LoginResponse login(LoginRequest request) {
        throw new RuntimeException("Use Firebase authentication instead of the legacy email/password flow.");
    }

    public LoginResponse firebaseLogin(FirebaseLoginRequest request) {
        FirebaseToken token = firebaseAuthService.verifyToken(request.getIdToken());

        if (token.getEmail() == null || !token.isEmailVerified()) {
            throw new RuntimeException("Please verify your email before logging in.");
        }

        Optional<User> existingUser = userRepository.findByFirebaseUid(token.getUid());
        User user = existingUser.orElseGet(() -> {
            String email = token.getEmail() != null ? token.getEmail() : token.getUid() + "@firebase.local";
            String displayName = Optional.ofNullable(token.getName())
                    .filter(name -> !name.isBlank())
                    .orElseGet(() -> {
                        if (email.contains("@")) {
                            return email.substring(0, email.indexOf('@'));
                        }
                        return "User";
                    });
            String[] names = displayName.trim().split("\\s+", 2);
            User newUser = User.builder()
                    .email(email)
                    .firebaseUid(token.getUid())
                    .passwordHash(passwordEncoder.encode(UUID.randomUUID().toString()))
                    .firstName(names.length > 0 ? names[0] : "User")
                    .lastName(names.length > 1 ? names[1] : "")
                    .role(request.getRole() == null ? "CUSTOMER" : request.getRole())
                    .emailVerified(true)
                    .isActive(true)
                    .build();
            return userRepository.save(newUser);
        });

        if (user.getFirebaseUid() == null) {
            user.setFirebaseUid(token.getUid());
            userRepository.save(user);
        }

        String displayName = Optional.ofNullable(token.getName())
                .filter(name -> !name.isBlank())
                .orElseGet(() -> {
                    String email = user.getEmail();
                    if (email != null && email.contains("@")) {
                        return email.substring(0, email.indexOf('@'));
                    }
                    return "User";
                });
        String[] names = displayName.trim().split("\\s+", 2);
        if (user.getFirstName() == null || user.getFirstName().equals("Firebase") || user.getFirstName().isBlank()) {
            user.setFirstName(names.length > 0 ? names[0] : "User");
        }
        if (user.getLastName() == null || user.getLastName().equals("User") || user.getLastName().isBlank()) {
            user.setLastName(names.length > 1 ? names[1] : "");
        }
        if (!user.getEmail().equals(token.getEmail())) {
            user.setEmail(token.getEmail());
        }
        userRepository.save(user);

        if (!Boolean.TRUE.equals(user.getEmailVerified())) {
            throw new RuntimeException("Please verify your email before logging in.");
        }

        return LoginResponse.builder()
                .userId(user.getId())
                .email(user.getEmail())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .token(request.getIdToken())
                .role(user.getRole())
                .build();
    }

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }
}
