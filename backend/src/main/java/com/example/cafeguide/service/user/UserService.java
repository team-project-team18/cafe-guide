package com.example.cafeguide.service.user;

import com.example.cafeguide.dto.user.UserDto;
import com.example.cafeguide.dto.user.UserRegisterRequestDto;
import com.example.cafeguide.exception.RegistrationException;

public interface UserService {
    UserDto register(UserRegisterRequestDto requestDto) throws RegistrationException;
}
