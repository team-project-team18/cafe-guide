package com.example.cafeguide.service.comment.impl;

import com.example.cafeguide.dto.comment.CommentDto;
import com.example.cafeguide.dto.comment.CommentRequestDto;
import com.example.cafeguide.exception.EntityNotFoundException;
import com.example.cafeguide.mapper.CommentMapper;
import com.example.cafeguide.model.Comment;
import com.example.cafeguide.model.User;
import com.example.cafeguide.repository.comment.CommentRepository;
import com.example.cafeguide.service.comment.CommentService;
import java.time.LocalDateTime;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {
    private final CommentRepository commentRepository;
    private final CommentMapper commentMapper;

    @Override
    public CommentDto createComment(User user, CommentRequestDto commentRequestDto) {
        Comment comment = commentMapper.toEntity(commentRequestDto);
        comment.setUser(user);
        comment.setDateTime(LocalDateTime.now());
        Comment savedComment = commentRepository.save(comment);
        return commentMapper.toDto(savedComment);
    }

    @Override
    public CommentDto updateCommentById(Long id, CommentRequestDto commentRequestDto) {
        Comment comment = commentRepository.findById(id).orElseThrow(
                () -> new EntityNotFoundException("Could not find cafe by id: " + id)
        );
        comment.setContent(comment.getContent());
        Comment savedComment = commentRepository.save(comment);
        return commentMapper.toDto(savedComment);
    }

    @Override
    public void deleteCommentById(Long id) {
        commentRepository.deleteById(id);
    }
}
