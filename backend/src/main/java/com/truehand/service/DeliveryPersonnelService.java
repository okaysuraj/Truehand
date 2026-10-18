package com.truehand.service;

import com.truehand.dto.DeliveryPersonnelDTO;
import com.truehand.model.DeliveryPersonnel;
import com.truehand.model.User;
import com.truehand.repository.DeliveryPersonnelRepository;
import com.truehand.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@org.springframework.transaction.annotation.Transactional
public class DeliveryPersonnelService {

    private final DeliveryPersonnelRepository repository;
    private final UserRepository userRepository;

    public DeliveryPersonnelDTO submitKYC(Integer userId, DeliveryPersonnelDTO dto) {
        User user = userRepository
            .findByIdForUpdate(userId)
            .orElseThrow(() ->
                new org.springframework.web.server.ResponseStatusException(
                    org.springframework.http.HttpStatus.NOT_FOUND,
                    "User not found"
                )
            );
        if (!"DELIVERY".equals(user.getRole())) throw new IllegalArgumentException(
            "Delivery partner account required"
        );
        if (
            dto.getVehicleType() == null ||
            !java.util.Set.of("BIKE", "SCOOTER", "VAN", "CAR").contains(dto.getVehicleType()) ||
            dto.getVehicleRegistrationNumber() == null ||
            dto.getVehicleRegistrationNumber().isBlank() ||
            dto.getVehicleRegistrationNumber().length() > 100 ||
            dto.getDrivingLicenseNumber() == null ||
            dto.getDrivingLicenseNumber().isBlank() ||
            dto.getDrivingLicenseNumber().length() > 100
        ) throw new IllegalArgumentException(
            "Valid vehicle type, registration and driving license are required"
        );

        DeliveryPersonnel profile = repository
            .findByUserId(userId)
            .orElse(DeliveryPersonnel.builder().user(user).build());

        profile.setVehicleType(dto.getVehicleType());
        profile.setVehicleRegistrationNumber(dto.getVehicleRegistrationNumber());
        profile.setDrivingLicenseNumber(dto.getDrivingLicenseNumber());
        profile.setKycStatus("PENDING");
        profile.setRejectionReason(null);
        profile.setIsAvailable(false); // Initially offline

        repository.save(profile);
        return mapToDTO(profile);
    }

    public DeliveryPersonnelDTO getProfile(Integer userId) {
        DeliveryPersonnel profile = repository
            .findByUserId(userId)
            .orElseThrow(() ->
                new org.springframework.web.server.ResponseStatusException(
                    org.springframework.http.HttpStatus.NOT_FOUND,
                    "Profile not found"
                )
            );
        return mapToDTO(profile);
    }

    public DeliveryPersonnelDTO updateAvailability(Integer userId, Boolean isAvailable) {
        var user = userRepository.findByIdForUpdate(userId).orElseThrow();
        if (isAvailable == null) throw new IllegalArgumentException(
            "Availability must be a boolean"
        );
        DeliveryPersonnel profile = repository
            .findByUserId(userId)
            .orElseThrow(() ->
                new org.springframework.web.server.ResponseStatusException(
                    org.springframework.http.HttpStatus.NOT_FOUND,
                    "Profile not found"
                )
            );
        if (
            Boolean.TRUE.equals(isAvailable) &&
            (!"APPROVED".equals(profile.getKycStatus()) || !Boolean.TRUE.equals(user.getIsActive()))
        ) throw new IllegalArgumentException(
            "Only an active approved partner can become available"
        );
        profile.setIsAvailable(isAvailable);
        repository.save(profile);
        return mapToDTO(profile);
    }

    private DeliveryPersonnelDTO mapToDTO(DeliveryPersonnel profile) {
        return DeliveryPersonnelDTO.builder()
            .vehicleType(profile.getVehicleType())
            .vehicleRegistrationNumber(profile.getVehicleRegistrationNumber())
            .drivingLicenseNumber(profile.getDrivingLicenseNumber())
            .kycStatus(profile.getKycStatus())
            .rejectionReason(profile.getRejectionReason())
            .isAvailable(profile.getIsAvailable())
            .build();
    }
}
