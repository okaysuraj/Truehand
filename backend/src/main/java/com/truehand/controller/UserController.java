package com.truehand.controller;

import com.truehand.model.User;
import com.truehand.repository.UserRepository;
import com.truehand.security.AccessPolicy;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserRepository users;
    private final AccessPolicy access;

    public record Profile(
        Integer id,
        String firstName,
        String lastName,
        String email,
        String phone,
        String bio,
        String role,
        boolean isActive,
        String status,
        LocalDateTime createdAt
    ) {}

    public record Update(String firstName, String lastName, String phone, String bio) {}

    private Profile view(User user) {
        return new Profile(
            user.getId(),
            user.getFirstName(),
            user.getLastName(),
            user.getEmail(),
            user.getPhone(),
            user.getBio(),
            user.getRole(),
            Boolean.TRUE.equals(user.getIsActive()),
            Boolean.TRUE.equals(user.getIsActive()) ? "ACTIVE" : "BLOCKED",
            user.getCreatedAt()
        );
    }

    @GetMapping("/me")
    public Profile me() {
        return view(users.findById(access.currentUser().getId()).orElseThrow());
    }

    private org.springframework.data.domain.Pageable page(
        org.springframework.data.domain.Pageable pageable
    ) {
        return PagedResponses.bounded(
            pageable,
            org.springframework.data.domain.Sort.by(
                org.springframework.data.domain.Sort.Direction.DESC,
                "createdAt",
                "id"
            )
        );
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public Object all(
        @RequestParam(defaultValue = "false") boolean paged,
        org.springframework.data.domain.Pageable pageable
    ) {
        return PagedResponses.body(users.findAll(page(pageable)).map(this::view), paged);
    }

    @GetMapping("/customers")
    @PreAuthorize("hasRole('ADMIN')")
    public Object customers(
        @RequestParam(defaultValue = "false") boolean paged,
        org.springframework.data.domain.Pageable pageable
    ) {
        return PagedResponses.body(
            users.findByRole("CUSTOMER", page(pageable)).map(this::view),
            paged
        );
    }

    @GetMapping("/{id}")
    @PreAuthorize("@accessPolicy.isOwner(#id)")
    public Profile get(@PathVariable Integer id) {
        return view(users.findById(id).orElseThrow());
    }

    @PutMapping("/{id}")
    @PreAuthorize("@accessPolicy.isOwner(#id)")
    @Transactional
    public Profile update(@PathVariable Integer id, @RequestBody Update body) {
        if (
            body.firstName() == null ||
            body.firstName().isBlank() ||
            body.firstName().length() > 100 ||
            (body.lastName() != null && body.lastName().length() > 100) ||
            (body.phone() != null && body.phone().length() > 30) ||
            (body.bio() != null && body.bio().length() > 2000)
        ) throw new IllegalArgumentException("Valid name, phone and biography are required");
        var user = users.findByIdForUpdate(id).orElseThrow();
        user.setFirstName(body.firstName().trim());
        user.setLastName(body.lastName() == null ? "" : body.lastName().trim());
        user.setPhone(body.phone());
        user.setBio(body.bio());
        user.setUpdatedAt(LocalDateTime.now());
        return view(users.save(user));
    }

    @PutMapping("/{id}/status")
    @PreAuthorize("hasRole('ADMIN')")
    @Transactional
    public Profile status(@PathVariable Integer id, @RequestBody Map<String, String> body) {
        String status = body.get("status");
        if (
            !java.util.Set.of("ACTIVE", "BLOCKED", "INACTIVE").contains(
                status == null ? "" : status
            )
        ) throw new IllegalArgumentException("Use ACTIVE or BLOCKED");
        var user = users.findByIdForUpdate(id).orElseThrow();
        if ("ADMIN".equals(user.getRole())) throw new IllegalArgumentException(
            "Administrator access must be managed through the identity provisioning process"
        );
        user.setIsActive("ACTIVE".equals(status));
        user.setUpdatedAt(LocalDateTime.now());
        return view(users.save(user));
    }
}
