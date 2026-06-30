package com.careerport.controller;

import com.careerport.dto.ApplyRequest;
import com.careerport.dto.ApplicationStatusRequest;
import com.careerport.service.ApplicationService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/applications")
public class ApplicationController {

    private final ApplicationService applicationService;

    public ApplicationController(ApplicationService applicationService) {
        this.applicationService = applicationService;
    }

    // GET /api/applications
    @GetMapping
    public ResponseEntity<List<Map<String, Object>>> getApplications(HttpServletRequest request) {
        Long userId = (Long) request.getAttribute("userId");
        return ResponseEntity.ok(applicationService.getApplications(userId));
    }

    // POST /api/applications  (apply to an opportunity)
    @PostMapping
    public ResponseEntity<?> apply(@RequestBody ApplyRequest applyRequest,
                                   HttpServletRequest request) {
        Long userId = (Long) request.getAttribute("userId");
        applicationService.apply(userId, applyRequest);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(Map.of("message", "Applied successfully"));
    }

    // PUT /api/applications/{id}/status  (update application status)
    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateStatus(@PathVariable Long id,
                                          @RequestBody ApplicationStatusRequest statusRequest) {
        applicationService.updateStatus(id, statusRequest);
        return ResponseEntity.ok(Map.of("message", "Status updated successfully"));
    }
}
