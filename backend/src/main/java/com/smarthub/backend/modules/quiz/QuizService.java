package com.smarthub.backend.modules.quiz;

import com.smarthub.backend.modules.quiz.dto.QuestionDTO;
import com.smarthub.backend.modules.quiz.dto.QuizResultRequest;
import com.smarthub.backend.modules.quiz.model.*;
import com.smarthub.backend.modules.user.UserRepository;
import com.smarthub.backend.modules.user.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class QuizService {

    private static final Set<String> VALID_TYPES = Set.of("QUIZ", "OUTPUT", "CODE_COMPLETE", "SORT_CODE");

    private final QuestionRepository questionRepository;
    private final QuizResultRepository quizResultRepository;
    private final UserRepository userRepository;

    public List<QuestionDTO> getQuestions(String type, String language, String difficulty) {
        String normalizedType = type != null ? type.toUpperCase() : null;
        String normalizedLang = language != null ? language.toUpperCase() : null;
        String normalizedDiff = difficulty != null ? difficulty.toUpperCase() : null;

        if (normalizedType != null && !VALID_TYPES.contains(normalizedType)) {
            throw new IllegalArgumentException("Tipo inválido: " + type + ". Use: QUIZ, OUTPUT, CODE_COMPLETE, SORT_CODE");
        }

        return questionRepository.findByFilters(normalizedType, normalizedLang, normalizedDiff)
            .stream()
            .map(this::toDTO)
            .collect(Collectors.toList());
    }

    public QuizResult saveResult(QuizResultRequest request, String email) {
        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Usuário não encontrado."));

        int xpEarned = calculateXp(request.getScore(), request.getTotalQuestions());

        QuizResult result = QuizResult.builder()
            .user(user)
            .challengeType(request.getChallengeType().toUpperCase())
            .score(request.getScore())
            .totalQuestions(request.getTotalQuestions())
            .xpEarned(xpEarned)
            .build();

        user.setTotalXp(user.getTotalXp() + xpEarned);
        user.setLevel(calculateLevel(user.getTotalXp()));
        userRepository.save(user);

        return quizResultRepository.save(result);
    }

    public List<QuizResult> getUserResults(String email) {
        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Usuário não encontrado."));

        return quizResultRepository.findByUserIdOrderByCompletedAtDesc(user.getId());
    }

    private static final int XP_PER_CORRECT_ANSWER = 35;

    private int calculateXp(int score, int total) {
        return score * XP_PER_CORRECT_ANSWER;
    }

    private int calculateLevel(int totalXp) {
        return (int) Math.sqrt((double) totalXp / 100) + 1;
    }

    private String resolveType(Question q) {
        if (q instanceof QuizQuestion) return "QUIZ";
        if (q instanceof OutputQuestion) return "OUTPUT";
        if (q instanceof CodeCompleteQuestion) return "CODE_COMPLETE";
        if (q instanceof SortCodeQuestion) return "SORT_CODE";
        return "UNKNOWN";
    }

    private QuestionDTO toDTO(Question q) {
        List<String> optionTexts = q.getOptions().stream()
            .map(QuestionOption::getOptionText)
            .collect(Collectors.toList());

        List<QuestionDTO.SortCodeLineDTO> lines = q.getSortCodeLines().stream()
            .map(l -> QuestionDTO.SortCodeLineDTO.builder()
                .lineText(l.getLineText())
                .lineOrder(l.getLineOrder())
                .build())
            .collect(Collectors.toList());

        return QuestionDTO.builder()
            .id(q.getId())
            .questionType(resolveType(q))
            .title(q.getTitle())
            .objective(q.getObjective())
            .code(q.getCode())
            .options(optionTexts)
            .correctAnswer(q.getCorrectAnswer())
            .explanation(q.getExplanation())
            .language(q.getLanguage() != null ? q.getLanguage().name() : null)
            .difficulty(q.getDifficulty() != null ? q.getDifficulty().name() : null)
            .sortCodeLines(lines)
            .build();
    }
}
