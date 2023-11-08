package com.example.cafeguide.dto.comment;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CommentRequestDto {
    private Long cafeId;
    @NotNull
    private String content;
}
