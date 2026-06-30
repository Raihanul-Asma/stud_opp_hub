package com.careerport.dto;

import lombok.Data;

@Data
public class RegisterRequest {
    private String fullName;
    private String email;
    private String phoneNumber;
    private String department;
    private String password;
}
