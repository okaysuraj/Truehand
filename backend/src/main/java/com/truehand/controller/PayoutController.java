package com.truehand.controller;

import com.truehand.model.PayoutRequest;
import com.truehand.security.AccessPolicy;
import com.truehand.service.PayoutService;
import java.math.BigDecimal;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/wallet/payouts")
@RequiredArgsConstructor
public class PayoutController {

    private final PayoutService payouts;
    private final AccessPolicy access;

    public record Request(Integer bankAccountId, BigDecimal amount, String requestKey) {}

    @GetMapping
    public List<PayoutRequest> list() {
        return payouts.list(access.currentUser().getId());
    }

    @PostMapping
    public PayoutRequest request(@RequestBody Request body) {
        if (body.bankAccountId() == null) throw new IllegalArgumentException(
            "Select a verified bank account"
        );
        return payouts.request(
            access.currentUser().getId(),
            body.bankAccountId(),
            body.amount(),
            body.requestKey()
        );
    }
}
