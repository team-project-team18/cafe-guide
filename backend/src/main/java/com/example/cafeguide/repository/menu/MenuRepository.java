package com.example.cafeguide.repository.menu;

import com.example.cafeguide.model.Menu;
import com.example.cafeguide.model.MenuItem;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MenuRepository extends JpaRepository<Menu, Long> {
    @EntityGraph(attributePaths = "menuItems")
    Optional<Menu> findById(Long id);

    @EntityGraph(attributePaths = "menuItems")
    List<Menu> findAll(Specification<MenuItem> menuItemSpecification);
}
