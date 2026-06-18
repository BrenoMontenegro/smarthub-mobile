package com.smarthub.backend.modules.challenge;

import com.smarthub.backend.modules.challenge.model.Challenge;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ChallengeService {

    private final ChallengeRepository challengeRepository;

    public List<Challenge> getAllChallenges() {
        return challengeRepository.findAllByOrderByDisplayOrderAsc();
    }
}
