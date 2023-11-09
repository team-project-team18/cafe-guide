package com.example.cafeguide.service.cafe.impl;

import com.example.cafeguide.dto.cafe.CafeDto;
import com.example.cafeguide.dto.cafe.CafeRequestDto;
import com.example.cafeguide.dto.cafe.CafeSearchParametersDto;
import com.example.cafeguide.dto.menu.MenuDto;
import com.example.cafeguide.exception.EntityNotFoundException;
import com.example.cafeguide.mapper.CafeMapper;
import com.example.cafeguide.model.Cafe;
import com.example.cafeguide.model.MenuItem;
import com.example.cafeguide.repository.cafe.CafeRepository;
import com.example.cafeguide.repository.cafe.CafeSpecificationBuilder;
import com.example.cafeguide.repository.menuitem.MenuItemSpecificationBuilder;
import com.example.cafeguide.service.cafe.CafeService;
import com.example.cafeguide.service.menu.MenuService;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class CafeServiceImpl implements CafeService {
    private final MenuService menuService;
    private final CafeRepository cafeRepository;
    private final CafeMapper cafeMapper;
    private final CafeSpecificationBuilder cafeSpecificationBuilder;
    private final MenuItemSpecificationBuilder menuItemSpecificationBuilder;

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
                () -> new EntityNotFoundException("Could not find cafe by id: " + id)
        );
        return cafeMapper.toDto(cafeById);
    }

    @Override
    public CafeDto getByCafeId(String cafeId) {
        Cafe cafeByName = cafeRepository.findByCafeId(cafeId).orElseThrow(
                () -> new EntityNotFoundException("Could not find cafe by cafeId: " + cafeId)
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
                () -> new EntityNotFoundException("Could not find cafe by id: " + id)
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

    @Override
    public List<CafeDto> search(CafeSearchParametersDto searchParametersDto) {
        Specification<Cafe> cafeSpecification
                = cafeSpecificationBuilder.build(searchParametersDto);
        Specification<MenuItem> menuItemSpecification
                = menuItemSpecificationBuilder.build(searchParametersDto);
        List<MenuDto> searchedMenuDtoList = menuService.search(menuItemSpecification);
        List<Long> ids = searchedMenuDtoList.stream()
                .map(MenuDto::getCafeId)
                .collect(Collectors.toList());
        List<CafeDto> searchedCafeDtoList = cafeRepository.findAll(cafeSpecification)
                .stream()
                .map(cafeMapper::toDto)
                .toList();
        List<CafeDto> searchedCafeDtoListWithMenuItems = cafeRepository.findAllByIdIsIn(ids)
                .stream()
                .map(cafeMapper::toDto)
                .toList();
        List<CafeDto> cafeDtoList = new ArrayList<>();
        cafeDtoList.addAll(searchedCafeDtoList);
        cafeDtoList.addAll(searchedCafeDtoListWithMenuItems);
        Set<CafeDto> uniqueSet = new HashSet<>();
        List<CafeDto> result = new ArrayList<>();
        for (CafeDto cafeDto : cafeDtoList) {
            if (!uniqueSet.add(cafeDto)) {
                result.add(cafeDto);
            }
        }
        return result;
    }
}
