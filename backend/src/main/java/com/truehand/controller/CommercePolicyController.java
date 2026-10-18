package com.truehand.controller;

import com.truehand.service.CommercePolicyService;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class CommercePolicyController {

    private final CommercePolicyService policies;

    @GetMapping("/community/platform-status")
    public Object status() {
        return policies.platformStatus();
    }

    @GetMapping("/seller/{id}/availability")
    @org.springframework.security.access.prepost.PreAuthorize("hasAnyRole('SELLER','ADMIN')")
    public Object settings(@PathVariable int id) {
        return policies.sellerSettings(id);
    }

    @PutMapping("/seller/{id}/availability")
    @org.springframework.security.access.prepost.PreAuthorize("hasAnyRole('SELLER','ADMIN')")
    public Object settings(@PathVariable int id, @RequestBody Map<String, Object> body) {
        return policies.save(id, body);
    }
}
