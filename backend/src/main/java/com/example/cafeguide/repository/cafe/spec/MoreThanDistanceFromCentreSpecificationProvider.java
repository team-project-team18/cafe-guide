package com.example.cafeguide.repository.cafe.spec;

import com.example.cafeguide.model.Cafe;
import com.example.cafeguide.repository.SpecificationProvider;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

@Component
public class MoreThanDistanceFromCentreSpecificationProvider
        implements SpecificationProvider<Cafe> {
    @Override
    public String getKey() {
        return "moreThanDistanceFromCentre";
    }

    @Override
    public Specification<Cafe> getSpecification(String[] params) {
        return (root, query, criteriaBuilder) -> {
            double moreThanDistanceFromCentre = Double.parseDouble(params[0]);
            return criteriaBuilder.greaterThan(
                    root.get("distanceFromCentre"), moreThanDistanceFromCentre);
        };
    }
}
