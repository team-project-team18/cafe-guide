package com.example.cafeguide.model;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Table;
import java.util.Set;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

@Getter
@Setter
@Entity
@SQLDelete(sql = "UPDATE cafes SET is_deleted = true WHERE id = ?")
@Where(clause = "is_deleted = false")
@Table(name = "cafes")
public class Cafe {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String name;
    @Column(nullable = false)
    private String description;
    @Column(nullable = false)
    private String address;
    @Column(nullable = false, name = "distance_from_centre")
    private double distanceFromCentre;
    @Column(nullable = false)
    private String url;
    @ElementCollection
    @CollectionTable(name = "cafes_images", joinColumns = @JoinColumn(name = "cafe_id"))
    @Column(name = "image")
    private Set<String> images;
    @Column(name = "is_deleted", nullable = false)
    private boolean isDeleted;
}
