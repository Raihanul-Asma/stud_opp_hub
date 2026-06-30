package com.careerport.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "applications")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Application {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "opportunity_id")
    private Opportunity opportunity;

    @Column(name = "opportunity_name")
    private String opportunityName;

    @Column(name = "date_applied")
    private LocalDate dateApplied = LocalDate.now();

    @Enumerated(EnumType.STRING)
    private ApplicationStatus status = ApplicationStatus.Applied;

    public enum ApplicationStatus {
        Saved, Applied, Interview, Selected, Rejected
    }
}
