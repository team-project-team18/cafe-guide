package com.example.cafeguide.controller;

import com.example.cafeguide.dto.comment.CommentDto;
import com.example.cafeguide.dto.comment.CommentRequestDto;
import com.example.cafeguide.model.User;
import com.example.cafeguide.service.comment.CommentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "Comment management", description = "Endpoints for managing comments")
@RequiredArgsConstructor
@RequestMapping(value = "/comments")
@RestController
@CrossOrigin(origins = {"http://ec2-3-208-10-133.compute-1.amazonaws.com", "http://localhost:3000"}, maxAge = 3600)
public class CommentController {
    private final CommentService commentService;

    @PreAuthorize("hasRole('ROLE_USER')")
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    @Operation(summary = "Create a new comment", description = "Create a new comment")
    public CommentDto createComment(Authentication authentication,
                                    @RequestBody @Valid CommentRequestDto requestDto) {
        User user = (User) authentication.getPrincipal();
        return commentService.createComment(user, requestDto);
    }

    @PreAuthorize("hasRole('ROLE_USER')")
    @ResponseStatus(HttpStatus.OK)
    @PutMapping("/{id}")
    @Operation(summary = "Update a comment", description = "Update a comment by id")
    public CommentDto updateCommentById(@PathVariable Long id,
                                  @RequestBody @Valid CommentRequestDto requestDto) {
        return commentService.updateCommentById(id, requestDto);
    }

    @PreAuthorize("hasRole('ROLE_USER')")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a cafe", description = "Delete a cafe by id")
    public void deleteCommentById(@PathVariable Long id) {
        commentService.deleteCommentById(id);
    }
}
