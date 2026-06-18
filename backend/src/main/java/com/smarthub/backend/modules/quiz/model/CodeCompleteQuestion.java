package com.smarthub.backend.modules.quiz.model;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue("CODE_COMPLETE")
public class CodeCompleteQuestion extends Question {}
