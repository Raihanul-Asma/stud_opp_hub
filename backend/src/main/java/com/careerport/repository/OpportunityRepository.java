package com.careerport.repository;

import com.careerport.entity.Opportunity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OpportunityRepository extends JpaRepository<Opportunity, Long> {
}
