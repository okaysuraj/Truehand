package com.truehand.repository;

import com.truehand.model.Wishlist;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WishlistRepository extends JpaRepository<Wishlist, Integer> {
    List<Wishlist> findByUserId(Integer userId);
    Optional<Wishlist> findByUserIdAndProductId(Integer userId, Integer productId);
}
