package com.truehand.repository;

import com.truehand.model.FleetVehicle;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.util.List;

public interface FleetVehicleRepository extends JpaRepository<FleetVehicle, Integer> {
    Optional<FleetVehicle> findByAgentId(Integer agentId);
    List<FleetVehicle> findByStatus(String status);
}
