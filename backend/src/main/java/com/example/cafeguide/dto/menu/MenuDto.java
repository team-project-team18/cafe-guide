package com.example.cafeguide.dto.menu;

import com.example.cafeguide.dto.menuitem.MenuItemDto;
import java.util.Set;
import lombok.Data;

@Data
public class MenuDto {
    private Long id;
    private Long cafeId;
    private Set<MenuItemDto> menuItems;
}
