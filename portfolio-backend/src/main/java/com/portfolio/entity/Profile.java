package com.portfolio.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "profile")
public class Profile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String fullName;

    @Column(nullable = false, length = 200)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String bio;

    @Column(columnDefinition = "TEXT")
    private String aboutDetails;

    @Column(length = 100)
    private String email;

    @Column(length = 50)
    private String phone;

    @Column(length = 120)
    private String location;

    @Column(length = 255)
    private String githubUrl;

    @Column(length = 255)
    private String linkedinUrl;

    @Column(length = 255)
    private String resumeUrl;

    @Column(length = 255)
    private String avatarUrl;

    @Column(length = 50)
    private String experienceStat;

    @Column(length = 50)
    private String projectsStat;

    @Column(length = 50)
    private String technologiesStat;

    @Column(length = 100)
    private String educationStat;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    public Profile() {}

    public Profile(Long id, String fullName, String title, String bio, String aboutDetails,
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

    public static ProfileBuilder builder() {
        return new ProfileBuilder();
    }

    public static class ProfileBuilder {
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

        public ProfileBuilder id(Long id) { this.id = id; return this; }
        public ProfileBuilder fullName(String fullName) { this.fullName = fullName; return this; }
        public ProfileBuilder title(String title) { this.title = title; return this; }
        public ProfileBuilder bio(String bio) { this.bio = bio; return this; }
        public ProfileBuilder aboutDetails(String aboutDetails) { this.aboutDetails = aboutDetails; return this; }
        public ProfileBuilder email(String email) { this.email = email; return this; }
        public ProfileBuilder phone(String phone) { this.phone = phone; return this; }
        public ProfileBuilder location(String location) { this.location = location; return this; }
        public ProfileBuilder githubUrl(String githubUrl) { this.githubUrl = githubUrl; return this; }
        public ProfileBuilder linkedinUrl(String linkedinUrl) { this.linkedinUrl = linkedinUrl; return this; }
        public ProfileBuilder resumeUrl(String resumeUrl) { this.resumeUrl = resumeUrl; return this; }
        public ProfileBuilder avatarUrl(String avatarUrl) { this.avatarUrl = avatarUrl; return this; }
        public ProfileBuilder experienceStat(String experienceStat) { this.experienceStat = experienceStat; return this; }
        public ProfileBuilder projectsStat(String projectsStat) { this.projectsStat = projectsStat; return this; }
        public ProfileBuilder technologiesStat(String technologiesStat) { this.technologiesStat = technologiesStat; return this; }
        public ProfileBuilder educationStat(String educationStat) { this.educationStat = educationStat; return this; }
        public ProfileBuilder updatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; return this; }

        public Profile build() {
            return new Profile(id, fullName, title, bio, aboutDetails, email, phone, location,
                    githubUrl, linkedinUrl, resumeUrl, avatarUrl, experienceStat, projectsStat,
                    technologiesStat, educationStat, updatedAt);
        }
    }

    // Getters and setters
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
