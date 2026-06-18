package com.smarthub.backend.modules.user.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UpdateUserRequest {

    @NotBlank(message = "Username é obrigatório.")
    @Size(min = 3, max = 50, message = "Username deve ter entre 3 e 50 caracteres.")
    private String username;

    @NotBlank(message = "Email é obrigatório.")
    @Email(message = "Email inválido.")
    private String email;
}
