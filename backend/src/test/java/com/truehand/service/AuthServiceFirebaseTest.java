package com.truehand.service;

import com.google.firebase.auth.FirebaseToken;
import com.truehand.dto.FirebaseLoginRequest;
import com.truehand.dto.LoginResponse;
import com.truehand.model.User;
import com.truehand.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

class AuthServiceFirebaseTest {

    @Test
    void firebaseLoginShouldCreateUserAndReturnToken() {
        UserRepository userRepository = mock(UserRepository.class);
        PasswordEncoder passwordEncoder = mock(PasswordEncoder.class);
        FirebaseAuthService firebaseAuthService = mock(FirebaseAuthService.class);
        AuthService authService = new AuthService(userRepository, passwordEncoder, firebaseAuthService);

        FirebaseToken firebaseToken = mock(FirebaseToken.class);
        when(firebaseAuthService.verifyToken("firebase-id-token")).thenReturn(firebaseToken);
        when(firebaseToken.getUid()).thenReturn("firebase-uid");
        when(firebaseToken.getEmail()).thenReturn("jane@example.com");
        when(firebaseToken.getName()).thenReturn("Jane Doe");
        when(userRepository.findByFirebaseUid("firebase-uid")).thenReturn(Optional.empty());
        when(userRepository.findByEmail("jane@example.com")).thenReturn(Optional.empty());
        when(userRepository.save(any(User.class))).thenAnswer(invocation -> invocation.getArgument(0));

        LoginResponse response = authService.firebaseLogin(new FirebaseLoginRequest("firebase-id-token", "CUSTOMER"));

        assertEquals("firebase-id-token", response.getToken());
        assertEquals("jane@example.com", response.getEmail());
        assertEquals("CUSTOMER", response.getRole());
        verify(userRepository).save(any(User.class));
    }
}
