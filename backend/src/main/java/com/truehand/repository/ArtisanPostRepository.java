package com.truehand.repository;

import com.truehand.model.ArtisanPost;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArtisanPostRepository extends JpaRepository<ArtisanPost, Integer> {
    List<ArtisanPost> findAllByOrderByCreatedAtDesc();
}
