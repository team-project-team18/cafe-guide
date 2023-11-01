package com.example.cafeguide.controller;

import com.example.cafeguide.dto.cafe.CafeDto;
import com.example.cafeguide.dto.cafe.CafeRequestDto;
import com.example.cafeguide.service.cafe.CafeService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "Cafe management", description = "Endpoints for managing cafes")
@RequiredArgsConstructor
@RequestMapping(value = "/cafes")
@RestController
public class CafeController {
    private final CafeService cafeService;

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    @Operation(summary = "Create a new cafe", description = "Create a new cafe")
    public CafeDto createCafe(@RequestBody @Valid CafeRequestDto requestDto) {
        return cafeService.save(requestDto);
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/{id}")
    @Operation(summary = "Get a cafe", description = "Get a cafe by id")
    public CafeDto getCafeById(@PathVariable Long id) {
        return cafeService.getById(id);
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping
    @Operation(summary = "Get all cafes", description = "Get all existing cafes")
    public List<CafeDto> getAllCafes() {
        return cafeService.getAll();
    }

    @ResponseStatus(HttpStatus.OK)
    @PutMapping("/{id}")
    @Operation(summary = "Update a cafe", description = "Update a cafe by id")
    public CafeDto updateCafeById(@PathVariable Long id,
                                  @RequestBody @Valid CafeRequestDto requestDto) {
        return cafeService.updateById(id, requestDto);
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a cafe", description = "Delete a cafe by id")
    public void deleteById(@PathVariable Long id) {
        cafeService.deleteById(id);
    }
}
