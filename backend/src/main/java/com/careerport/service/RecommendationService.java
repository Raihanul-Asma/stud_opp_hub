package com.careerport.service;

import com.careerport.dto.RecommendationDto;
import com.careerport.entity.Opportunity;
import com.careerport.entity.Profile;
import com.careerport.repository.OpportunityRepository;
import com.careerport.repository.ProfileRepository;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class RecommendationService {

    private final OpportunityRepository opportunityRepository;
    private final ProfileRepository profileRepository;

    public RecommendationService(OpportunityRepository opportunityRepository,
                                  ProfileRepository profileRepository) {
        this.opportunityRepository = opportunityRepository;
        this.profileRepository = profileRepository;
    }

    public List<RecommendationDto> getRecommendations(Long userId) {
        // Get student skills from profile
        Profile profile = profileRepository.findByUserId(userId).orElse(null);

        Set<String> studentSkills;
        if (profile != null && profile.getSkills() != null && !profile.getSkills().isBlank()) {
            studentSkills = Arrays.stream(profile.getSkills().split(","))
                    .map(String::trim)
                    .map(String::toLowerCase)
                    .filter(s -> !s.isEmpty())
                    .collect(Collectors.toSet());
        } else {
            // If no profile/skills yet, return all opportunities with score 0
            studentSkills = Set.of();
        }

        // Calculate match scores and return sorted list
        return opportunityRepository.findAll().stream()
                .map(opp -> {
                    int score = calculateMatchScore(studentSkills, opp.getRequiredSkills());
                    return new RecommendationDto(
                            opp.getId(),
                            opp.getTitle(),
                            opp.getOrganization(),
                            opp.getType() != null ? opp.getType().name() : "Internship",
                            opp.getDeadline(),
                            opp.getApplyLink(),
                            score
                    );
                })
                .filter(r -> r.getMatchScore() > 0)  // Only show relevant recommendations
                .sorted((a, b) -> Integer.compare(b.getMatchScore(), a.getMatchScore()))
                .collect(Collectors.toList());
    }

    /**
     * Skill-based match score calculation.
     *
     * Example: Student has [Java, Spring Boot, SQL]
     *          Opportunity requires [Java, Spring Boot, AWS]
     *          Score = 2 matched / 3 required = 66%
     */
    private int calculateMatchScore(Set<String> studentSkills, String requiredSkillsStr) {
        if (requiredSkillsStr == null || requiredSkillsStr.isBlank()) return 0;
        if (studentSkills.isEmpty()) return 0;

        List<String> requiredSkills = Arrays.stream(requiredSkillsStr.split(","))
                .map(String::trim)
                .map(String::toLowerCase)
                .filter(s -> !s.isEmpty())
                .collect(Collectors.toList());

        if (requiredSkills.isEmpty()) return 0;

        long matched = requiredSkills.stream()
                .filter(studentSkills::contains)
                .count();

        return (int) Math.round((double) matched / requiredSkills.size() * 100);
    }
}
