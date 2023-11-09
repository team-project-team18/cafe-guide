package com.example.cafeguide.mapper;

import com.example.cafeguide.config.MapperConfig;
import com.example.cafeguide.dto.menuitem.MenuItemDto;
import com.example.cafeguide.dto.menuitem.MenuItemRequestDto;
import com.example.cafeguide.model.Menu;
import com.example.cafeguide.model.MenuItem;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.mapstruct.Named;

@Mapper(config = MapperConfig.class)
public interface MenuItemMapper {
    @Mappings({
            @Mapping(target = "menuId", source = "menu.id")
    })
    MenuItemDto toDto(MenuItem menuItem);

    @Mappings({
            @Mapping(target = "menu", source = "menuId", qualifiedByName = "menuFromId")
    })
    MenuItem toEntity(MenuItemRequestDto requestDto);

    @Named("menuFromId")
    default Menu menuFromId(Long id) {
        Menu menu = new Menu();
        menu.setId(id);
        return menu;
    }
}
