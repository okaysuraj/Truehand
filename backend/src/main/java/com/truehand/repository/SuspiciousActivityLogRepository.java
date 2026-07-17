package com.truehand.repository;

import com.truehand.model.SuspiciousActivityLog;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface SuspiciousActivityLogRepository extends JpaRepository<SuspiciousActivityLog, Integer> {
    List<SuspiciousActivityLog> findByStatusOrderByCreatedAtDesc(String status);
}
