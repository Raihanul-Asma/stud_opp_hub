package com.careerport.dto;

import lombok.Data;

@Data
public class ApplicationStatusRequest {
    private String status;  // "Saved" | "Applied" | "Interview" | "Selected" | "Rejected"
}
