package com.example.cafeguide.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import java.util.HashSet;
import java.util.Set;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "menu")
public class Menu {
    @Id
    private Long id;
    @OneToOne
    @MapsId
    @JoinColumn(name = "cafe_id")
    private Cafe cafe;
    @OneToMany(mappedBy = "menu")
    private Set<MenuItem> menuItems = new HashSet<>();
}
