package com.careerport.controller;

import com.careerport.dto.OpportunityDto;
import com.careerport.service.OpportunityService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/opportunities")
public class OpportunityController {

    private final OpportunityService opportunityService;

    public OpportunityController(OpportunityService opportunityService) {
        this.opportunityService = opportunityService;
    }

    // GET /api/opportunities
    @GetMapping
    public ResponseEntity<List<OpportunityDto>> getAllOpportunities() {
        return ResponseEntity.ok(opportunityService.getAllOpportunities());
    }
    @GetMapping("/{id}")
    public ResponseEntity<OpportunityDto> getOpportunityById(
        @PathVariable Long id) {

    return ResponseEntity.ok(
            opportunityService.getOpportunityById(id)
    );
}
    // POST /api/opportunities
    @PostMapping
    public ResponseEntity<OpportunityDto> createOpportunity(@RequestBody OpportunityDto dto) {
        OpportunityDto created = opportunityService.createOpportunity(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    // PUT /api/opportunities/{id}
    @PutMapping("/{id}")
    public ResponseEntity<OpportunityDto> updateOpportunity(@PathVariable Long id,
                                                             @RequestBody OpportunityDto dto) {
        return ResponseEntity.ok(opportunityService.updateOpportunity(id, dto));
    }
}
