package com.example.cafeguide.service.cafe.impl;

import com.example.cafeguide.dto.cafe.CafeDto;
import com.example.cafeguide.dto.cafe.CafeRequestDto;
import com.example.cafeguide.mapper.CafeMapper;
import com.example.cafeguide.model.Cafe;
import com.example.cafeguide.repository.CafeRepository;
import com.example.cafeguide.service.cafe.CafeService;
import com.example.cafeguide.service.menu.MenuService;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class CafeServiceImpl implements CafeService {
    private final MenuService menuService;
    private final CafeRepository cafeRepository;
    private final CafeMapper cafeMapper;

    @Transactional
    @Override
    public CafeDto save(CafeRequestDto requestDto) {
        Cafe cafe = cafeMapper.toEntity(requestDto);
        Cafe savedCafe = cafeRepository.save(cafe);
        menuService.registerMenu(savedCafe);
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
    public CafeDto getByName(String name) {
        String nameWithoutLines = name.replaceAll("_", " ");
        Cafe cafeByName = cafeRepository.findByName(nameWithoutLines).orElseThrow(
                () -> new RuntimeException("Could not find cafe by name: " + name)
        );
        return cafeMapper.toDto(cafeByName);
    }

    @Override
    public List<CafeDto> getAll() {
        return cafeRepository.findAll().stream()
                .map(cafeMapper::toDto)
                .collect(Collectors.toList());
    }

    @Transactional
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
