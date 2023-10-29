package com.example.cafeguide.mapper;

import com.example.cafeguide.config.MapperConfig;
import com.example.cafeguide.dto.cafe.CafeDto;
import com.example.cafeguide.dto.cafe.CafeRequestDto;
import com.example.cafeguide.model.Cafe;
import org.mapstruct.Mapper;

@Mapper(config = MapperConfig.class)
public interface CafeMapper {

    CafeDto toDto(Cafe cafe);

    Cafe toEntity(CafeRequestDto requestDto);
}
