package com.truehand.repository;

import com.truehand.model.PayoutRequest;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PayoutRequestRepository extends JpaRepository<PayoutRequest, Integer> {
    List<PayoutRequest> findBySellerId(Integer sellerId);
    java.util.Optional<PayoutRequest> findByRequestKey(String requestKey);

    @org.springframework.data.jpa.repository.Lock(
        jakarta.persistence.LockModeType.PESSIMISTIC_WRITE
    )
    @org.springframework.data.jpa.repository.Query("select p from PayoutRequest p where p.id = :id")
    java.util.Optional<PayoutRequest> findByIdForUpdate(
        @org.springframework.data.repository.query.Param("id") Integer id
    );
}
