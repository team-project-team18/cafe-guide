package com.example.cafeguide.repository.menuitem;

import com.example.cafeguide.dto.cafe.CafeSearchParametersDto;
import com.example.cafeguide.model.MenuItem;
import com.example.cafeguide.repository.SpecificationBuilder;
import com.example.cafeguide.repository.SpecificationProviderManager;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class MenuItemSpecificationBuilder implements SpecificationBuilder<MenuItem> {
    private final SpecificationProviderManager<MenuItem> menuItemSpecificationProviderManager;

    @Override
    public Specification<MenuItem> build(CafeSearchParametersDto searchParameters) {
        Specification<MenuItem> spec = Specification.where(null);
        if (searchParameters.getMenuItems() != null && searchParameters.getMenuItems().length > 0) {
            spec = spec.and(menuItemSpecificationProviderManager
                    .getSpecificationProvider("menuItem")
                    .getSpecification(searchParameters.getMenuItems()));
        }
        return spec;
    }
}
