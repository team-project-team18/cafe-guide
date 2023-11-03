package com.example.cafeguide.mapper;

import com.example.cafeguide.config.MapperConfig;
import com.example.cafeguide.dto.news.NewsDto;
import com.example.cafeguide.model.News;
import org.mapstruct.Mapper;

@Mapper(config = MapperConfig.class)
public interface NewsMapper {
    NewsDto toDto(News news);

    News toEntity(NewsDto dto);
}
