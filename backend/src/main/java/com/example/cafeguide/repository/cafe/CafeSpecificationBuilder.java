package com.example.cafeguide.repository.cafe;

import com.example.cafeguide.dto.cafe.CafeSearchParametersDto;
import com.example.cafeguide.model.Cafe;
import com.example.cafeguide.repository.SpecificationBuilder;
import com.example.cafeguide.repository.SpecificationProviderManager;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class CafeSpecificationBuilder implements SpecificationBuilder<Cafe> {
    private final SpecificationProviderManager<Cafe> cafeSpecificationProviderManager;

    @Override
    public Specification<Cafe> build(CafeSearchParametersDto searchParameters) {
        Specification<Cafe> spec = Specification.where(null);
        if (searchParameters.getNames() != null && searchParameters.getNames().length > 0) {
            spec = spec.and(cafeSpecificationProviderManager
                    .getSpecificationProvider("name")
                    .getSpecification(searchParameters.getNames()));
        }
        if (searchParameters.getMoreThanDistanceFromCentre() != null) {
            String[] arrOfParameter
                    = {String.valueOf(searchParameters.getMoreThanDistanceFromCentre())};
            spec = spec.and(cafeSpecificationProviderManager
                    .getSpecificationProvider("moreThanDistanceFromCentre")
                    .getSpecification(arrOfParameter));
        }
        if (searchParameters.getLessThanDistanceFromCentre() != null) {
            String[] arrOfParameter
                    = {String.valueOf(searchParameters.getLessThanDistanceFromCentre())};
            spec = spec.and(cafeSpecificationProviderManager
                    .getSpecificationProvider("lessThanDistanceFromCentre")
                    .getSpecification(arrOfParameter));
        }
        if (searchParameters.getHasCoworking() != null) {
            String[] arrOfParameter = {String.valueOf(searchParameters.getHasCoworking())};
            spec = spec.and(cafeSpecificationProviderManager
                    .getSpecificationProvider("hasCoworking")
                    .getSpecification(arrOfParameter));
        }
        if (searchParameters.getDistricts() != null && searchParameters.getDistricts().length > 0) {
            spec = spec.and(cafeSpecificationProviderManager
                    .getSpecificationProvider("district")
                    .getSpecification(searchParameters.getDistricts()));
        }
        return spec;
    }
}
