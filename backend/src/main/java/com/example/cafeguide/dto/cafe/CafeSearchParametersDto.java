package com.example.cafeguide.dto.cafe;

import lombok.Data;

@Data
public class CafeSearchParametersDto {
    private String[] names;
    private String[] menuItems;
    private Double moreThanDistanceFromCentre;
    private Double lessThanDistanceFromCentre;
    private Boolean hasCoworking;
    private String[] districts;
}
