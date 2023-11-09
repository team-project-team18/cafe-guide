package com.example.cafeguide.repository.cafe.spec;

import com.example.cafeguide.model.Cafe;
import com.example.cafeguide.repository.SpecificationProvider;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

@Component
public class LessThanDistanceFromCentreSpecificationProvider
        implements SpecificationProvider<Cafe> {
    @Override
    public String getKey() {
        return "lessThanDistanceFromCentre";
    }

    @Override
    public Specification<Cafe> getSpecification(String[] params) {
        return (root, query, criteriaBuilder) -> {
            double lessThanDistanceFromCentre = Double.parseDouble(params[0]);
            return criteriaBuilder.lessThan(
                    root.get("distanceFromCentre"), lessThanDistanceFromCentre);
        };
    }
}
