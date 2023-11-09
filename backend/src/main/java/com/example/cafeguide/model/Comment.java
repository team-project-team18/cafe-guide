package com.example.cafeguide.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

@Getter
@Setter
@Entity
@SQLDelete(sql = "UPDATE comments SET is_deleted = true WHERE id = ?")
@Where(clause = "is_deleted = false")
@Table(name = "comments")
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "cafe_id", nullable = false)
    private Cafe cafe;
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    @Column(nullable = false)
    private String content;
    @Column(name = "date_time", nullable = false)
    private LocalDateTime dateTime;
    @Column(name = "is_deleted", nullable = false)
    private boolean isDeleted;
}
