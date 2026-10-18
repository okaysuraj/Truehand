package com.truehand.repository;

import com.truehand.model.DeliveryRoute;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DeliveryRouteRepository extends JpaRepository<DeliveryRoute, Integer> {
    List<DeliveryRoute> findByAgentId(Integer agentId);
}
