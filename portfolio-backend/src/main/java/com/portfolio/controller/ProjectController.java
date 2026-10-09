package com.portfolio.controller;

import com.portfolio.dto.ApiResponse;
import com.portfolio.dto.ProjectDto;
import com.portfolio.service.ProjectService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    private final ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<ProjectDto>>> getAllProjects() {
        List<ProjectDto> list = projectService.getAllProjects();
        return ResponseEntity.ok(ApiResponse.ok(list));
    }

    @GetMapping("/featured")
    public ResponseEntity<ApiResponse<List<ProjectDto>>> getFeaturedProjects() {
        List<ProjectDto> list = projectService.getFeaturedProjects();
        return ResponseEntity.ok(ApiResponse.ok(list));
    }

    @GetMapping("/slug/{slug}")
    public ResponseEntity<ApiResponse<ProjectDto>> getProjectByExplicitSlug(@PathVariable String slug) {
        ProjectDto project = projectService.getProjectBySlug(slug);
        return ResponseEntity.ok(ApiResponse.ok(project));
    }

    @GetMapping("/{slugOrId}")
    public ResponseEntity<ApiResponse<ProjectDto>> getProjectBySlugOrId(@PathVariable String slugOrId) {
        ProjectDto project;
        try {
            Long id = Long.parseLong(slugOrId);
            try {
                project = projectService.getProjectById(id);
            } catch (Exception e) {
                // If not found by numeric ID, check if slug is numeric
                project = projectService.getProjectBySlug(slugOrId);
            }
        } catch (NumberFormatException e) {
            project = projectService.getProjectBySlug(slugOrId);
        }
        return ResponseEntity.ok(ApiResponse.ok(project));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<ProjectDto>> createProject(@Valid @RequestBody ProjectDto dto) {
        ProjectDto created = projectService.createProject(dto);
        return new ResponseEntity<>(ApiResponse.ok("Project created successfully", created), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<ProjectDto>> updateProject(@PathVariable Long id, @Valid @RequestBody ProjectDto dto) {
        ProjectDto updated = projectService.updateProject(id, dto);
        return ResponseEntity.ok(ApiResponse.ok("Project updated successfully", updated));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Void>> deleteProject(@PathVariable Long id) {
        projectService.deleteProject(id);
        return ResponseEntity.ok(ApiResponse.ok("Project deleted successfully", null));
    }
}
