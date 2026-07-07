package com.truehand.controller;

import com.truehand.dto.AddressDTO;
import com.truehand.service.AddressService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/addresses")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AddressController {

    private final AddressService addressService;

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<AddressDTO>> getUserAddresses(@PathVariable Integer userId) {
        return ResponseEntity.ok(addressService.getUserAddresses(userId));
    }

    @PostMapping("/user/{userId}")
    public ResponseEntity<AddressDTO> addAddress(@PathVariable Integer userId, @RequestBody AddressDTO dto) {
        return ResponseEntity.ok(addressService.addAddress(userId, dto));
    }

    @PutMapping("/{addressId}/user/{userId}")
    public ResponseEntity<AddressDTO> updateAddress(@PathVariable Integer userId, @PathVariable Integer addressId, @RequestBody AddressDTO dto) {
        return ResponseEntity.ok(addressService.updateAddress(userId, addressId, dto));
    }

    @DeleteMapping("/{addressId}/user/{userId}")
    public ResponseEntity<Void> deleteAddress(@PathVariable Integer userId, @PathVariable Integer addressId) {
        addressService.deleteAddress(userId, addressId);
        return ResponseEntity.ok().build();
    }
}
