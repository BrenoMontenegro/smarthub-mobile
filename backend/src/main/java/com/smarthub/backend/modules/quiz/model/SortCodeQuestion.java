package com.smarthub.backend.modules.quiz.model;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue("SORT_CODE")
public class SortCodeQuestion extends Question {}
