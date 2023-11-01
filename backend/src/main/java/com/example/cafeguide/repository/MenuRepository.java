package com.example.cafeguide.repository;

import com.example.cafeguide.model.Menu;
import java.util.Optional;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MenuRepository extends JpaRepository<Menu, Long> {
    @EntityGraph(attributePaths = "menuItems")
    Optional<Menu> findById(Long id);
}
