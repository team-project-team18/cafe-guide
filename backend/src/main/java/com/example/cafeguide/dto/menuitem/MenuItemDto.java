package com.example.cafeguide.dto.menuitem;

import java.math.BigDecimal;
import lombok.Data;

@Data
public class MenuItemDto {
    private Long id;
    private Long menuId;
    private String name;
    private BigDecimal price;
}
