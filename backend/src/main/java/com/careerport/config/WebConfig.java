package com.careerport.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.nio.file.Paths;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Value("${file.upload-dir}")
    private String uploadDir;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Serve uploaded resume files at /uploads/resumes/**
        // NOTE for Member 3: This local serving will be replaced by S3 URLs
        String uploadPath = Paths.get(uploadDir).toAbsolutePath().toString();
        registry.addResourceHandler("/uploads/resumes/**")
                .addResourceLocations("file:" + uploadPath + "/");
    }
}
