package com.example.cafeguide.repository.cafe;

import com.example.cafeguide.model.Cafe;
import com.example.cafeguide.repository.SpecificationProvider;
import com.example.cafeguide.repository.SpecificationProviderManager;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class CafeSpecificationProviderManager implements SpecificationProviderManager<Cafe> {
    private final List<SpecificationProvider<Cafe>> cafeSpecificationProviders;

    @Override
    public SpecificationProvider<Cafe> getSpecificationProvider(String key) {
        return cafeSpecificationProviders.stream()
                .filter(b -> b.getKey().equals(key))
                .findFirst()
                .orElseThrow(() -> new RuntimeException(
                        "Can`t find correct specification provider for key:" + key));
    }
}
