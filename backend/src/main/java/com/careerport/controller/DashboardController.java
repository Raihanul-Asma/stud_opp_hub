package com.careerport.controller;

import com.careerport.dto.DashboardStatsDto;
import com.careerport.repository.ApplicationRepository;
import com.careerport.repository.OpportunityRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final OpportunityRepository opportunityRepository;
    private final ApplicationRepository applicationRepository;

    public DashboardController(
            OpportunityRepository opportunityRepository,
            ApplicationRepository applicationRepository
    ) {
        this.opportunityRepository = opportunityRepository;
        this.applicationRepository = applicationRepository;
    }

    @GetMapping("/stats")
    public DashboardStatsDto getStats() {

        long opportunities = opportunityRepository.count();

        long applications = applicationRepository.count();

        long recommendations = opportunityRepository.count();

        int profileStrength = 85;

        return new DashboardStatsDto(
                opportunities,
                applications,
                recommendations,
                profileStrength
        );
    }
}