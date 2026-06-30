package com.careerport.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RecommendationDto {
    private Long id;
    private String title;
    private String organization;
    private String type;
    private String deadline;
    private String applyLink;
    private int matchScore;   // 0-100 percentage score
}
