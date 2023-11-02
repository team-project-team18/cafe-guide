package com.example.cafeguide.repository.cafe.spec;

import com.example.cafeguide.model.Cafe;
import com.example.cafeguide.repository.SpecificationProvider;
import java.util.Arrays;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

@Component
public class NameSpecificationProvider implements SpecificationProvider<Cafe> {
    @Override
    public String getKey() {
        return "name";
    }

    @Override
    public Specification<Cafe> getSpecification(String[] params) {
        return (root, query, criteriaBuilder)
                -> root.get("name").in(Arrays.stream(params).toArray());
    }
}
