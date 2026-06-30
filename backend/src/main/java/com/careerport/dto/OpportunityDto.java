package com.careerport.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OpportunityDto {
    private Long id;
    private String title;
    private String organization;
    private String type;        // "Internship" | "Scholarship" | "Hackathon"
    private String deadline;
    private String applyLink;
    private String description;
    private List<String> requiredSkills;
}
