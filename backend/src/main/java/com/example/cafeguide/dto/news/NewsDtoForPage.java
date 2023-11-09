package com.example.cafeguide.dto.news;

import com.example.cafeguide.dto.cafe.CafeDto;
import lombok.Data;

@Data
public class NewsDtoForPage {
    private NewsDto news;
    private CafeDto cafe;
}
