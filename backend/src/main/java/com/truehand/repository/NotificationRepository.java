package com.truehand.repository;

import com.truehand.model.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Integer> {
    List<Notification> findByUserIdOrderByCreatedAtDesc(Integer userId);
    Integer countByUserIdAndIsReadFalse(Integer userId);
}
