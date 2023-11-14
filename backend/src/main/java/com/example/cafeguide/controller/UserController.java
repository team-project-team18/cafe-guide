package com.example.cafeguide.controller;

import com.example.cafeguide.dto.user.UserDto;
import com.example.cafeguide.service.user.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "User management", description = "Endpoints for managing users")
@RequiredArgsConstructor
@RequestMapping(value = "/users")
@RestController
@CrossOrigin(origins = {"http://ec2-3-208-10-133.compute-1.amazonaws.com", "http://localhost:3000"}, maxAge = 3600)
public class UserController {
    private final UserService userService;

    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/{userId}")
    @Operation(summary = "Get a user", description = "Get a user by id")
    public UserDto getUser(@PathVariable Long userId) {
        return userService.getUser(userId);
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping
    @Operation(summary = "Get all users", description = "Get all existing users")
    public List<UserDto> getAllUsers() {
        return userService.getAll();
    }
}
