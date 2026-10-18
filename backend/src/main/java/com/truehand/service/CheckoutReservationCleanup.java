package com.truehand.service;

import com.truehand.repository.OrderRepository;
import java.time.LocalDateTime;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

/** Releases stock held by expired, unpaid checkouts. */
@Component
@RequiredArgsConstructor
@Slf4j
public class CheckoutReservationCleanup {

    private final OrderRepository orders;
    private final PaymentService payments;

    @Scheduled(fixedDelayString = "${checkout.cleanup-interval-ms:60000}", initialDelay = 60000)
    public void releaseExpiredReservations() {
        for (Integer id : orders.findExpiredUnpaidIds(
            LocalDateTime.now(),
            PageRequest.of(0, 100)
        )) {
            try {
                payments.expireReservation(id);
            } catch (Exception exception) {
                log.warn(
                    "Unable to reconcile expired checkout {}; inventory remains reserved. Error type: {}",
                    id,
                    exception.getClass().getSimpleName()
                );
            }
        }
    }
}
