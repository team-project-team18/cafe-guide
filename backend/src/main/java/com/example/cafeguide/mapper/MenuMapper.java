package com.example.cafeguide.mapper;

import com.example.cafeguide.config.MapperConfig;
import com.example.cafeguide.dto.menu.MenuDto;
import com.example.cafeguide.model.Menu;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

@Mapper(config = MapperConfig.class, uses = MenuItemMapper.class)
public interface MenuMapper {
    @Mappings({
            @Mapping(target = "cafeId", source = "cafe.id"),
            @Mapping(target = "menuItems", source = "menuItems")
    })
    MenuDto toDto(Menu menu);
}
