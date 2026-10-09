package com.portfolio.dto;

import jakarta.validation.constraints.NotBlank;
import java.time.LocalDateTime;

public class ProjectDto {
    private Long id;

    private String slug;

    @NotBlank(message = "Title is required")
    private String title;

    @NotBlank(message = "Short description is required")
    private String shortDescription;

    private String fullDescription;
    private String problemStatement;
    private String objective;
    private String challenges;
    private String solution;
    private String technologies;
    private String frontendTechStack;
    private String backendTechStack;
    private String databaseTechStack;
    private String tools;
    private String responsibilities;
    private String architecture;
    private String features;
    private String status;
    private String deploymentStatus;
    private String detailsUrl;
    private String githubUrl;
    private String githubFrontendUrl;
    private String githubBackendUrl;
    private String liveDemoUrl;
    private String documentationUrl;
    private String imageUrl;
    private String category;
    private Boolean isFeatured;
    private Integer displayOrder;
    private LocalDateTime createdAt;

    public ProjectDto() {}

    public ProjectDto(Long id, String slug, String title, String shortDescription, String fullDescription,
                      String problemStatement, String objective, String challenges, String solution,
                      String technologies, String frontendTechStack, String backendTechStack,
                      String databaseTechStack, String tools, String responsibilities, String architecture,
                      String features, String status, String deploymentStatus, String detailsUrl,
                      String githubUrl, String githubFrontendUrl, String githubBackendUrl,
                      String liveDemoUrl, String documentationUrl, String imageUrl,
                      String category, Boolean isFeatured, Integer displayOrder, LocalDateTime createdAt) {
        this.id = id;

        this.slug = slug;
        this.title = title;
        this.shortDescription = shortDescription;
        this.fullDescription = fullDescription;
        this.problemStatement = problemStatement;
        this.objective = objective;
        this.challenges = challenges;
        this.solution = solution;
        this.technologies = technologies;
        this.frontendTechStack = frontendTechStack;
        this.backendTechStack = backendTechStack;
        this.databaseTechStack = databaseTechStack;
        this.tools = tools;
        this.responsibilities = responsibilities;
        this.architecture = architecture;
        this.features = features;
        this.status = status;
        this.deploymentStatus = deploymentStatus;
        this.detailsUrl = detailsUrl;
        this.githubUrl = githubUrl;
        this.githubFrontendUrl = githubFrontendUrl;
        this.githubBackendUrl = githubBackendUrl;
        this.liveDemoUrl = liveDemoUrl;
        this.documentationUrl = documentationUrl;
        this.imageUrl = imageUrl;
        this.category = category;
        this.isFeatured = isFeatured;
        this.displayOrder = displayOrder;
        this.createdAt = createdAt;
    }

    public static ProjectDtoBuilder builder() {
        return new ProjectDtoBuilder();
    }

    public static class ProjectDtoBuilder {
        private Long id;
        private String slug;
        private String title;
        private String shortDescription;
        private String fullDescription;
        private String problemStatement;
        private String objective;
        private String challenges;
        private String solution;
        private String technologies;
        private String frontendTechStack;
        private String backendTechStack;
        private String databaseTechStack;
        private String tools;
        private String responsibilities;
        private String architecture;
        private String features;
        private String status;
        private String deploymentStatus;
        private String detailsUrl;
        private String githubUrl;
        private String githubFrontendUrl;
        private String githubBackendUrl;
        private String liveDemoUrl;
        private String documentationUrl;
        private String imageUrl;
        private String category;
        private Boolean isFeatured;
        private Integer displayOrder;
        private LocalDateTime createdAt;

        public ProjectDtoBuilder id(Long id) { this.id = id; return this; }
        public ProjectDtoBuilder slug(String slug) { this.slug = slug; return this; }
        public ProjectDtoBuilder title(String title) { this.title = title; return this; }
        public ProjectDtoBuilder shortDescription(String shortDescription) { this.shortDescription = shortDescription; return this; }
        public ProjectDtoBuilder fullDescription(String fullDescription) { this.fullDescription = fullDescription; return this; }
        public ProjectDtoBuilder problemStatement(String problemStatement) { this.problemStatement = problemStatement; return this; }
        public ProjectDtoBuilder objective(String objective) { this.objective = objective; return this; }
        public ProjectDtoBuilder challenges(String challenges) { this.challenges = challenges; return this; }
        public ProjectDtoBuilder solution(String solution) { this.solution = solution; return this; }
        public ProjectDtoBuilder technologies(String technologies) { this.technologies = technologies; return this; }
        public ProjectDtoBuilder frontendTechStack(String frontendTechStack) { this.frontendTechStack = frontendTechStack; return this; }
        public ProjectDtoBuilder backendTechStack(String backendTechStack) { this.backendTechStack = backendTechStack; return this; }
        public ProjectDtoBuilder databaseTechStack(String databaseTechStack) { this.databaseTechStack = databaseTechStack; return this; }
        public ProjectDtoBuilder tools(String tools) { this.tools = tools; return this; }
        public ProjectDtoBuilder responsibilities(String responsibilities) { this.responsibilities = responsibilities; return this; }
        public ProjectDtoBuilder architecture(String architecture) { this.architecture = architecture; return this; }
        public ProjectDtoBuilder features(String features) { this.features = features; return this; }
        public ProjectDtoBuilder status(String status) { this.status = status; return this; }
        public ProjectDtoBuilder deploymentStatus(String deploymentStatus) { this.deploymentStatus = deploymentStatus; return this; }
        public ProjectDtoBuilder detailsUrl(String detailsUrl) { this.detailsUrl = detailsUrl; return this; }
        public ProjectDtoBuilder githubUrl(String githubUrl) { this.githubUrl = githubUrl; return this; }
        public ProjectDtoBuilder githubFrontendUrl(String githubFrontendUrl) { this.githubFrontendUrl = githubFrontendUrl; return this; }
        public ProjectDtoBuilder githubBackendUrl(String githubBackendUrl) { this.githubBackendUrl = githubBackendUrl; return this; }
        public ProjectDtoBuilder liveDemoUrl(String liveDemoUrl) { this.liveDemoUrl = liveDemoUrl; return this; }
        public ProjectDtoBuilder documentationUrl(String documentationUrl) { this.documentationUrl = documentationUrl; return this; }
        public ProjectDtoBuilder imageUrl(String imageUrl) { this.imageUrl = imageUrl; return this; }
        public ProjectDtoBuilder category(String category) { this.category = category; return this; }
        public ProjectDtoBuilder isFeatured(Boolean isFeatured) { this.isFeatured = isFeatured; return this; }
        public ProjectDtoBuilder displayOrder(Integer displayOrder) { this.displayOrder = displayOrder; return this; }
        public ProjectDtoBuilder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }

