package com.smarthub.backend.modules.quiz;

import com.smarthub.backend.modules.quiz.model.QuizResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface QuizResultRepository extends JpaRepository<QuizResult, UUID> {
    List<QuizResult> findByUserIdOrderByCompletedAtDesc(UUID userId);
}
