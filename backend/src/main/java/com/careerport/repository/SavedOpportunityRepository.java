package com.careerport.repository;

import com.careerport.entity.Opportunity;
import com.careerport.entity.SavedOpportunity;
import com.careerport.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SavedOpportunityRepository extends JpaRepository<SavedOpportunity, Long> {

    List<SavedOpportunity> findByUser(User user);

    Optional<SavedOpportunity> findByUserAndOpportunity(User user, Opportunity opportunity);

    boolean existsByUserAndOpportunity(User user, Opportunity opportunity);

    void deleteByUserAndOpportunity(User user, Opportunity opportunity);
}