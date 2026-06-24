package com.smarthub.backend.modules.quiz.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class QuizResultRequest {

    @NotBlank(message = "challengeType é obrigatório")
    private String challengeType;

    @Min(value = 0, message = "Score não pode ser negativo")
    private int score;

    @Min(value = 1, message = "totalQuestions deve ser ao menos 1")
    private int totalQuestions;

    private String difficulty;
}
