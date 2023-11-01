package com.example.cafeguide.controller;

import com.example.cafeguide.dto.menu.MenuDto;
import com.example.cafeguide.dto.menuitem.MenuItemDto;
import com.example.cafeguide.dto.menuitem.MenuItemRequestDto;
import com.example.cafeguide.service.menu.MenuService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "Menu management", description = "Endpoints for managing menu")
@RequiredArgsConstructor
@RequestMapping(value = "/menu")
@RestController
public class MenuController {
    private final MenuService menuService;

    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/{id}")
    @Operation(summary = "Get a menu", description = "Get a menu by id")
    public MenuDto getMenu(@PathVariable Long id) {
        return menuService.getById(id);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/{menuId}")
    @Operation(summary = "Get a menu", description = "Get a menu by id")
    public MenuDto addMenuItem(@PathVariable Long menuId,
                               @RequestBody @Valid MenuItemRequestDto requestDto) {
        return menuService.addMenuItem(menuId, requestDto);
    }

    @ResponseStatus(HttpStatus.OK)
    @PutMapping("/menuItem/{menuItemId}")
    @Operation(summary = "Update a menu item", description = "Update a menu item by id")
    public MenuItemDto updateMenuItemById(@PathVariable Long menuItemId,
            @RequestBody @Valid MenuItemRequestDto requestDto) {
        return menuService.updateMenuItem(menuItemId, requestDto);
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping ("/menuItem/{menuItemId}")
    @Operation(summary = "Delete a menu item", description = "Delete a menu item by id")
    void deleteMenuItemById(@PathVariable Long menuItemId) {
        menuService.removeMenuItem(menuItemId);
    }
}
