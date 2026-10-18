package com.truehand.repository;

import com.truehand.model.User;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    @org.springframework.data.jpa.repository.Lock(
        jakarta.persistence.LockModeType.PESSIMISTIC_WRITE
    )
    @org.springframework.data.jpa.repository.Query("select u from User u where u.id = :id")
    Optional<User> findByIdForUpdate(
        @org.springframework.data.repository.query.Param("id") Integer id
    );

    Optional<User> findByEmail(String email);
    Optional<User> findByFirebaseUid(String firebaseUid);
    Optional<User> findByEmailVerificationToken(String emailVerificationToken);
    Optional<User> findByResetPasswordToken(String resetPasswordToken);
    boolean existsByEmail(String email);
    org.springframework.data.domain.Page<User> findByRole(
        String role,
        org.springframework.data.domain.Pageable pageable
    );
}
