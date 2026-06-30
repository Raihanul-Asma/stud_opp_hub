package com.careerport.controller;

import com.careerport.dto.RecommendationDto;
import com.careerport.service.RecommendationService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recommendations")
public class RecommendationController {

    private final RecommendationService recommendationService;

    public RecommendationController(RecommendationService recommendationService) {
        this.recommendationService = recommendationService;
    }

    // GET /api/recommendations
    @GetMapping
    public ResponseEntity<List<RecommendationDto>> getRecommendations(HttpServletRequest request) {
        Long userId = (Long) request.getAttribute("userId");
        return ResponseEntity.ok(recommendationService.getRecommendations(userId));
    }
}
