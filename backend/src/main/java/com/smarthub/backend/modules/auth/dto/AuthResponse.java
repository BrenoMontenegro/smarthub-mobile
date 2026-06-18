package com.smarthub.backend.modules.auth.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AuthResponse {
    private String token;
    private String userId;
    private String username;
    private String email;
    private int totalXp;
    private int level;
    private int streakDays;
}
