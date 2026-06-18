package com.smarthub.backend.modules.quiz;

import com.smarthub.backend.modules.quiz.model.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface QuestionRepository extends JpaRepository<Question, UUID> {

    @Query(value = """
        SELECT * FROM questions
        WHERE (:type IS NULL OR question_type = :type)
          AND (:language IS NULL OR language = :language)
          AND (:difficulty IS NULL OR difficulty = :difficulty)
        """, nativeQuery = true)
    List<Question> findByFilters(
        @Param("type") String type,
        @Param("language") String language,
        @Param("difficulty") String difficulty
    );
}
