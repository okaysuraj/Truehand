package com.truehand.controller;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/auth/password")
public class PasswordController {

    @PostMapping("/forgot")
    public void forgotPassword() {
        throw new ResponseStatusException(HttpStatus.GONE, "Use Firebase password reset");
    }

    @PostMapping("/reset")
    public void resetPassword() {
        throw new ResponseStatusException(HttpStatus.GONE, "Use Firebase password reset");
    }
}
