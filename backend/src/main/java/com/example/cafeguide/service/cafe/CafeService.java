package com.example.cafeguide.service.cafe;

import com.example.cafeguide.dto.cafe.CafeDto;
import com.example.cafeguide.dto.cafe.CafeRequestDto;
import com.example.cafeguide.dto.cafe.CafeSearchParametersDto;
import java.util.List;

public interface CafeService {
    CafeDto save(CafeRequestDto requestDto);

    CafeDto getById(Long id);

    CafeDto getByCafeId(String name);

    List<CafeDto> getAll();

    CafeDto updateById(Long id, CafeRequestDto requestDto);

    void deleteById(Long id);

    List<CafeDto> search(CafeSearchParametersDto searchParametersDto);
}