        public ProjectDto build() {
            return new ProjectDto(id, slug, title, shortDescription, fullDescription, problemStatement,
                    objective, challenges, solution, technologies, frontendTechStack, backendTechStack,
                    databaseTechStack, tools, responsibilities, architecture, features, status,
                    deploymentStatus, detailsUrl,
                    githubUrl, githubFrontendUrl, githubBackendUrl, liveDemoUrl, documentationUrl,
                    imageUrl, category, isFeatured, displayOrder, createdAt);
        }
    }


    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getSlug() { return slug; }
    public void setSlug(String slug) { this.slug = slug; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getShortDescription() { return shortDescription; }
    public void setShortDescription(String shortDescription) { this.shortDescription = shortDescription; }
    public String getFullDescription() { return fullDescription; }
    public void setFullDescription(String fullDescription) { this.fullDescription = fullDescription; }
    public String getProblemStatement() { return problemStatement; }
    public void setProblemStatement(String problemStatement) { this.problemStatement = problemStatement; }
    public String getObjective() { return objective; }
    public void setObjective(String objective) { this.objective = objective; }
    public String getChallenges() { return challenges; }
    public void setChallenges(String challenges) { this.challenges = challenges; }
    public String getSolution() { return solution; }
    public void setSolution(String solution) { this.solution = solution; }
    public String getTechnologies() { return technologies; }
    public void setTechnologies(String technologies) { this.technologies = technologies; }
    public String getFrontendTechStack() { return frontendTechStack; }
    public void setFrontendTechStack(String frontendTechStack) { this.frontendTechStack = frontendTechStack; }
    public String getBackendTechStack() { return backendTechStack; }
    public void setBackendTechStack(String backendTechStack) { this.backendTechStack = backendTechStack; }
    public String getDatabaseTechStack() { return databaseTechStack; }
    public void setDatabaseTechStack(String databaseTechStack) { this.databaseTechStack = databaseTechStack; }
    public String getTools() { return tools; }
    public void setTools(String tools) { this.tools = tools; }
    public String getResponsibilities() { return responsibilities; }
    public void setResponsibilities(String responsibilities) { this.responsibilities = responsibilities; }
    public String getArchitecture() { return architecture; }
    public void setArchitecture(String architecture) { this.architecture = architecture; }
    public String getFeatures() { return features; }
    public void setFeatures(String features) { this.features = features; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public String getDeploymentStatus() { return deploymentStatus; }
    public void setDeploymentStatus(String deploymentStatus) { this.deploymentStatus = deploymentStatus; }
    public String getDetailsUrl() { return detailsUrl; }
    public void setDetailsUrl(String detailsUrl) { this.detailsUrl = detailsUrl; }
    public String getGithubUrl() { return githubUrl; }

    public void setGithubUrl(String githubUrl) { this.githubUrl = githubUrl; }
    public String getGithubFrontendUrl() { return githubFrontendUrl; }
    public void setGithubFrontendUrl(String githubFrontendUrl) { this.githubFrontendUrl = githubFrontendUrl; }
    public String getGithubBackendUrl() { return githubBackendUrl; }
    public void setGithubBackendUrl(String githubBackendUrl) { this.githubBackendUrl = githubBackendUrl; }
    public String getLiveDemoUrl() { return liveDemoUrl; }
    public void setLiveDemoUrl(String liveDemoUrl) { this.liveDemoUrl = liveDemoUrl; }
    public String getDocumentationUrl() { return documentationUrl; }
    public void setDocumentationUrl(String documentationUrl) { this.documentationUrl = documentationUrl; }
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public Boolean getIsFeatured() { return isFeatured; }
    public void setIsFeatured(Boolean isFeatured) { this.isFeatured = isFeatured; }
    public Integer getDisplayOrder() { return displayOrder; }
    public void setDisplayOrder(Integer displayOrder) { this.displayOrder = displayOrder; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
