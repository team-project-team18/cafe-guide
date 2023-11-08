package com.example.cafeguide.service.comment;

import com.example.cafeguide.dto.comment.CommentDto;
import com.example.cafeguide.dto.comment.CommentRequestDto;
import com.example.cafeguide.model.User;

public interface CommentService {
    CommentDto createComment(User user, CommentRequestDto commentRequestDto);

    CommentDto updateCommentById(Long id, CommentRequestDto commentRequestDto);

    void deleteCommentById(Long id);
}
