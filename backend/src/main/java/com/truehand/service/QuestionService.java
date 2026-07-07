package com.truehand.service;

import com.truehand.dto.QuestionDTO;
import com.truehand.model.Product;
import com.truehand.model.Question;
import com.truehand.model.User;
import com.truehand.repository.ProductRepository;
import com.truehand.repository.QuestionRepository;
import com.truehand.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class QuestionService {
    private final QuestionRepository questionRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    public List<QuestionDTO> getProductQuestions(Integer productId) {
        return questionRepository.findByProductIdOrderByCreatedAtDesc(productId)
                .stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    public List<QuestionDTO> getSellerQuestions(Integer sellerId) {
        return questionRepository.findByProductSellerIdOrderByCreatedAtDesc(sellerId)
                .stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    public QuestionDTO askQuestion(Integer userId, Integer productId, String content) {
        User user = userRepository.findById(userId).orElseThrow();
        Product product = productRepository.findById(productId).orElseThrow();
        
        Question question = Question.builder()
                .user(user)
                .product(product)
                .content(content)
                .build();
                
        return mapToDTO(questionRepository.save(question));
    }

    public QuestionDTO answerQuestion(Integer sellerId, Integer questionId, String answer) {
        Question question = questionRepository.findById(questionId).orElseThrow();
        // verify seller owns the product
        if (!question.getProduct().getSeller().getId().equals(sellerId)) {
            throw new RuntimeException("Unauthorized");
        }
        question.setAnswer(answer);
        return mapToDTO(questionRepository.save(question));
    }

    private QuestionDTO mapToDTO(Question question) {
        return QuestionDTO.builder()
                .id(question.getId())
                .productId(question.getProduct().getId())
                .userId(question.getUser().getId())
                .userName(question.getUser().getFirstName() + " " + question.getUser().getLastName())
                .content(question.getContent())
                .answer(question.getAnswer())
                .createdAt(question.getCreatedAt())
                .build();
    }
}
