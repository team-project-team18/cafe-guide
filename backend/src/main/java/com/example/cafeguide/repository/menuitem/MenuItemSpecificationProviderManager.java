package com.example.cafeguide.repository.menuitem;

import com.example.cafeguide.model.MenuItem;
import com.example.cafeguide.repository.SpecificationProvider;
import com.example.cafeguide.repository.SpecificationProviderManager;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class MenuItemSpecificationProviderManager
        implements SpecificationProviderManager<MenuItem> {
    private final List<SpecificationProvider<MenuItem>> menuItemSpecificationProviders;

    @Override
    public SpecificationProvider<MenuItem> getSpecificationProvider(String key) {
        return menuItemSpecificationProviders.stream()
                .filter(b -> b.getKey().equals(key))
                .findFirst()
                .orElseThrow(() -> new RuntimeException(
                        "Can`t find correct specification provider for key:" + key));
    }
}
