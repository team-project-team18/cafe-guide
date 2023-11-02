package com.example.cafeguide.dto.cafe;

import java.util.Set;
import lombok.Data;

@Data
public class CafeDto {
    private Long id;
    private String name;
    private String description;
    private String address;
    private double distanceFromCentre;
    private String url;
    private Boolean hasCoworking;
    private String district;
    private Set<String> images;
}
