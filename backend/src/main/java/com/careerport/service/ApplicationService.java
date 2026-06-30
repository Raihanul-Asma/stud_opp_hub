package com.careerport.service;

import com.careerport.dto.ApplyRequest;
import com.careerport.dto.ApplicationStatusRequest;
import com.careerport.entity.Application;
import com.careerport.entity.Opportunity;
import com.careerport.entity.User;
import com.careerport.repository.ApplicationRepository;
import com.careerport.repository.OpportunityRepository;
import com.careerport.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ApplicationService {

    private final ApplicationRepository applicationRepository;
    private final OpportunityRepository opportunityRepository;
    private final UserRepository userRepository;

    public ApplicationService(ApplicationRepository applicationRepository,
                               OpportunityRepository opportunityRepository,
                               UserRepository userRepository) {
        this.applicationRepository = applicationRepository;
        this.opportunityRepository = opportunityRepository;
        this.userRepository = userRepository;
    }

    public List<Map<String, Object>> getApplications(Long userId) {
        return applicationRepository.findByUserId(userId).stream()
                .map(app -> {
                    Map<String, Object> map = new HashMap<>();
                    map.put("id", app.getId());
                    map.put("opportunityName", app.getOpportunityName());
                    map.put("dateApplied", app.getDateApplied().toString());
                    map.put("status", app.getStatus().name());
                    return map;
                })
                .collect(Collectors.toList());
    }

    public void apply(Long userId, ApplyRequest request) {
        Opportunity opp = opportunityRepository.findById(request.getOpportunityId())
                .orElseThrow(() -> new RuntimeException("Opportunity not found"));

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Application application = new Application();
        application.setUser(user);
        application.setOpportunity(opp);
        application.setOpportunityName(opp.getTitle() + " @ " + opp.getOrganization());
        application.setStatus(Application.ApplicationStatus.Applied);

        applicationRepository.save(application);
    }

    public void updateStatus(Long applicationId, ApplicationStatusRequest request) {
        Application application = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new RuntimeException("Application not found with id: " + applicationId));

        try {
            application.setStatus(Application.ApplicationStatus.valueOf(request.getStatus()));
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Invalid status value: " + request.getStatus());
        }
        applicationRepository.save(application);
    }
}
