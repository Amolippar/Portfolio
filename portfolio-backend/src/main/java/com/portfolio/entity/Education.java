package com.portfolio.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "education")
public class Education {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 150)
    private String degree;

    @Column(nullable = false, length = 150)
    private String institution;

    @Column(nullable = false, length = 100)
    private String completionDate;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(length = 50)
    private String iconName;

    @Column(nullable = false)
    private Integer displayOrder = 0;

    public Education() {}

    public Education(Long id, String degree, String institution, String completionDate,
                     String description, String iconName, Integer displayOrder) {
        this.id = id;
        this.degree = degree;
        this.institution = institution;
        this.completionDate = completionDate;
        this.description = description;
        this.iconName = iconName;
        this.displayOrder = displayOrder != null ? displayOrder : 0;
    }

    public static EducationBuilder builder() {
        return new EducationBuilder();
    }

    public static class EducationBuilder {
        private Long id;
        private String degree;
        private String institution;
        private String completionDate;
        private String description;
        private String iconName;
        private Integer displayOrder = 0;

        public EducationBuilder id(Long id) { this.id = id; return this; }
        public EducationBuilder degree(String degree) { this.degree = degree; return this; }
        public EducationBuilder institution(String institution) { this.institution = institution; return this; }
        public EducationBuilder completionDate(String completionDate) { this.completionDate = completionDate; return this; }
        public EducationBuilder description(String description) { this.description = description; return this; }
        public EducationBuilder iconName(String iconName) { this.iconName = iconName; return this; }
        public EducationBuilder displayOrder(Integer displayOrder) { this.displayOrder = displayOrder; return this; }

        public Education build() {
            return new Education(id, degree, institution, completionDate, description, iconName, displayOrder);
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getDegree() { return degree; }
    public void setDegree(String degree) { this.degree = degree; }
    public String getInstitution() { return institution; }
    public void setInstitution(String institution) { this.institution = institution; }
    public String getCompletionDate() { return completionDate; }
    public void setCompletionDate(String completionDate) { this.completionDate = completionDate; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getIconName() { return iconName; }
    public void setIconName(String iconName) { this.iconName = iconName; }
    public Integer getDisplayOrder() { return displayOrder; }
    public void setDisplayOrder(Integer displayOrder) { this.displayOrder = displayOrder; }
}
