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
public class DeliveryPersonnelService {
    private final DeliveryPersonnelRepository repository;
    private final UserRepository userRepository;

    public DeliveryPersonnelDTO submitKYC(Integer userId, DeliveryPersonnelDTO dto) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        DeliveryPersonnel profile = repository.findByUserId(userId)
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
        DeliveryPersonnel profile = repository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Profile not found"));
        return mapToDTO(profile);
    }

    public DeliveryPersonnelDTO updateAvailability(Integer userId, Boolean isAvailable) {
        DeliveryPersonnel profile = repository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Profile not found"));
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
