package com.careerport.controller;

import com.careerport.dto.ProfileDto;
import com.careerport.service.ProfileService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@RestController
@RequestMapping("/api/profile")
public class ProfileController {

    private final ProfileService profileService;

    public ProfileController(ProfileService profileService) {
        this.profileService = profileService;
    }

    // GET /api/profile
    @GetMapping
    public ResponseEntity<ProfileDto> getProfile(HttpServletRequest request) {
        Long userId = (Long) request.getAttribute("userId");
        return ResponseEntity.ok(profileService.getProfile(userId));
    }

    // PUT /api/profile
    @PutMapping
    public ResponseEntity<?> updateProfile(@RequestBody ProfileDto dto,
                                           HttpServletRequest request) {
        Long userId = (Long) request.getAttribute("userId");
        profileService.updateProfile(userId, dto);
        return ResponseEntity.ok(Map.of("message", "Profile updated successfully"));
    }

    // POST /api/profile/upload-resume
    @PostMapping("/upload-resume")
    public ResponseEntity<?> uploadResume(@RequestParam("resume") MultipartFile file,
                                          HttpServletRequest request) throws IOException {
        Long userId = (Long) request.getAttribute("userId");
        String url = profileService.uploadResume(userId, file);
        return ResponseEntity.ok(Map.of("url", url));
    }
}
