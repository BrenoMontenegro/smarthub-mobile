package com.smarthub.backend.modules.challenge;

import com.smarthub.backend.modules.challenge.model.Challenge;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ChallengeRepository extends JpaRepository<Challenge, UUID> {
    List<Challenge> findAllByOrderByDisplayOrderAsc();
}
