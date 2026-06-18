package com.smarthub.backend.modules.challenge.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity
@Table(name = "challenges")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Challenge {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(columnDefinition = "uuid", updatable = false, nullable = false)
    private UUID id;

    @Column(nullable = false, length = 100)
    private String title;

    @Column(nullable = false, length = 500)
    private String description;

    @Column(nullable = false)
    private int xp;

    @Column(nullable = false, length = 20)
    private String difficulty;

    @Column(nullable = false, length = 100)
    private String icon;

    @Column(nullable = false, length = 10)
    private String color;

    @Column(nullable = false, length = 30)
    private String type;

    @Column(name = "display_order", nullable = false)
    private int displayOrder;
}
