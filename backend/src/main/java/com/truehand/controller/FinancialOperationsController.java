package com.truehand.controller;

import com.truehand.repository.BankAccountRepository;
import com.truehand.repository.PayoutRequestRepository;
import com.truehand.security.AccessPolicy;
import com.truehand.service.*;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class FinancialOperationsController {

    private final MarketplaceFeatureService features;
    private final RefundService refunds;
    private final BankAccountRepository banks;
    private final PayoutRequestRepository payouts;
    private final AccessPolicy access;
    private final LedgerService ledger;

    @GetMapping("/account/refunds")
    public Object refunds() {
        return refunds.list(false);
    }

    @PostMapping("/orders/{id}/refund-request")
    public Object request(@PathVariable Integer id, @RequestBody Map<String, Object> body) {
        return refunds.request(id, body);
    }

    @GetMapping("/admin/refunds")
    public Object allRefunds() {
        return refunds.list(true);
    }

    @PostMapping("/admin/refunds/{id}/approve")
    public Object approve(@PathVariable long id) throws com.stripe.exception.StripeException {
        return refunds.approve(id);
    }

    @PostMapping("/admin/refunds/{id}/refresh")
    public Object refresh(@PathVariable long id) throws com.stripe.exception.StripeException {
        return refunds.refresh(id);
    }

    @PostMapping("/admin/refunds/{id}/reject")
    public Object reject(@PathVariable long id, @RequestBody Map<String, Object> body) {
        return refunds.reject(id, body);
    }

    @GetMapping("/admin/bank-verifications")
    public Object bankVerification() {
        features.admin();
        return features.query(
            "select id,user_id,bank_name,account_name,last_four,routing_number,status,verification_reference,verified_at from bank_accounts order by id desc limit 200"
        );
    }

    @PostMapping("/admin/bank-verifications/{id}/details")
    @Transactional
    public org.springframework.http.ResponseEntity<?> bankDetails(@PathVariable Integer id) {
        features.admin();
        var bank = banks.findById(id).orElseThrow();
        if (bank.getEncryptedAccountNumber() == null) throw new IllegalArgumentException(
            "Ask the owner to resubmit bank details"
        );
        features.audit("VIEW_DETAILS", "BANK", id, Map.of());
        return org.springframework.http.ResponseEntity.ok()
            .header("Cache-Control", "no-store")
            .body(
                Map.of(
                    "accountNumber",
                    bank.getEncryptedAccountNumber(),
                    "accountName",
                    bank.getAccountName(),
                    "ifsc",
                    bank.getRoutingNumber(),
                    "bankName",
                    bank.getBankName()
                )
            );
    }

    @PostMapping("/admin/bank-verifications/{id}/verify")
    @Transactional
    public Object verifyBank(@PathVariable Integer id, @RequestBody Map<String, Object> body) {
        features.admin();
        var bank = banks.findById(id).orElseThrow();
        if (bank.getEncryptedAccountNumber() == null) throw new IllegalArgumentException(
            "Ask the account owner to resubmit their bank details"
        );
        bank.setVerificationReference(features.text(body, "reference", 100));
        bank.setVerifiedBy(access.currentUser().getId());
        bank.setVerifiedAt(java.time.LocalDateTime.now());
        bank.setStatus("VERIFIED");
        banks.save(bank);
        features.audit("VERIFY", "BANK", id, Map.of("reference", bank.getVerificationReference()));
        return Map.of("id", id, "status", "VERIFIED");
    }

    @PostMapping("/admin/payouts/{id}/settle")
    @Transactional
    public Object settle(@PathVariable Integer id, @RequestBody Map<String, Object> body) {
        features.admin();
        var payout = payouts.findByIdForUpdate(id).orElseThrow();
        String reference = features.text(body, "reference", 100);
        if ("PAID".equals(payout.getStatus())) {
            if (reference.equals(payout.getTransferReference())) return payout;
            throw new IllegalArgumentException("Payout has a different settlement reference");
        }
        if (!"APPROVED".equals(payout.getStatus())) throw new IllegalArgumentException(
            "Approve the payout before recording settlement"
        );
        payout.setTransferReference(reference);
        payout.setTransferReceiptUrl(features.https(features.text(body, "receiptUrl", 2000)));
        payout.setSettledAt(java.time.LocalDateTime.now());
        payout.setSettledBy(access.currentUser().getId());
        payout.setStatus("PAID");
        ledger.transfer(
            "payout-settlement:" + id,
            "Bank transfer " + reference,
            "PAYOUT_CLEARING",
            "BANK",
            payout.getAmount()
        );
        payouts.saveAndFlush(payout);
        features.audit("SETTLE", "PAYOUT", id, body);
        return payout;
    }

    @GetMapping("/admin/financial-journals")
    public Object journals() {
        features.admin();
        return features.query(
            "select j.id,j.event_key,j.description,j.created_at,sum(e.debit) as amount from financial_journals j join financial_entries e on e.journal_id=j.id group by j.id order by j.id desc limit 200"
        );
    }

    @GetMapping("/admin/revenue")
    public Object revenue() {
        features.admin();
        return features.query(
            "select j.id,j.description,j.created_at,e.credit-e.debit as amount from financial_entries e join financial_journals j on j.id=e.journal_id where e.account='COMMISSION_REVENUE' order by j.id desc limit 200"
        );
    }
}
