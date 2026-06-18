package com.smarthub.backend.modules.quiz.model;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue("QUIZ")
public class QuizQuestion extends Question {}
