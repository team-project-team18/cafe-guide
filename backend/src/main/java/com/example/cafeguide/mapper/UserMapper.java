package com.example.cafeguide.mapper;

import com.example.cafeguide.config.MapperConfig;
import com.example.cafeguide.dto.user.UserDto;
import com.example.cafeguide.model.User;
import org.mapstruct.Mapper;

@Mapper(config = MapperConfig.class, uses = CommentMapper.class)
public interface UserMapper {
    UserDto toDto(User user);
}
