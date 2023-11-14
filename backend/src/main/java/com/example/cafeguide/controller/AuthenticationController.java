package com.example.cafeguide.controller;

import com.example.cafeguide.dto.user.UserDto;
import com.example.cafeguide.dto.user.UserLoginRequestDto;
import com.example.cafeguide.dto.user.UserLoginResponseDto;
import com.example.cafeguide.dto.user.UserRegisterRequestDto;
import com.example.cafeguide.exception.RegistrationException;
import com.example.cafeguide.security.AuthenticationService;
import com.example.cafeguide.service.user.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@Tag(name = "Authentication management", description = "Endpoints for managing authentication")
@RequestMapping(value = "/auth")
@RestController
@CrossOrigin(origins = {"http://ec2-3-208-10-133.compute-1.amazonaws.com", "http://localhost:3000"}, maxAge = 3600)
public class AuthenticationController {
    private final UserService userService;
    private final AuthenticationService authenticationService;

    @PostMapping("/login")
    @Operation(summary = "Log in", description = "Log into the account")
    public UserLoginResponseDto login(@RequestBody @Valid UserLoginRequestDto request) {
        return authenticationService.authenticate(request);
    }

    @PostMapping("/register")
    @Operation(summary = "Register", description = "Register a new user")
    public UserDto register(@RequestBody @Valid UserRegisterRequestDto request)
            throws RegistrationException {
        return userService.register(request);
    }
}
