package com.careerport.service;

import com.careerport.dto.ProfileDto;
import com.careerport.entity.Profile;
import com.careerport.entity.User;
import com.careerport.repository.ProfileRepository;
import com.careerport.repository.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ProfileService {

    private final ProfileRepository profileRepository;
    private final UserRepository userRepository;

    @Value("${file.upload-dir}")
    private String uploadDir;

    public ProfileService(ProfileRepository profileRepository, UserRepository userRepository) {
        this.profileRepository = profileRepository;
        this.userRepository = userRepository;
    }

    public ProfileDto getProfile(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Profile profile = profileRepository.findByUserId(userId).orElse(new Profile());

        ProfileDto dto = new ProfileDto();
        dto.setFullName(user.getFullName());
        dto.setDepartment(user.getDepartment());
        dto.setYear(profile.getYear());
        dto.setCgpa(profile.getCgpa());
        dto.setSkills(splitOrEmpty(profile.getSkills()));
        dto.setInterests(splitOrEmpty(profile.getInterests()));
        dto.setResumeUrl(profile.getResumeUrl());

        return dto;
    }

    public void updateProfile(Long userId, ProfileDto dto) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Update user's basic info
        if (dto.getFullName() != null) user.setFullName(dto.getFullName());
        if (dto.getDepartment() != null) user.setDepartment(dto.getDepartment());
        userRepository.save(user);

        // Update profile
        Profile profile = profileRepository.findByUserId(userId).orElse(new Profile());
        profile.setUser(user);
        profile.setYear(dto.getYear());
        profile.setCgpa(dto.getCgpa());
        profile.setSkills(dto.getSkills() != null ? String.join(",", dto.getSkills()) : "");
        profile.setInterests(dto.getInterests() != null ? String.join(",", dto.getInterests()) : "");

        profileRepository.save(profile);
    }

    public String uploadResume(Long userId, MultipartFile file) throws IOException {
        // ============================================================
        // MEMBER 3 INTEGRATION POINT:
        // Replace the local file saving below with AWS S3 upload.
        // Example: use AmazonS3Client.putObject() and return the S3 URL.
        // ============================================================
        Path uploadPath = Paths.get(uploadDir).toAbsolutePath();
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        String originalName = file.getOriginalFilename() != null
                ? file.getOriginalFilename().replaceAll("[^a-zA-Z0-9._-]", "_")
                : "resume.pdf";
        String fileName = UUID.randomUUID() + "_" + originalName;
        Path filePath = uploadPath.resolve(fileName);
        Files.copy(file.getInputStream(), filePath);

        // Local accessible URL
        String fileUrl = "/uploads/resumes/" + fileName;

        // Save URL to profile
        User user = userRepository.findById(userId).orElseThrow();
        Profile profile = profileRepository.findByUserId(userId).orElse(new Profile());
        profile.setUser(user);
        profile.setResumeUrl(fileUrl);
        profileRepository.save(profile);

        return fileUrl;
    }

    private List<String> splitOrEmpty(String value) {
        if (value == null || value.trim().isEmpty()) return List.of();
        return Arrays.stream(value.split(","))
                .map(String::trim)
                .filter(s -> !s.isEmpty())
                .collect(Collectors.toList());
    }
}
