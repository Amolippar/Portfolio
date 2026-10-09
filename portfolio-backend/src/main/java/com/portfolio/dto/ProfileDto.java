package com.portfolio.dto;

import jakarta.validation.constraints.NotBlank;
import java.time.LocalDateTime;

public class ProfileDto {
    private Long id;

    @NotBlank(message = "Full name is required")
    private String fullName;

    @NotBlank(message = "Professional title is required")
    private String title;

    private String bio;
    private String aboutDetails;
    private String email;
    private String phone;
    private String location;
    private String githubUrl;
    private String linkedinUrl;
    private String resumeUrl;
    private String avatarUrl;

    private String experienceStat;
    private String projectsStat;
    private String technologiesStat;
    private String educationStat;

    private LocalDateTime updatedAt;

    public ProfileDto() {}

    public ProfileDto(Long id, String fullName, String title, String bio, String aboutDetails,
                      String email, String phone, String location, String githubUrl,
                      String linkedinUrl, String resumeUrl, String avatarUrl,
                      String experienceStat, String projectsStat, String technologiesStat,
                      String educationStat, LocalDateTime updatedAt) {
        this.id = id;
        this.fullName = fullName;
        this.title = title;
        this.bio = bio;
        this.aboutDetails = aboutDetails;
        this.email = email;
        this.phone = phone;
        this.location = location;
        this.githubUrl = githubUrl;
        this.linkedinUrl = linkedinUrl;
        this.resumeUrl = resumeUrl;
        this.avatarUrl = avatarUrl;
        this.experienceStat = experienceStat;
        this.projectsStat = projectsStat;
        this.technologiesStat = technologiesStat;
        this.educationStat = educationStat;
        this.updatedAt = updatedAt;
    }

    public static ProfileDtoBuilder builder() {
        return new ProfileDtoBuilder();
    }

    public static class ProfileDtoBuilder {
        private Long id;
        private String fullName;
        private String title;
        private String bio;
        private String aboutDetails;
        private String email;
        private String phone;
        private String location;
        private String githubUrl;
        private String linkedinUrl;
        private String resumeUrl;
        private String avatarUrl;
        private String experienceStat;
        private String projectsStat;
        private String technologiesStat;
        private String educationStat;
        private LocalDateTime updatedAt;

        public ProfileDtoBuilder id(Long id) { this.id = id; return this; }
        public ProfileDtoBuilder fullName(String fullName) { this.fullName = fullName; return this; }
        public ProfileDtoBuilder title(String title) { this.title = title; return this; }
        public ProfileDtoBuilder bio(String bio) { this.bio = bio; return this; }
        public ProfileDtoBuilder aboutDetails(String aboutDetails) { this.aboutDetails = aboutDetails; return this; }
        public ProfileDtoBuilder email(String email) { this.email = email; return this; }
        public ProfileDtoBuilder phone(String phone) { this.phone = phone; return this; }
        public ProfileDtoBuilder location(String location) { this.location = location; return this; }
        public ProfileDtoBuilder githubUrl(String githubUrl) { this.githubUrl = githubUrl; return this; }
        public ProfileDtoBuilder linkedinUrl(String linkedinUrl) { this.linkedinUrl = linkedinUrl; return this; }
        public ProfileDtoBuilder resumeUrl(String resumeUrl) { this.resumeUrl = resumeUrl; return this; }
        public ProfileDtoBuilder avatarUrl(String avatarUrl) { this.avatarUrl = avatarUrl; return this; }
        public ProfileDtoBuilder experienceStat(String experienceStat) { this.experienceStat = experienceStat; return this; }
        public ProfileDtoBuilder projectsStat(String projectsStat) { this.projectsStat = projectsStat; return this; }
        public ProfileDtoBuilder technologiesStat(String technologiesStat) { this.technologiesStat = technologiesStat; return this; }
        public ProfileDtoBuilder educationStat(String educationStat) { this.educationStat = educationStat; return this; }
        public ProfileDtoBuilder updatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; return this; }

        public ProfileDto build() {
            return new ProfileDto(id, fullName, title, bio, aboutDetails, email, phone, location,
                    githubUrl, linkedinUrl, resumeUrl, avatarUrl, experienceStat, projectsStat,
                    technologiesStat, educationStat, updatedAt);
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getBio() { return bio; }
    public void setBio(String bio) { this.bio = bio; }
    public String getAboutDetails() { return aboutDetails; }
    public void setAboutDetails(String aboutDetails) { this.aboutDetails = aboutDetails; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
    public String getGithubUrl() { return githubUrl; }
    public void setGithubUrl(String githubUrl) { this.githubUrl = githubUrl; }
    public String getLinkedinUrl() { return linkedinUrl; }
    public void setLinkedinUrl(String linkedinUrl) { this.linkedinUrl = linkedinUrl; }
    public String getResumeUrl() { return resumeUrl; }
    public void setResumeUrl(String resumeUrl) { this.resumeUrl = resumeUrl; }
    public String getAvatarUrl() { return avatarUrl; }
    public void setAvatarUrl(String avatarUrl) { this.avatarUrl = avatarUrl; }
    public String getExperienceStat() { return experienceStat; }
    public void setExperienceStat(String experienceStat) { this.experienceStat = experienceStat; }
    public String getProjectsStat() { return projectsStat; }
    public void setProjectsStat(String projectsStat) { this.projectsStat = projectsStat; }
    public String getTechnologiesStat() { return technologiesStat; }
    public void setTechnologiesStat(String technologiesStat) { this.technologiesStat = technologiesStat; }
    public String getEducationStat() { return educationStat; }
    public void setEducationStat(String educationStat) { this.educationStat = educationStat; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
