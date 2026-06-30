package com.careerport.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "opportunities")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Opportunity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    private String organization;

    @Enumerated(EnumType.STRING)
    private OpportunityType type;

    private String deadline;

    @Column(name = "apply_link", length = 500)
    private String applyLink;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "required_skills", columnDefinition = "TEXT")
    private String requiredSkills;  // comma-separated: "Java,Spring Boot,SQL"

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    public enum OpportunityType {
        Internship, Scholarship, Hackathon
    }
}
