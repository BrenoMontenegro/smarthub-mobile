package com.smarthub.backend.modules.auth;

import com.smarthub.backend.modules.auth.dto.AuthResponse;
import com.smarthub.backend.modules.auth.dto.LoginRequest;
import com.smarthub.backend.modules.auth.dto.RegisterRequest;
import com.smarthub.backend.modules.user.UserRepository;
import com.smarthub.backend.modules.user.model.User;
import com.smarthub.backend.shared.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Username já está em uso.");
        }
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Email já está em uso.");
        }

        User user = User.builder()
            .username(request.getUsername())
            .email(request.getEmail())
            .passwordHash(passwordEncoder.encode(request.getPassword()))
            .totalXp(0)
            .level(1)
            .streakDays(0)
            .build();

        User saved = userRepository.save(user);
        String token = jwtUtil.generateToken(saved.getEmail(), saved.getId().toString());
        return buildResponse(saved, token);
    }

    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
            .orElseThrow(() -> new ResponseStatusException(
                HttpStatus.UNAUTHORIZED, "Credenciais inválidas."));

        if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Credenciais inválidas.");
        }

        String token = jwtUtil.generateToken(user.getEmail(), user.getId().toString());
        return buildResponse(user, token);
    }

    private AuthResponse buildResponse(User user, String token) {
        return AuthResponse.builder()
            .token(token)
            .userId(user.getId().toString())
            .username(user.getUsername())
            .email(user.getEmail())
            .totalXp(user.getTotalXp())
            .level(user.getLevel())
            .streakDays(user.getStreakDays())
            .build();
    }
}
