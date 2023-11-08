package com.example.cafeguide.dto.user;

import com.example.cafeguide.validation.FieldMatch;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
@FieldMatch(firstField = "password", secondField = "repeatPassword")
public class UserRegisterRequestDto {
    @Email
    private String email;
    @NotNull
    @Size(min = 8, max = 100)
    private String password;
    @NotNull
    @Size(min = 8, max = 100)
    private String repeatPassword;
    @NotNull
    private String name;
    private String image;
}
