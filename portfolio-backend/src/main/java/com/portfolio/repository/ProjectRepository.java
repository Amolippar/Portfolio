package com.portfolio.repository;

import com.portfolio.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
    List<Project> findAllByOrderByDisplayOrderAscIdAsc();
    List<Project> findByIsFeaturedTrueOrderByDisplayOrderAsc();
    List<Project> findByCategoryIgnoreCaseOrderByDisplayOrderAsc(String category);
    java.util.Optional<Project> findBySlug(String slug);
    Boolean existsBySlug(String slug);
}

