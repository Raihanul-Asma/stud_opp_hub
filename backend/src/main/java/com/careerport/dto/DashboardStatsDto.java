package com.careerport.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class DashboardStatsDto {

    private long totalOpportunities;
    private long totalApplications;
    private long totalRecommendations;
    private int profileStrength;

}