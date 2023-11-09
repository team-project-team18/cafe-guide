package com.example.cafeguide.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.math.BigDecimal;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

@Getter
@Setter
@Entity
@SQLDelete(sql = "UPDATE menu_items SET is_deleted = true WHERE id = ?")
@Where(clause = "is_deleted = false")
@Table(name = "menu_items")
public class MenuItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String name;
    @Column(nullable = false)
    private BigDecimal price;
    @ManyToOne
    @JoinColumn(name = "menu_id", nullable = false)
    private Menu menu;
    @Column(name = "is_deleted", nullable = false)
    private boolean isDeleted;
}
