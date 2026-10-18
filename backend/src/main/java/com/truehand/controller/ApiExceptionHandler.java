package com.truehand.controller;

import java.util.Map;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.server.ResponseStatusException;

@RestControllerAdvice
public class ApiExceptionHandler {

    @ExceptionHandler(ResponseStatusException.class)
    public ResponseEntity<?> status(ResponseStatusException ex) {
        return ResponseEntity.status(ex.getStatusCode()).body(
            Map.of("error", ex.getReason() == null ? "Request rejected" : ex.getReason())
        );
    }

    @ExceptionHandler({ IllegalArgumentException.class, MethodArgumentNotValidException.class })
    public ResponseEntity<?> invalid(Exception ex) {
        return ResponseEntity.badRequest().body(
            Map.of(
                "error",
                ex instanceof IllegalArgumentException && ex.getMessage() != null
                    ? ex.getMessage()
                    : "Invalid request"
            )
        );
    }

    @ExceptionHandler({
        java.util.NoSuchElementException.class,
        jakarta.persistence.EntityNotFoundException.class,
    })
    public ResponseEntity<?> missing(Exception ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
            Map.of("error", "Record not found")
        );
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<?> conflict(DataIntegrityViolationException ex) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(
            Map.of("error", "The request conflicts with existing data")
        );
    }
}
