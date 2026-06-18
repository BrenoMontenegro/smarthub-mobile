package com.smarthub.backend.modules.quiz.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity
@Table(name = "sort_code_lines")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class SortCodeLine {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(columnDefinition = "uuid")
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "question_id", nullable = false)
    private Question question;

    @Column(name = "line_text", nullable = false, length = 500)
    private String lineText;

    @Column(name = "line_order", nullable = false)
    private int lineOrder;
}
