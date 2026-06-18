package com.smarthub.backend.modules.challenge;

import com.smarthub.backend.modules.challenge.model.Challenge;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/challenges")
@RequiredArgsConstructor
public class ChallengeController {

    private final ChallengeService challengeService;

    @GetMapping
    public ResponseEntity<List<Challenge>> getChallenges() {
        return ResponseEntity.ok(challengeService.getAllChallenges());
    }
}
