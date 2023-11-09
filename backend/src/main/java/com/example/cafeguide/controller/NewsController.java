package com.example.cafeguide.controller;

import com.example.cafeguide.dto.cafe.CafeDto;
import com.example.cafeguide.dto.news.NewsDto;
import com.example.cafeguide.dto.news.NewsDtoForPage;
import com.example.cafeguide.service.cafe.CafeService;
import com.example.cafeguide.service.news.NewsService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import java.util.Random;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "News management", description = "Endpoints for managing news")
@RequiredArgsConstructor
@RequestMapping(value = "/news")
@RestController
public class NewsController {
    private final CafeService cafeService;
    private final NewsService newsService;

    @ResponseStatus(HttpStatus.OK)
    @GetMapping
    @Operation(summary = "Get news", description = "Get news for the day")
    public NewsDtoForPage getNews() {
        int newsSize = newsService.getAll().size();
        int cafeSize = cafeService.getAll().size();
        Random random = new Random();
        NewsDto newsDto = newsService.getById(random.nextLong(1, newsSize + 1));
        CafeDto cafeDto = cafeService.getById(random.nextLong(1, cafeSize + 1));
        NewsDtoForPage newsDtoForPage = new NewsDtoForPage();
        newsDtoForPage.setNews(newsDto);
        newsDtoForPage.setCafe(cafeDto);
        return newsDtoForPage;
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    @Operation(summary = "Create news", description = "Create news")
    public NewsDto createNews(@RequestBody @Valid NewsDto requestDto) {
        return newsService.create(requestDto);
    }
}
