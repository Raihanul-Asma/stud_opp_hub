package com.careerport.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SavedOpportunityDto {

    private Long id;

    private Long opportunityId;

    private String title;

    private String organization;

    private String description;

    private String type;

    private String deadline;
}