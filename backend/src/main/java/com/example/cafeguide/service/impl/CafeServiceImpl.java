package com.example.cafeguide.service.impl;

import com.example.cafeguide.dto.cafe.CafeDto;
import com.example.cafeguide.dto.cafe.CafeRequestDto;
import com.example.cafeguide.mapper.CafeMapper;
import com.example.cafeguide.model.Cafe;
import com.example.cafeguide.repository.CafeRepository;
import com.example.cafeguide.service.CafeService;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CafeServiceImpl implements CafeService {
    private final CafeRepository cafeRepository;
    private final CafeMapper cafeMapper;

    @Override
    public CafeDto save(CafeRequestDto requestDto) {
        Cafe cafe = cafeMapper.toEntity(requestDto);
        Cafe savedCafe = cafeRepository.save(cafe);
        return cafeMapper.toDto(savedCafe);
    }

    @Override
    public CafeDto getById(Long id) {
        Cafe cafeById = cafeRepository.findById(id).orElseThrow(
                () -> new RuntimeException("Could not find cafe by id: " + id)
        );
        return cafeMapper.toDto(cafeById);
    }

    @Override
    public List<CafeDto> getAll() {
        return cafeRepository.findAll().stream()
                .map(cafeMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public CafeDto updateById(Long id, CafeRequestDto requestDto) {
        Cafe cafeById = cafeRepository.findById(id).orElseThrow(
                () -> new RuntimeException("Could not find cafe by id: " + id)
        );
        Cafe cafe = cafeMapper.toEntity(requestDto);
        cafe.setId(id);
        Cafe updatedCafe = cafeRepository.save(cafe);
        return cafeMapper.toDto(updatedCafe);
    }

    @Override
    public void deleteById(Long id) {
        cafeRepository.deleteById(id);
    }
}
