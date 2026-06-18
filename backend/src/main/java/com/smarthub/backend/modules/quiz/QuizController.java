package com.smarthub.backend.modules.quiz;

import com.smarthub.backend.modules.quiz.dto.QuestionDTO;
import com.smarthub.backend.modules.quiz.dto.QuizResultRequest;
import com.smarthub.backend.modules.quiz.model.QuizResult;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class QuizController {

    private final QuizService quizService;

    @GetMapping("/questions")
    public ResponseEntity<List<QuestionDTO>> getQuestions(
        @RequestParam(required = false) String type,
        @RequestParam(required = false) String language,
        @RequestParam(required = false) String difficulty
    ) {
        return ResponseEntity.ok(quizService.getQuestions(type, language, difficulty));
    }

    @PostMapping("/quiz/results")
    public ResponseEntity<QuizResult> submitResult(
        @Valid @RequestBody QuizResultRequest request,
        @AuthenticationPrincipal UserDetails userDetails
    ) {
        return ResponseEntity.ok(quizService.saveResult(request, userDetails.getUsername()));
    }

    @GetMapping("/quiz/results/me")
    public ResponseEntity<List<QuizResult>> getMyResults(
        @AuthenticationPrincipal UserDetails userDetails
    ) {
        return ResponseEntity.ok(quizService.getUserResults(userDetails.getUsername()));
    }
}
