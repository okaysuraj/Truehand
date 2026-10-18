package com.truehand.controller;

import com.truehand.model.Notification;
import com.truehand.repository.NotificationRepository;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationRepository notificationRepository;
    private final com.truehand.security.AccessPolicy accessPolicy;

    @GetMapping("/{id}")
    public ResponseEntity<Notification> getNotification(@PathVariable Integer id) {
        var notification = notificationRepository
            .findById(id)
            .orElseThrow(() ->
                new org.springframework.web.server.ResponseStatusException(
                    org.springframework.http.HttpStatus.NOT_FOUND,
                    "Notification not found"
                )
            );
        accessPolicy.requireOwner(notification.getUser().getId());
        return ResponseEntity.ok(notification);
    }

    @GetMapping
    public ResponseEntity<?> getUserNotifications(
        @RequestParam(required = false) Integer userId,
        @RequestParam(defaultValue = "false") boolean paged,
        org.springframework.data.domain.Pageable pageable
    ) {
        if (userId == null) userId = accessPolicy.currentUser().getId();
        accessPolicy.requireOwner(userId);
        var bounded = org.springframework.data.domain.PageRequest.of(
            pageable.getPageNumber(),
            Math.min(100, pageable.getPageSize()),
            org.springframework.data.domain.Sort.by(
                org.springframework.data.domain.Sort.Direction.DESC,
                "createdAt",
                "id"
            )
        );
        return ResponseEntity.ok(
            PagedResponses.body(notificationRepository.findByUserId(userId, bounded), paged)
        );
    }

    @GetMapping("/unread-count")
    public ResponseEntity<?> getUnreadCount(@RequestParam(required = false) Integer userId) {
        if (userId == null) userId = accessPolicy.currentUser().getId();
        accessPolicy.requireOwner(userId);
        return ResponseEntity.ok(
            Map.of("count", notificationRepository.countByUserIdAndIsReadFalse(userId))
        );
    }

    @PostMapping("/{id}/read")
    public ResponseEntity<?> markAsRead(@PathVariable Integer id) {
        Notification notif = notificationRepository
            .findById(id)
            .orElseThrow(() ->
                new org.springframework.web.server.ResponseStatusException(
                    org.springframework.http.HttpStatus.NOT_FOUND,
                    "Notification not found"
                )
            );
        accessPolicy.requireOwner(notif.getUser().getId());
        notif.setRead(true);
        return ResponseEntity.ok(notificationRepository.save(notif));
    }
}
