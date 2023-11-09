package com.example.cafeguide.dto.user;

import com.example.cafeguide.dto.comment.CommentDto;
import java.util.Set;
import lombok.Data;

@Data
public class UserDto {
    private Long id;
    private String name;
    private String email;
    private String image;
    private Set<CommentDto> comments;
}
