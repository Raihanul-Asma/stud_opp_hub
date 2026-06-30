package com.careerport.service;

import com.careerport.dto.OpportunityDto;
import com.careerport.entity.Opportunity;
import com.careerport.repository.OpportunityRepository;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OpportunityService {

    private final OpportunityRepository opportunityRepository;

    public OpportunityService(OpportunityRepository opportunityRepository) {
        this.opportunityRepository = opportunityRepository;
    }

    public List<OpportunityDto> getAllOpportunities() {
        return opportunityRepository.findAll().stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }
    public OpportunityDto getOpportunityById(Long id) {

    Opportunity opp = opportunityRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Opportunity not found"));

    return toDto(opp);
}

    public OpportunityDto createOpportunity(OpportunityDto dto) {
        Opportunity opp = toEntity(dto);
        return toDto(opportunityRepository.save(opp));
    }

    public OpportunityDto updateOpportunity(Long id, OpportunityDto dto) {
        Opportunity opp = opportunityRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Opportunity not found with id: " + id));

        opp.setTitle(dto.getTitle());
        opp.setOrganization(dto.getOrganization());
        if (dto.getType() != null) opp.setType(Opportunity.OpportunityType.valueOf(dto.getType()));
        opp.setDeadline(dto.getDeadline());
        opp.setApplyLink(dto.getApplyLink());
        opp.setDescription(dto.getDescription());
        opp.setRequiredSkills(dto.getRequiredSkills() != null
                ? String.join(",", dto.getRequiredSkills()) : "");

        return toDto(opportunityRepository.save(opp));
    }

    private Opportunity toEntity(OpportunityDto dto) {
        Opportunity opp = new Opportunity();
        opp.setTitle(dto.getTitle());
        opp.setOrganization(dto.getOrganization());
        if (dto.getType() != null) opp.setType(Opportunity.OpportunityType.valueOf(dto.getType()));
        opp.setDeadline(dto.getDeadline());
        opp.setApplyLink(dto.getApplyLink());
        opp.setDescription(dto.getDescription());
        opp.setRequiredSkills(dto.getRequiredSkills() != null
                ? String.join(",", dto.getRequiredSkills()) : "");
        return opp;
    }

    private OpportunityDto toDto(Opportunity opp) {
        OpportunityDto dto = new OpportunityDto();
        dto.setId(opp.getId());
        dto.setTitle(opp.getTitle());
        dto.setOrganization(opp.getOrganization());
        dto.setType(opp.getType() != null ? opp.getType().name() : null);
        dto.setDeadline(opp.getDeadline());
        dto.setApplyLink(opp.getApplyLink());
        dto.setDescription(opp.getDescription());
        dto.setRequiredSkills(splitOrEmpty(opp.getRequiredSkills()));
        return dto;
    }

    private List<String> splitOrEmpty(String value) {
        if (value == null || value.trim().isEmpty()) return List.of();
        return Arrays.stream(value.split(","))
                .map(String::trim)
                .filter(s -> !s.isEmpty())
                .collect(Collectors.toList());
    }
}
