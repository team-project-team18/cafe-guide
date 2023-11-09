package com.example.cafeguide.dto.comment;

import java.time.LocalDateTime;
import lombok.Data;

@Data
public class CommentDto {
    private Long id;
    private Long cafeId;
    private String userName;
    private String userImage;
    private String content;
    private LocalDateTime dateTime;
}
