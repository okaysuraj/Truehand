package com.truehand.controller;

import com.truehand.model.BankAccount;
import com.truehand.model.User;
import com.truehand.repository.BankAccountRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/wallet/banks")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class BankAccountController {
    private final BankAccountRepository bankAccountRepository;

    @GetMapping
    public ResponseEntity<List<BankAccount>> getBankAccounts(Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        return ResponseEntity.ok(bankAccountRepository.findByUserId(user.getId()));
    }

    @PostMapping
    public ResponseEntity<BankAccount> addBankAccount(@RequestBody BankAccount account, Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        account.setUser(user);
        
        List<BankAccount> existing = bankAccountRepository.findByUserId(user.getId());
        if (existing.isEmpty()) {
            account.setDefault(true);
        }
        
        account.setStatus("Pending Verification");
        String lastFour = account.getAccountNumber() != null && account.getAccountNumber().length() > 4 ? 
            account.getAccountNumber().substring(account.getAccountNumber().length() - 4) : "0000";
        account.setLastFour(lastFour);

        return ResponseEntity.ok(bankAccountRepository.save(account));
    }
}
