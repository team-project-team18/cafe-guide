package com.example.cafeguide.service.user.impl;

import com.example.cafeguide.dto.user.UserDto;
import com.example.cafeguide.dto.user.UserRegisterRequestDto;
import com.example.cafeguide.exception.RegistrationException;
import com.example.cafeguide.mapper.UserMapper;
import com.example.cafeguide.model.Role;
import com.example.cafeguide.model.User;
import com.example.cafeguide.repository.role.RoleRepository;
import com.example.cafeguide.repository.user.UserRepository;
import com.example.cafeguide.service.user.UserService;
import java.util.HashSet;
import java.util.Set;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserMapper userMapper;

    @Override
    @Transactional
    public UserDto register(UserRegisterRequestDto requestDto)
            throws RegistrationException {
        if (userRepository.findByEmail(requestDto.getEmail()).isPresent()) {
            throw new RegistrationException("Unable to complete registration.");
        }
        User user = new User();
        user.setEmail(requestDto.getEmail());
        user.setPassword(passwordEncoder.encode(requestDto.getPassword()));
        user.setName(requestDto.getName());
        if (requestDto.getImage() != null) {
            user.setImage(requestDto.getImage());
        }
        Set<Role> roles = new HashSet<>();
        Role defaultRole = roleRepository.findByName(Role.RoleName.ROLE_USER);
        if (requestDto.getEmail().contains("admin")) {
            roles.add(roleRepository.findByName(Role.RoleName.ROLE_ADMIN));
        }
        roles.add(defaultRole);
        user.setRoles(roles);
        User savedUser = userRepository.save(user);
        return userMapper.toDto(savedUser);
    }
}
