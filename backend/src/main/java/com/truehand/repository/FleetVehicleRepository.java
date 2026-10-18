package com.truehand.repository;

import com.truehand.model.FleetVehicle;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FleetVehicleRepository extends JpaRepository<FleetVehicle, Integer> {
    Optional<FleetVehicle> findByAgentId(Integer agentId);
    List<FleetVehicle> findByStatus(String status);
}
