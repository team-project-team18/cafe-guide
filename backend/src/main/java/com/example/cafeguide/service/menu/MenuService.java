package com.example.cafeguide.service.menu;

import com.example.cafeguide.dto.menu.MenuDto;
import com.example.cafeguide.dto.menuitem.MenuItemDto;
import com.example.cafeguide.dto.menuitem.MenuItemRequestDto;
import com.example.cafeguide.model.Cafe;

public interface MenuService {
    MenuDto addMenuItem(Long menuId, MenuItemRequestDto requestDto);

    MenuDto getById(Long id);

    MenuItemDto updateMenuItem(Long menuItemId, MenuItemRequestDto requestDto);

    void removeMenuItem(Long menuItemId);

    void registerMenu(Cafe cafe);
}
