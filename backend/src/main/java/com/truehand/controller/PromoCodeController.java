package com.truehand.controller;

import com.truehand.service.PromoService;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/promo")
@RequiredArgsConstructor
public class PromoCodeController {

    private final PromoService promos;

    @GetMapping("/validate")
    public Object validate(@RequestParam String code) {
        return promos.validate(code);
    }

    @PostMapping("/quote")
    public Object quote(@RequestBody Map<String, Object> body) {
        return promos.quote(body);
    }

    @GetMapping("/all")
    public Object list() {
        return promos.list();
    }

    @PostMapping
    public Object create(@RequestBody Map<String, Object> body) {
        return promos.create(body);
    }

    @DeleteMapping("/{id}")
    public Object deactivate(@PathVariable Integer id) {
        return promos.deactivate(id);
    }
}
