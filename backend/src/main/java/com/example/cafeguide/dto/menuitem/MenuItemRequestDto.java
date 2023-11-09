package com.example.cafeguide.dto.menuitem;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;
import lombok.Data;

@Data
public class MenuItemRequestDto {
    @NotNull
    @Min(0)
    private Long menuId;
    @NotNull
    private String name;
    @NotNull
    @Min(0)
    private BigDecimal price;
}
