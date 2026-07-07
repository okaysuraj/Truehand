package com.truehand.controller;

import com.truehand.dto.QuestionDTO;
import com.truehand.service.QuestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/questions")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class QuestionController {

    private final QuestionService questionService;

    @GetMapping("/product/{productId}")
    public ResponseEntity<List<QuestionDTO>> getProductQuestions(@PathVariable Integer productId) {
        return ResponseEntity.ok(questionService.getProductQuestions(productId));
    }

    @GetMapping("/seller/{sellerId}")
    public ResponseEntity<List<QuestionDTO>> getSellerQuestions(@PathVariable Integer sellerId) {
        return ResponseEntity.ok(questionService.getSellerQuestions(sellerId));
    }

    @PostMapping("/product/{productId}/user/{userId}")
    public ResponseEntity<QuestionDTO> askQuestion(
            @PathVariable Integer productId, 
            @PathVariable Integer userId, 
            @RequestBody Map<String, String> payload) {
        return ResponseEntity.ok(questionService.askQuestion(userId, productId, payload.get("content")));
    }

    @PutMapping("/{questionId}/answer/seller/{sellerId}")
    public ResponseEntity<QuestionDTO> answerQuestion(
            @PathVariable Integer questionId, 
            @PathVariable Integer sellerId, 
            @RequestBody Map<String, String> payload) {
        return ResponseEntity.ok(questionService.answerQuestion(sellerId, questionId, payload.get("answer")));
    }
}
