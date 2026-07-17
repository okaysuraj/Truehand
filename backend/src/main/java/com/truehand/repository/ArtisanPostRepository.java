package com.truehand.repository;

import com.truehand.model.ArtisanPost;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ArtisanPostRepository extends JpaRepository<ArtisanPost, Integer> {
    List<ArtisanPost> findAllByOrderByCreatedAtDesc();
}
