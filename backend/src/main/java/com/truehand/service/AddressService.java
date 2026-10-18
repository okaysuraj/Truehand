package com.truehand.service;

import com.truehand.dto.AddressDTO;
import com.truehand.model.Address;
import com.truehand.model.User;
import com.truehand.repository.AddressRepository;
import com.truehand.repository.UserRepository;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@org.springframework.transaction.annotation.Transactional
@RequiredArgsConstructor
public class AddressService {

    private final AddressRepository addressRepository;
    private final UserRepository userRepository;

    public List<AddressDTO> getUserAddresses(Integer userId) {
        return addressRepository
            .findByUserId(userId)
            .stream()
            .map(this::mapToDTO)
            .collect(Collectors.toList());
    }

    private void validateCoordinates(AddressDTO dto) {
        if (
            (dto.getLatitude() == null) != (dto.getLongitude() == null) ||
            (dto.getLatitude() != null &&
                (dto.getLatitude().abs().compareTo(new java.math.BigDecimal("90")) > 0 ||
                    dto.getLongitude().abs().compareTo(new java.math.BigDecimal("180")) > 0))
        ) throw new IllegalArgumentException("Invalid address coordinates");
        if (
            dto.getCountry() != null && !java.util.Set.of("India", "IN").contains(dto.getCountry())
        ) throw new IllegalArgumentException("Delivery is available in India only");
        if (
            dto.getPostalCode() != null && !dto.getPostalCode().matches("[1-9][0-9]{5}")
        ) throw new IllegalArgumentException("Enter a six digit Indian PIN code");
    }

    public AddressDTO addAddress(Integer userId, AddressDTO dto) {
        validateCoordinates(dto);
        if (
            dto.getStreetAddress() == null ||
            dto.getStreetAddress().isBlank() ||
            dto.getCity() == null ||
            dto.getCity().isBlank() ||
            dto.getState() == null ||
            dto.getState().isBlank() ||
            dto.getPostalCode() == null ||
            dto.getPostalCode().isBlank()
        ) throw new IllegalArgumentException("Street, city, state and postal code are required");
        User user = userRepository
            .findByIdForUpdate(userId)
            .orElseThrow(() ->
                new org.springframework.web.server.ResponseStatusException(
                    org.springframework.http.HttpStatus.NOT_FOUND,
                    "User not found"
                )
            );

        if (dto.getIsDefault() != null && dto.getIsDefault()) {
            resetDefaultAddresses(userId);
        }

        Address address = Address.builder()
            .user(user)
            .label(dto.getLabel() != null ? dto.getLabel() : "Home")
            .streetAddress(dto.getStreetAddress())
            .city(dto.getCity())
            .state(dto.getState())
            .postalCode(dto.getPostalCode())
            .country(dto.getCountry() != null ? dto.getCountry() : "India")
            .fullName(dto.getFullName())
            .phone(dto.getPhone())
            .latitude(dto.getLatitude())
            .longitude(dto.getLongitude())
            .isDefault(dto.getIsDefault() != null ? dto.getIsDefault() : false)
            .build();

        return mapToDTO(addressRepository.save(address));
    }

    public AddressDTO updateAddress(Integer userId, Integer addressId, AddressDTO dto) {
        validateCoordinates(dto);
        userRepository.findByIdForUpdate(userId).orElseThrow();
        Address address = addressRepository
            .findById(addressId)
            .orElseThrow(() ->
                new org.springframework.web.server.ResponseStatusException(
                    org.springframework.http.HttpStatus.NOT_FOUND,
                    "Address not found"
                )
            );

        if (!address.getUser().getId().equals(userId)) {
            throw new org.springframework.web.server.ResponseStatusException(
                org.springframework.http.HttpStatus.FORBIDDEN,
                "Unauthorized"
            );
        }

        if (dto.getIsDefault() != null && dto.getIsDefault()) {
            resetDefaultAddresses(userId);
        }

        if (dto.getLabel() != null) address.setLabel(dto.getLabel());
        if (dto.getStreetAddress() != null) address.setStreetAddress(dto.getStreetAddress());
        if (dto.getCity() != null) address.setCity(dto.getCity());
        if (dto.getState() != null) address.setState(dto.getState());
        if (dto.getPostalCode() != null) address.setPostalCode(dto.getPostalCode());
        if (dto.getCountry() != null) address.setCountry(dto.getCountry());
        if (dto.getFullName() != null) address.setFullName(dto.getFullName());
        if (dto.getPhone() != null) address.setPhone(dto.getPhone());
        if (dto.getLatitude() != null) {
            address.setLatitude(dto.getLatitude());
            address.setLongitude(dto.getLongitude());
        }
        if (dto.getIsDefault() != null) address.setIsDefault(dto.getIsDefault());

        return mapToDTO(addressRepository.save(address));
    }

    public void deleteAddress(Integer userId, Integer addressId) {
        Address address = addressRepository
            .findById(addressId)
            .orElseThrow(() ->
                new org.springframework.web.server.ResponseStatusException(
                    org.springframework.http.HttpStatus.NOT_FOUND,
                    "Address not found"
                )
            );

        if (!address.getUser().getId().equals(userId)) {
            throw new org.springframework.web.server.ResponseStatusException(
                org.springframework.http.HttpStatus.FORBIDDEN,
                "Unauthorized"
            );
        }

        addressRepository.delete(address);
    }

    private void resetDefaultAddresses(Integer userId) {
        List<Address> addresses = addressRepository.findByUserId(userId);
        for (Address addr : addresses) {
            if (Boolean.TRUE.equals(addr.getIsDefault())) {
                addr.setIsDefault(false);
                addressRepository.save(addr);
            }
        }
        addressRepository.flush();
    }

    private AddressDTO mapToDTO(Address address) {
        return AddressDTO.builder()
            .id(address.getId())
            .label(address.getLabel())
            .streetAddress(address.getStreetAddress())
            .city(address.getCity())
            .state(address.getState())
            .postalCode(address.getPostalCode())
            .country(address.getCountry())
            .fullName(address.getFullName())
            .phone(address.getPhone())
            .latitude(address.getLatitude())
            .longitude(address.getLongitude())
            .isDefault(address.getIsDefault())
            .build();
    }
}
