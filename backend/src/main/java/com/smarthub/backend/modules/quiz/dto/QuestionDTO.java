package com.smarthub.backend.modules.quiz.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;
import java.util.UUID;

@Data
@Builder
public class QuestionDTO {
    private UUID id;
    private String questionType;
    private String title;
    private String objective;
    private String code;
    private List<String> options;
    private String correctAnswer;
    private String explanation;
    private String language;
    private String difficulty;
    private List<SortCodeLineDTO> sortCodeLines;

    @Data
    @Builder
    public static class SortCodeLineDTO {
        private String lineText;
        private int lineOrder;
    }
}
