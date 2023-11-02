package com.example.cafeguide.repository.cafe.spec;

import com.example.cafeguide.model.Cafe;
import com.example.cafeguide.repository.SpecificationProvider;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

@Component
public class HasCoworkingSpecificationProvider implements SpecificationProvider<Cafe> {
    @Override
    public String getKey() {
        return "hasCoworking";
    }

    @Override
    public Specification<Cafe> getSpecification(String[] params) {
        return (root, query, criteriaBuilder) -> {
            boolean hasCoworking = Boolean.parseBoolean(params[0]);
            return criteriaBuilder.equal(root.get("hasCoworking"), hasCoworking);
        };
    }
}
