package com.truehand.controller;

import com.truehand.service.FulfillmentService;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/seller/fulfillments")
@RequiredArgsConstructor
public class FulfillmentController {

    private final FulfillmentService service;

    @GetMapping
    public Object list(
        @RequestParam(defaultValue = "false") boolean paged,
        org.springframework.data.domain.Pageable pageable
    ) {
        return PagedResponses.body(service.list(pageable), paged);
    }

    @GetMapping("/{id}/checks")
    public List<Map<String, Object>> checks(@PathVariable Long id) {
        return service.checks(id);
    }

    @PutMapping("/{id}/checks/{key}")
    public void check(
        @PathVariable Long id,
        @PathVariable String key,
        @RequestBody Map<String, Boolean> body
    ) {
        if (body.get("checked") == null) throw new IllegalArgumentException("checked is required");
        service.check(id, key, body.get("checked"));
    }
}
