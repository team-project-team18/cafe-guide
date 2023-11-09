package com.example.cafeguide.repository;

import com.example.cafeguide.dto.cafe.CafeSearchParametersDto;
import org.springframework.data.jpa.domain.Specification;

public interface SpecificationBuilder<T> {
    Specification<T> build(CafeSearchParametersDto searchParameters);
}
