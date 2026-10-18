package com.truehand.service;

import com.truehand.model.PayoutRequest;
import com.truehand.repository.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class PayoutService {

    private final PayoutRequestRepository payouts;
    private final UserRepository users;
    private final BankAccountRepository banks;
    private final WalletService wallets;
    private final LedgerService ledger;

    public List<PayoutRequest> list(Integer userId) {
        return payouts.findBySellerId(userId);
    }

    public PayoutRequest request(Integer userId, Integer bankId, BigDecimal amount, String key) {
        var user = users.findByIdForUpdate(userId).orElseThrow();
        if (
            !java.util.Set.of("SELLER", "DELIVERY").contains(user.getRole())
        ) throw new IllegalArgumentException(
            "Only sellers and delivery partners can request a payout"
        );
        if (
            key == null || !key.matches("[A-Za-z0-9_-]{16,100}")
        ) throw new IllegalArgumentException("A unique request key is required");
        String requestKey = userId + ":" + key;
        var existing = payouts.findByRequestKey(requestKey);
        if (existing.isPresent()) return existing.get();
        var bank = banks
            .findById(bankId)
            .orElseThrow(() -> new IllegalArgumentException("Bank account not found"));
        if (
            !bank.getUser().getId().equals(userId) || !"VERIFIED".equals(bank.getStatus())
        ) throw new IllegalArgumentException("An owned, verified bank account is required");
        wallets.applyTransaction(userId, amount, "DEBIT", "Payout reservation " + requestKey);
        ledger.transfer(
            "payout-reservation:" + requestKey,
            "Payout reservation " + requestKey,
            "WALLET:" + userId,
            "PAYOUT_CLEARING",
            amount
        );
        return payouts.save(
            PayoutRequest.builder()
                .sellerId(userId)
                .sellerName(
                    (user.getFirstName() == null ? "" : user.getFirstName()) +
                        " " +
                        (user.getLastName() == null ? "" : user.getLastName())
                )
                .amount(amount)
                .status("PENDING")
                .requestedAt(LocalDateTime.now())
                .bankAccount(bank.getBankName() + " ending " + bank.getLastFour())
                .bankAccountId(bankId)
                .requestKey(requestKey)
                .build()
        );
    }

    public PayoutRequest decide(Integer id, String action) {
        var request = payouts.findByIdForUpdate(id).orElseThrow();
        String desired = switch (action.toLowerCase(java.util.Locale.ROOT)) {
            case "approve" -> "APPROVED";
            case "reject" -> "REJECTED";
            default -> throw new IllegalArgumentException("Use approve or reject");
        };
        if (desired.equals(request.getStatus())) return request;
        if (!"PENDING".equals(request.getStatus())) throw new IllegalArgumentException(
            "Payout has already been reviewed"
        );
        if ("REJECTED".equals(desired)) {
            wallets.applyTransaction(
                request.getSellerId(),
                request.getAmount(),
                "CREDIT",
                "Rejected payout " + id
            );
            ledger.transfer(
                "payout-rejection:" + id,
                "Rejected payout " + id,
                "PAYOUT_CLEARING",
                "WALLET:" + request.getSellerId(),
                request.getAmount()
            );
        }
        // Approval is a review decision. A transfer provider must acknowledge settlement separately.
        request.setStatus(desired);
        return payouts.save(request);
    }
}
