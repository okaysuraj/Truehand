package com.truehand.repository;

import com.truehand.model.PayoutRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PayoutRequestRepository extends JpaRepository<PayoutRequest, Integer> {
    List<PayoutRequest> findBySellerId(Integer sellerId);
}
