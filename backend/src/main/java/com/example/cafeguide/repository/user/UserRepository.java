package com.example.cafeguide.repository.user;

import com.example.cafeguide.model.User;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    @EntityGraph(attributePaths = {"roles", "comments"})
    Optional<User> findById(Long id);

    @EntityGraph(attributePaths = {"roles", "comments"})
    Optional<User> findByEmail(String email);

    @EntityGraph(attributePaths = {"roles", "comments"})
    List<User> findAll();
}
