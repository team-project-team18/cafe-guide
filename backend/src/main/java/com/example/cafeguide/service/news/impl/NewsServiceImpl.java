package com.example.cafeguide.service.news.impl;

import com.example.cafeguide.dto.news.NewsDto;
import com.example.cafeguide.exception.EntityNotFoundException;
import com.example.cafeguide.mapper.NewsMapper;
import com.example.cafeguide.model.News;
import com.example.cafeguide.repository.news.NewsRepository;
import com.example.cafeguide.service.news.NewsService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class NewsServiceImpl implements NewsService {
    private final NewsRepository newsRepository;
    private final NewsMapper newsMapper;

    @Override
    public NewsDto create(NewsDto dto) {
        News news = newsMapper.toEntity(dto);
        News saved = newsRepository.save(news);
        return newsMapper.toDto(saved);
    }

    @Override
    public NewsDto getById(Long id) {
        News news = newsRepository.findById(id).orElseThrow(
                () -> new EntityNotFoundException("Could not find news by id: " + id)
        );
        return newsMapper.toDto(news);
    }

    @Override
    public List<NewsDto> getAll() {
        return newsRepository.findAll()
                .stream()
                .map(newsMapper::toDto)
                .toList();
    }

    @Override
    public NewsDto updateById(Long id, NewsDto dto) {
        News news = newsRepository.findById(id).orElseThrow(
                () -> new EntityNotFoundException("Could not find news by id: " + id)
        );
        news.setDescription(dto.getDescription());
        return newsMapper.toDto(newsRepository.save(news));
    }

    @Override
    public void deleteById(Long id) {
        newsRepository.deleteById(id);
    }
}
