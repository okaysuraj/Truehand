package com.truehand.repository;

import com.truehand.model.Notification;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotificationRepository extends JpaRepository<Notification, Integer> {
    org.springframework.data.domain.Page<Notification> findByUserId(
        Integer userId,
        org.springframework.data.domain.Pageable pageable
    );
    Integer countByUserIdAndIsReadFalse(Integer userId);
}
