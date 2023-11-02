package com.example.cafeguide.repository.cafe.spec;

import com.example.cafeguide.model.Cafe;
import com.example.cafeguide.repository.SpecificationProvider;
import java.util.Arrays;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

@Component
public class DistrictSpecificationProvider implements SpecificationProvider<Cafe> {
    @Override
    public String getKey() {
        return "district";
    }

    @Override
    public Specification<Cafe> getSpecification(String[] params) {
        return (root, query, criteriaBuilder)
                -> root.get("district").in(Arrays.stream(params).toArray());
    }
}
