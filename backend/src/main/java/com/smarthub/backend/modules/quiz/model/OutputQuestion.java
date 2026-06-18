package com.smarthub.backend.modules.quiz.model;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue("OUTPUT")
public class OutputQuestion extends Question {}
