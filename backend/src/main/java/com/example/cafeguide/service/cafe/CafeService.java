package com.example.cafeguide.service.cafe;

import com.example.cafeguide.dto.cafe.CafeDto;
import com.example.cafeguide.dto.cafe.CafeRequestDto;
import java.util.List;

public interface CafeService {
    CafeDto save(CafeRequestDto requestDto);

    CafeDto getById(Long id);

    List<CafeDto> getAll();

    CafeDto updateById(Long id, CafeRequestDto requestDto);

    void deleteById(Long id);
}
