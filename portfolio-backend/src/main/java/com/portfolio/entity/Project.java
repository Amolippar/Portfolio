package com.portfolio.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "projects")
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 150)
    private String slug;

    @Column(nullable = false, length = 150)
    private String title;

    @Column(nullable = false, length = 350)
    private String shortDescription;

    @Column(columnDefinition = "TEXT")
    private String fullDescription;

    @Column(columnDefinition = "TEXT")
    private String problemStatement;

    @Column(columnDefinition = "TEXT")
    private String objective;

    @Column(columnDefinition = "TEXT")
    private String challenges;

    @Column(columnDefinition = "TEXT")
    private String solution;

    @Column(columnDefinition = "TEXT")
    private String technologies;

    @Column(length = 255)
    private String frontendTechStack;

    @Column(length = 255)
    private String backendTechStack;

    @Column(length = 255)
    private String databaseTechStack;

    @Column(length = 255)
    private String tools;

    @Column(columnDefinition = "TEXT")
    private String responsibilities;

    @Column(columnDefinition = "TEXT")
    private String architecture;

    @Column(columnDefinition = "TEXT")
    private String features;

    @Column(length = 50)
    private String status;

    @Column(length = 255)
    private String githubUrl;

    @Column(length = 255)
    private String githubFrontendUrl;

    @Column(length = 255)
    private String githubBackendUrl;

    @Column(length = 255)
    private String liveDemoUrl;

    @Column(length = 255)
    private String documentationUrl;

    @Column(length = 255)
    private String imageUrl;

    @Column(length = 100)
    private String category;

    @Column(nullable = false)
    private Boolean isFeatured = false;

    @Column(nullable = false)
    private Integer displayOrder = 0;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;

    public Project() {}

    public Project(Long id, String slug, String title, String shortDescription, String fullDescription,
                   String problemStatement, String objective, String challenges, String solution,
                   String technologies, String frontendTechStack, String backendTechStack,
                   String databaseTechStack, String tools, String responsibilities, String architecture,
                   String features, String status, String githubUrl, String githubFrontendUrl,
                   String githubBackendUrl, String liveDemoUrl, String documentationUrl, String imageUrl,
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
        this.githubUrl = githubUrl;
        this.githubFrontendUrl = githubFrontendUrl;
        this.githubBackendUrl = githubBackendUrl;
        this.liveDemoUrl = liveDemoUrl;
        this.documentationUrl = documentationUrl;
        this.imageUrl = imageUrl;
        this.category = category;
        this.isFeatured = isFeatured != null ? isFeatured : false;
        this.displayOrder = displayOrder != null ? displayOrder : 0;
        this.createdAt = createdAt;
    }

    public static ProjectBuilder builder() {
        return new ProjectBuilder();
    }

    public static class ProjectBuilder {
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
        private String status = "Completed";
        private String githubUrl;
        private String githubFrontendUrl;
        private String githubBackendUrl;
        private String liveDemoUrl;
        private String documentationUrl;
        private String imageUrl;
        private String category = "Full Stack";
        private Boolean isFeatured = false;
        private Integer displayOrder = 0;
        private LocalDateTime createdAt;

        public ProjectBuilder id(Long id) { this.id = id; return this; }
        public ProjectBuilder slug(String slug) { this.slug = slug; return this; }
        public ProjectBuilder title(String title) { this.title = title; return this; }
        public ProjectBuilder shortDescription(String shortDescription) { this.shortDescription = shortDescription; return this; }
        public ProjectBuilder fullDescription(String fullDescription) { this.fullDescription = fullDescription; return this; }
        public ProjectBuilder problemStatement(String problemStatement) { this.problemStatement = problemStatement; return this; }
        public ProjectBuilder objective(String objective) { this.objective = objective; return this; }
        public ProjectBuilder challenges(String challenges) { this.challenges = challenges; return this; }
        public ProjectBuilder solution(String solution) { this.solution = solution; return this; }
        public ProjectBuilder technologies(String technologies) { this.technologies = technologies; return this; }
        public ProjectBuilder frontendTechStack(String frontendTechStack) { this.frontendTechStack = frontendTechStack; return this; }
        public ProjectBuilder backendTechStack(String backendTechStack) { this.backendTechStack = backendTechStack; return this; }
        public ProjectBuilder databaseTechStack(String databaseTechStack) { this.databaseTechStack = databaseTechStack; return this; }
        public ProjectBuilder tools(String tools) { this.tools = tools; return this; }
        public ProjectBuilder responsibilities(String responsibilities) { this.responsibilities = responsibilities; return this; }
        public ProjectBuilder architecture(String architecture) { this.architecture = architecture; return this; }
        public ProjectBuilder features(String features) { this.features = features; return this; }
        public ProjectBuilder status(String status) { this.status = status; return this; }
        public ProjectBuilder githubUrl(String githubUrl) { this.githubUrl = githubUrl; return this; }
        public ProjectBuilder githubFrontendUrl(String githubFrontendUrl) { this.githubFrontendUrl = githubFrontendUrl; return this; }
        public ProjectBuilder githubBackendUrl(String githubBackendUrl) { this.githubBackendUrl = githubBackendUrl; return this; }
        public ProjectBuilder liveDemoUrl(String liveDemoUrl) { this.liveDemoUrl = liveDemoUrl; return this; }
        public ProjectBuilder documentationUrl(String documentationUrl) { this.documentationUrl = documentationUrl; return this; }
        public ProjectBuilder imageUrl(String imageUrl) { this.imageUrl = imageUrl; return this; }
        public ProjectBuilder category(String category) { this.category = category; return this; }
        public ProjectBuilder isFeatured(Boolean isFeatured) { this.isFeatured = isFeatured; return this; }
        public ProjectBuilder displayOrder(Integer displayOrder) { this.displayOrder = displayOrder; return this; }
        public ProjectBuilder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }

        public Project build() {
            return new Project(id, slug, title, shortDescription, fullDescription, problemStatement,
                    objective, challenges, solution, technologies, frontendTechStack, backendTechStack,
                    databaseTechStack, tools, responsibilities, architecture, features, status,
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
