package com.example.cafeguide.repository;

import com.example.cafeguide.model.Cafe;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CafeRepository extends JpaRepository<Cafe, Long> {
    @EntityGraph(attributePaths = "images")
    Optional<Cafe> findById(Long id);

    @EntityGraph(attributePaths = "images")
    Optional<Cafe> findByName(String name);

    @EntityGraph(attributePaths = "images")
    List<Cafe> findAll();
}
