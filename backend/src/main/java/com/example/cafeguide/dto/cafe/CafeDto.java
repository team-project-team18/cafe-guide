package com.example.cafeguide.dto.cafe;

import com.example.cafeguide.dto.comment.CommentDto;
import java.util.Set;
import lombok.Data;

@Data
public class CafeDto {
    private Long id;
    private String name;
    private String cafeId;
    private String description;
    private String address;
    private String addressLink;
    private double distanceFromCentre;
    private String url;
    private Boolean hasCoworking;
    private String district;
    private Set<String> images;
    private Set<CommentDto> comments;
}
