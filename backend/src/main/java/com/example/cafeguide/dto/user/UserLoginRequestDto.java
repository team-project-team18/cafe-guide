package com.example.cafeguide.dto.user;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UserLoginRequestDto {
    @NotNull
    private String email;
    @NotNull
    @Size(min = 8, max = 100)
    private String password;
}
