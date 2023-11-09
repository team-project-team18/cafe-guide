package com.example.cafeguide.repository.cafe;

import com.example.cafeguide.model.Cafe;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CafeRepository extends JpaRepository<Cafe, Long> {
    @EntityGraph(attributePaths = {"images", "comments", "comments.user", "comments.cafe"})
    Optional<Cafe> findById(Long id);

    @EntityGraph(attributePaths = {"images", "comments", "comments.user", "comments.cafe"})
    Optional<Cafe> findByCafeId(String cafeId);

    @EntityGraph(attributePaths = {"images", "comments", "comments.user", "comments.cafe"})
    List<Cafe> findAllByIdIsIn(List<Long> ids);

    @EntityGraph(attributePaths = {"images", "comments", "comments.user", "comments.cafe"})
    List<Cafe> findAll();

    @EntityGraph(attributePaths = {"images", "comments", "comments.user", "comments.cafe"})
    List<Cafe> findAll(Specification<Cafe> cafeSpecification);
}
