package com.smarthub.backend.modules.user;

import com.smarthub.backend.modules.auth.dto.AuthResponse;
import com.smarthub.backend.modules.user.dto.ChangePasswordRequest;
import com.smarthub.backend.modules.user.dto.UpdateUserRequest;
import com.smarthub.backend.modules.user.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthResponse getProfile(String email) {
        return toResponse(findByEmail(email));
    }

    public AuthResponse updateProfile(String email, UpdateUserRequest request) {
        User user = findByEmail(email);

        if (!user.getUsername().equals(request.getUsername())
            && userRepository.existsByUsername(request.getUsername())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Username já está em uso.");
        }

        if (!user.getEmail().equals(request.getEmail())
            && userRepository.existsByEmail(request.getEmail())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Email já está em uso.");
        }

        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        return toResponse(userRepository.save(user));
    }

    public void changePassword(String email, ChangePasswordRequest request) {
        User user = findByEmail(email);

        if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPasswordHash())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Senha atual incorreta.");
        }

        user.setPasswordHash(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);
    }

    private User findByEmail(String email) {
        return userRepository.findByEmail(email)
            .orElseThrow(() -> new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Usuário não encontrado."));
    }

    private AuthResponse toResponse(User user) {
        return AuthResponse.builder()
            .userId(user.getId().toString())
            .username(user.getUsername())
            .email(user.getEmail())
            .totalXp(user.getTotalXp())
            .level(user.getLevel())
            .streakDays(user.getStreakDays())
            .build();
    }
}
