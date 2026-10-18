package com.truehand.service;

import com.truehand.repository.DeliveryRepository;
import java.time.LocalDateTime;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class DeliveryHandoverService {

    private final DeliveryRepository deliveries;
    private final NotificationDispatchService dispatches;
    private final PasswordEncoder encoder;

    public void issue(Integer orderId) {
        var delivery = deliveries.findByOrderIdForUpdate(orderId).orElseThrow();
        if (!"IN_TRANSIT".equals(delivery.getStatus())) throw new IllegalArgumentException(
            "Delivery is not in transit"
        );
        if (
            delivery.getOtpIssuedAt() != null &&
            delivery.getOtpIssuedAt().isAfter(LocalDateTime.now().minusMinutes(1))
        ) throw new IllegalArgumentException("Wait a minute before requesting another code");
        String code = String.format("%06d", new java.security.SecureRandom().nextInt(1_000_000));
        delivery.setOtpHash(encoder.encode(code));
        delivery.setOtpIssuedAt(LocalDateTime.now());
        delivery.setOtpExpiresAt(LocalDateTime.now().plusMinutes(10));
        delivery.setOtpAttempts(0);
        delivery.setOtpVerifiedAt(null);
        dispatches.handover(
            delivery.getOrder().getUser().getId(),
            orderId,
            code,
            delivery.getOtpIssuedAt(),
            delivery.getOtpExpiresAt()
        );
        deliveries.save(delivery);
    }

    // Failed attempts return normally so that the counter commits instead of rolling back.
    public boolean verify(Integer orderId, String code) {
        var delivery = deliveries.findByOrderIdForUpdate(orderId).orElseThrow();
        if (
            delivery.getOtpHash() == null ||
            delivery.getOtpExpiresAt() == null ||
            delivery.getOtpExpiresAt().isBefore(LocalDateTime.now()) ||
            (delivery.getOtpAttempts() != null && delivery.getOtpAttempts() >= 5)
        ) return false;
        delivery.setOtpAttempts(
            (delivery.getOtpAttempts() == null ? 0 : delivery.getOtpAttempts()) + 1
        );
        boolean valid =
            code != null && code.matches("\\d{6}") && encoder.matches(code, delivery.getOtpHash());
        if (valid) {
            delivery.setOtpHash(null);
            delivery.setOtpVerifiedAt(LocalDateTime.now());
        }
        deliveries.save(delivery);
        return valid;
    }
}
