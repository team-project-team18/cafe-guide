package com.example.cafeguide.dto.cafe;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import java.util.Set;
import lombok.Data;
import org.hibernate.validator.constraints.URL;

@Data
public class CafeRequestDto {
    @NotNull
    private String name;
    @NotNull
    private String cafeId;
    @NotNull
    private String description;
    @NotNull
    private String address;
    @NotNull
    @Min(0)
    private double distanceFromCentre;
    @NotNull
    @URL
    private String url;
    private Boolean hasCoworking;
    @NotNull
    private String district;
    private Set<String> images;
}
