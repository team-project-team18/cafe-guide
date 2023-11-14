package com.example.cafeguide.controller;

import com.example.cafeguide.dto.news.NewsDto;
import com.example.cafeguide.service.news.NewsService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import java.util.Random;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
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
@CrossOrigin(origins = {"http://ec2-3-208-10-133.compute-1.amazonaws.com", "http://localhost:3000"}, maxAge = 3600)
public class NewsController {
    private final NewsService newsService;

    @ResponseStatus(HttpStatus.OK)
    @GetMapping
    @Operation(summary = "Get news", description = "Get news for the day")
    public NewsDto getNews() {
        int newsSize = newsService.getAll().size();
        Random random = new Random();
        NewsDto newsDto = newsService.getById(random.nextLong(1, newsSize + 1));
        return newsDto;
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    @Operation(summary = "Create news", description = "Create news")
    public NewsDto createNews(@RequestBody @Valid NewsDto requestDto) {
        return newsService.create(requestDto);
    }
}
