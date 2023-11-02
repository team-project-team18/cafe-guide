package com.example.cafeguide.service.menu.impl;

import com.example.cafeguide.dto.menu.MenuDto;
import com.example.cafeguide.dto.menuitem.MenuItemDto;
import com.example.cafeguide.dto.menuitem.MenuItemRequestDto;
import com.example.cafeguide.mapper.MenuItemMapper;
import com.example.cafeguide.mapper.MenuMapper;
import com.example.cafeguide.model.Cafe;
import com.example.cafeguide.model.Menu;
import com.example.cafeguide.model.MenuItem;
import com.example.cafeguide.repository.menu.MenuRepository;
import com.example.cafeguide.repository.menuitem.MenuItemRepository;
import com.example.cafeguide.service.menu.MenuService;
import java.util.List;
import java.util.Set;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class MenuServiceImpl implements MenuService {
    private final MenuRepository menuRepository;
    private final MenuItemRepository menuItemRepository;
    private final MenuMapper menuMapper;
    private final MenuItemMapper menuItemMapper;

    @Transactional
    @Override
    public MenuDto addMenuItem(Long menuId, MenuItemRequestDto requestDto) {
        Menu menu = getMenuById(menuId);
        MenuItem menuItem = menuItemMapper.toEntity(requestDto);
        MenuItem savedMenuItem = menuItemRepository.save(menuItem);
        Set<MenuItem> menuItems = menu.getMenuItems();
        menuItems.add(savedMenuItem);
        menu.setMenuItems(menuItems);
        return menuMapper.toDto(menu);
    }

    @Override
    public MenuDto getById(Long id) {
        return menuMapper.toDto(getMenuById(id));
    }

    @Transactional
    @Override
    public MenuItemDto updateMenuItem(Long menuItemId, MenuItemRequestDto requestDto) {
        MenuItem menuItem = menuItemRepository.findById(menuItemId).orElseThrow(
                () -> new RuntimeException("Could not find menu item by id: " + menuItemId)
        );
        menuItem.setName(requestDto.getName());
        menuItem.setPrice(requestDto.getPrice());
        MenuItem savedMenuItem = menuItemRepository.save(menuItem);
        return menuItemMapper.toDto(savedMenuItem);
    }

    @Override
    public void removeMenuItem(Long menuItemId) {
        MenuItem menuItem = menuItemRepository.findById(menuItemId).orElseThrow(
                () -> new RuntimeException("Could not find menu item by id: " + menuItemId)
        );
        menuItemRepository.delete(menuItem);
    }

    @Override
    public void registerMenu(Cafe cafe) {
        Menu menu = new Menu();
        menu.setCafe(cafe);
        menuRepository.save(menu);
    }

    private Menu getMenuById(Long id) {
        return menuRepository.findById(id).orElseThrow(
                () -> new RuntimeException("Could not find menu by id: " + id)
        );
    }

    @Override
    public List<MenuDto> search(Specification<MenuItem> specification) {
        return menuRepository.findAll(specification).stream()
                .map(menuMapper::toDto)
                .toList();
    }
}
