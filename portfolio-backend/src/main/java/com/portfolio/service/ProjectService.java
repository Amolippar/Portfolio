package com.portfolio.service;

import com.portfolio.dto.ProjectDto;
import com.portfolio.entity.Project;
import com.portfolio.exception.ResourceNotFoundException;
import com.portfolio.repository.ProjectRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.Normalizer;
import java.util.List;
import java.util.Locale;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@Service
public class ProjectService {

    private static final Pattern NONLATIN = Pattern.compile("[^\\w-]");
    private static final Pattern WHITESPACE = Pattern.compile("[\\s]");

    private final ProjectRepository projectRepository;

    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    @Transactional(readOnly = true)
    public List<ProjectDto> getAllProjects() {
        return projectRepository.findAllByOrderByDisplayOrderAscIdAsc()
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<ProjectDto> getFeaturedProjects() {
        return projectRepository.findByIsFeaturedTrueOrderByDisplayOrderAsc()
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public ProjectDto getProjectById(Long id) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Project", "id", id));
        return mapToDto(project);
    }

    @Transactional(readOnly = true)
    public ProjectDto getProjectBySlug(String slug) {
        Project project = projectRepository.findBySlug(slug)
                .orElseThrow(() -> new ResourceNotFoundException("Project", "slug", slug));
        return mapToDto(project);
    }

    @Transactional
    public ProjectDto createProject(ProjectDto dto) {
        String slug = dto.getSlug();
        if (slug == null || slug.isBlank()) {
            slug = toSlug(dto.getTitle());
        }

        Project project = Project.builder()
                .slug(slug)
                .title(dto.getTitle())
                .shortDescription(dto.getShortDescription())
                .fullDescription(dto.getFullDescription())
                .problemStatement(dto.getProblemStatement())
                .objective(dto.getObjective())
                .challenges(dto.getChallenges())
                .solution(dto.getSolution())
                .technologies(dto.getTechnologies())
                .frontendTechStack(dto.getFrontendTechStack())
                .backendTechStack(dto.getBackendTechStack())
                .databaseTechStack(dto.getDatabaseTechStack())
                .tools(dto.getTools())
                .responsibilities(dto.getResponsibilities())
                .architecture(dto.getArchitecture())
                .features(dto.getFeatures())
                .status(dto.getStatus() != null ? dto.getStatus() : "Completed")
                .deploymentStatus(dto.getDeploymentStatus() != null ? dto.getDeploymentStatus() :
                        (dto.getLiveDemoUrl() != null && !dto.getLiveDemoUrl().isBlank() ? "deployed" : "pending_deployment"))
                .githubUrl(dto.getGithubUrl())
                .githubFrontendUrl(dto.getGithubFrontendUrl())
                .githubBackendUrl(dto.getGithubBackendUrl())
                .liveDemoUrl(dto.getLiveDemoUrl())
                .documentationUrl(dto.getDocumentationUrl())
                .imageUrl(dto.getImageUrl())
                .category(dto.getCategory() != null ? dto.getCategory() : "Full Stack")
                .isFeatured(dto.getIsFeatured() != null ? dto.getIsFeatured() : false)
                .displayOrder(dto.getDisplayOrder() != null ? dto.getDisplayOrder() : 0)
                .build();

        return mapToDto(projectRepository.save(project));
    }

    @Transactional
    public ProjectDto updateProject(Long id, ProjectDto dto) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Project", "id", id));

        if (dto.getSlug() != null && !dto.getSlug().isBlank()) {
            project.setSlug(dto.getSlug());
        }
        project.setTitle(dto.getTitle());
        project.setShortDescription(dto.getShortDescription());
        project.setFullDescription(dto.getFullDescription());
        project.setProblemStatement(dto.getProblemStatement());

        project.setObjective(dto.getObjective());
        project.setChallenges(dto.getChallenges());
        project.setSolution(dto.getSolution());
        project.setTechnologies(dto.getTechnologies());
        project.setFrontendTechStack(dto.getFrontendTechStack());
        project.setBackendTechStack(dto.getBackendTechStack());
        project.setDatabaseTechStack(dto.getDatabaseTechStack());
        project.setTools(dto.getTools());
        project.setResponsibilities(dto.getResponsibilities());
        project.setArchitecture(dto.getArchitecture());
        project.setFeatures(dto.getFeatures());
        if (dto.getStatus() != null) project.setStatus(dto.getStatus());
        if (dto.getDeploymentStatus() != null) project.setDeploymentStatus(dto.getDeploymentStatus());
        project.setGithubUrl(dto.getGithubUrl());
        project.setGithubFrontendUrl(dto.getGithubFrontendUrl());
        project.setGithubBackendUrl(dto.getGithubBackendUrl());
        project.setLiveDemoUrl(dto.getLiveDemoUrl());
        project.setDocumentationUrl(dto.getDocumentationUrl());
        project.setImageUrl(dto.getImageUrl());
        if (dto.getCategory() != null) project.setCategory(dto.getCategory());
        if (dto.getIsFeatured() != null) project.setIsFeatured(dto.getIsFeatured());
        if (dto.getDisplayOrder() != null) project.setDisplayOrder(dto.getDisplayOrder());

        return mapToDto(projectRepository.save(project));
    }

    @Transactional
    public void deleteProject(Long id) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Project", "id", id));
        projectRepository.delete(project);
    }

    public ProjectDto mapToDto(Project project) {
        String deploymentStatus = project.getDeploymentStatus() != null ? project.getDeploymentStatus() :
                (project.getLiveDemoUrl() != null && !project.getLiveDemoUrl().isBlank() ? "deployed" : "pending_deployment");
        String detailsUrl = "/projects/" + (project.getSlug() != null ? project.getSlug() : project.getId());

        return ProjectDto.builder()
                .id(project.getId())
                .slug(project.getSlug())
                .title(project.getTitle())
                .shortDescription(project.getShortDescription())
                .fullDescription(project.getFullDescription())
                .problemStatement(project.getProblemStatement())
                .objective(project.getObjective())
                .challenges(project.getChallenges())
                .solution(project.getSolution())
                .technologies(project.getTechnologies())
                .frontendTechStack(project.getFrontendTechStack())
                .backendTechStack(project.getBackendTechStack())
                .databaseTechStack(project.getDatabaseTechStack())
                .tools(project.getTools())
                .responsibilities(project.getResponsibilities())
                .architecture(project.getArchitecture())
                .features(project.getFeatures())
                .status(project.getStatus())
                .deploymentStatus(deploymentStatus)
                .detailsUrl(detailsUrl)
                .githubUrl(project.getGithubUrl())
                .githubFrontendUrl(project.getGithubFrontendUrl())
                .githubBackendUrl(project.getGithubBackendUrl())
                .liveDemoUrl(project.getLiveDemoUrl())
                .documentationUrl(project.getDocumentationUrl())
                .imageUrl(project.getImageUrl())
                .category(project.getCategory())
                .isFeatured(project.getIsFeatured())
                .displayOrder(project.getDisplayOrder())
                .createdAt(project.getCreatedAt())
                .build();
    }

    public static String toSlug(String input) {
        if (input == null) return "";
        String nowhitespace = WHITESPACE.matcher(input).replaceAll("-");
        String normalized = Normalizer.normalize(nowhitespace, Normalizer.Form.NFD);
        String slug = NONLATIN.matcher(normalized).replaceAll("");
        return slug.toLowerCase(Locale.ENGLISH).replaceAll("-{2,}", "-").replaceAll("^-|-$", "");
    }
}
