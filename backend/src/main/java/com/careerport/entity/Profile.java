package com.careerport.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "profiles")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Profile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", unique = true)
    private User user;

    private String year;

    private Double cgpa;

    @Column(columnDefinition = "TEXT")
    private String skills;      // stored as comma-separated: "Java,React,SQL"

    @Column(columnDefinition = "TEXT")
    private String interests;   // stored as comma-separated: "AI,Cloud"

    @Column(name = "resume_url", length = 500)
    private String resumeUrl;
}
