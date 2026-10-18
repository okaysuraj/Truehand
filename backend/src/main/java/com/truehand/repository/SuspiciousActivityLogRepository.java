package com.truehand.repository;

import com.truehand.model.SuspiciousActivityLog;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SuspiciousActivityLogRepository
    extends JpaRepository<SuspiciousActivityLog, Integer>
{
    List<SuspiciousActivityLog> findByStatusOrderByCreatedAtDesc(String status);
}
