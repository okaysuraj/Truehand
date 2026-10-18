package com.truehand.controller;

import com.truehand.model.BankAccount;
import com.truehand.model.User;
import com.truehand.repository.BankAccountRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/wallet/banks")
@RequiredArgsConstructor
public class BankAccountController {

    private final BankAccountRepository bankAccountRepository;
    private final com.truehand.repository.UserRepository userRepository;

    @GetMapping
    public ResponseEntity<List<BankAccount>> getBankAccounts(Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        return ResponseEntity.ok(bankAccountRepository.findByUserId(user.getId()));
    }

    @PostMapping
    @org.springframework.transaction.annotation.Transactional
    public ResponseEntity<BankAccount> addBankAccount(
        @RequestBody BankAccount account,
        Authentication authentication
    ) {
        User user = (User) authentication.getPrincipal();
        userRepository.findByIdForUpdate(user.getId()).orElseThrow();
        if (
            account.getBankName() == null ||
            account.getBankName().isBlank() ||
            account.getAccountName() == null ||
            account.getAccountName().isBlank() ||
            account.getRoutingNumber() == null ||
            !account.getRoutingNumber().matches("[A-Z]{4}0[A-Z0-9]{6}") ||
            account.getAccountNumber() == null ||
            !account.getAccountNumber().matches("\\d{6,34}") ||
            account.getAccountType() == null ||
            account.getAccountType().isBlank()
        ) throw new IllegalArgumentException("Valid bank and account details are required");
        account.setId(null);
        account.setUser(user);
        account.setDefault(false);

        List<BankAccount> existing = bankAccountRepository.findByUserId(user.getId());
        if (existing.isEmpty()) {
            account.setDefault(true);
        }

        account.setStatus("PENDING");
        account.setEncryptedAccountNumber(account.getAccountNumber());
        account.setVerificationReference(null);
        account.setVerifiedBy(null);
        account.setVerifiedAt(null);
        String lastFour = account
            .getAccountNumber()
            .substring(account.getAccountNumber().length() - 4);
        account.setLastFour(lastFour);

        return ResponseEntity.ok(bankAccountRepository.save(account));
    }
}
