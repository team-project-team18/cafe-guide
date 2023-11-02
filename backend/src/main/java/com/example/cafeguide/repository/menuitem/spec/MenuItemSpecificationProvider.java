package com.example.cafeguide.repository.menuitem.spec;

import com.example.cafeguide.model.MenuItem;
import com.example.cafeguide.repository.SpecificationProvider;
import java.util.Arrays;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

@Component
public class MenuItemSpecificationProvider implements SpecificationProvider<MenuItem> {
    @Override
    public String getKey() {
        return "menuItem";
    }

    @Override
    public Specification<MenuItem> getSpecification(String[] params) {
        return (root, query, criteriaBuilder)
                -> root.get("name").in(Arrays.stream(params).toArray());
    }
}
