package com.careerport.dto;

import lombok.Data;

import java.util.List;

@Data
public class ProfileDto {
    private String fullName;
    private String department;
    private String year;
    private Double cgpa;
    private List<String> skills;
    private List<String> interests;
    private String resumeUrl;
}
