package com.truehand.repository;

import com.truehand.model.DeliveryRoute;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface DeliveryRouteRepository extends JpaRepository<DeliveryRoute, Integer> {
    List<DeliveryRoute> findByAgentId(Integer agentId);
}
