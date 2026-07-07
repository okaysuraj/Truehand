package com.truehand.service;

import com.truehand.dto.AddressDTO;
import com.truehand.model.Address;
import com.truehand.model.User;
import com.truehand.repository.AddressRepository;
import com.truehand.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AddressService {

    private final AddressRepository addressRepository;
    private final UserRepository userRepository;

    public List<AddressDTO> getUserAddresses(Integer userId) {
        return addressRepository.findByUserId(userId).stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public AddressDTO addAddress(Integer userId, AddressDTO dto) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

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
                .isDefault(dto.getIsDefault() != null ? dto.getIsDefault() : false)
                .build();

        return mapToDTO(addressRepository.save(address));
    }

    public AddressDTO updateAddress(Integer userId, Integer addressId, AddressDTO dto) {
        Address address = addressRepository.findById(addressId)
                .orElseThrow(() -> new RuntimeException("Address not found"));

        if (!address.getUser().getId().equals(userId)) {
            throw new RuntimeException("Unauthorized");
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
        if (dto.getIsDefault() != null) address.setIsDefault(dto.getIsDefault());

        return mapToDTO(addressRepository.save(address));
    }

    public void deleteAddress(Integer userId, Integer addressId) {
        Address address = addressRepository.findById(addressId)
                .orElseThrow(() -> new RuntimeException("Address not found"));

        if (!address.getUser().getId().equals(userId)) {
            throw new RuntimeException("Unauthorized");
        }

        addressRepository.delete(address);
    }

    private void resetDefaultAddresses(Integer userId) {
        List<Address> addresses = addressRepository.findByUserId(userId);
        for (Address addr : addresses) {
            if (addr.getIsDefault()) {
                addr.setIsDefault(false);
                addressRepository.save(addr);
            }
        }
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
                .isDefault(address.getIsDefault())
                .build();
    }
}
