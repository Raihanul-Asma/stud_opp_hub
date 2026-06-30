package com.careerport.controller;

import com.careerport.entity.Opportunity;
import com.careerport.entity.SavedOpportunity;
import com.careerport.entity.User;
import com.careerport.repository.OpportunityRepository;
import com.careerport.repository.SavedOpportunityRepository;
import com.careerport.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import com.careerport.dto.SavedOpportunityDto;
import java.util.stream.Collectors;

import java.util.List;

@RestController
@RequestMapping("/api/saved")
public class SavedOpportunityController {

    private final SavedOpportunityRepository savedRepository;
    private final OpportunityRepository opportunityRepository;
    private final UserRepository userRepository;

    public SavedOpportunityController(
            SavedOpportunityRepository savedRepository,
            OpportunityRepository opportunityRepository,
            UserRepository userRepository) {

        this.savedRepository = savedRepository;
        this.opportunityRepository = opportunityRepository;
        this.userRepository = userRepository;
    }

    @PostMapping("/{opportunityId}")
    public ResponseEntity<?> saveOpportunity(
            @PathVariable Long opportunityId,
            Authentication authentication) {

        User user = userRepository.findByEmail(authentication.getName()).orElseThrow();

        Opportunity opportunity =
                opportunityRepository.findById(opportunityId).orElseThrow();

        if (savedRepository.existsByUserAndOpportunity(user, opportunity)) {
            return ResponseEntity.badRequest().body("Already saved");
        }

        SavedOpportunity saved = new SavedOpportunity();
        saved.setUser(user);
        saved.setOpportunity(opportunity);

        savedRepository.save(saved);

        return ResponseEntity.ok("Opportunity saved successfully");
    }

    @GetMapping
public List<SavedOpportunityDto> getSaved(Authentication authentication) {

    User user = userRepository.findByEmail(authentication.getName()).orElseThrow();

    return savedRepository.findByUser(user)
            .stream()
            .map(saved -> new SavedOpportunityDto(
                    saved.getId(),
                    saved.getOpportunity().getId(),
                    saved.getOpportunity().getTitle(),
                    saved.getOpportunity().getOrganization(),
                    saved.getOpportunity().getDescription(),
                    saved.getOpportunity().getType().toString(),
                    saved.getOpportunity().getDeadline().toString()
            ))
            .collect(Collectors.toList());
}
    @DeleteMapping("/{opportunityId}")
    public ResponseEntity<?> removeSaved(
            @PathVariable Long opportunityId,
            Authentication authentication) {

        User user = userRepository.findByEmail(authentication.getName()).orElseThrow();

        Opportunity opportunity =
                opportunityRepository.findById(opportunityId).orElseThrow();

        savedRepository.deleteByUserAndOpportunity(user, opportunity);

        return ResponseEntity.ok("Removed from saved");
    }
}