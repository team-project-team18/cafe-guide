package com.example.cafeguide.service.news;

import com.example.cafeguide.dto.news.NewsDto;
import java.util.List;

public interface NewsService {
    NewsDto create(NewsDto dto);

    NewsDto getById(Long id);

    List<NewsDto> getAll();

    NewsDto updateById(Long id, NewsDto dto);

    void deleteById(Long id);
}
