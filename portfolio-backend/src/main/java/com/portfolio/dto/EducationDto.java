package com.portfolio.dto;

import jakarta.validation.constraints.NotBlank;

public class EducationDto {
    private Long id;

    @NotBlank(message = "Degree is required")
    private String degree;

    @NotBlank(message = "Institution is required")
    private String institution;

    @NotBlank(message = "Completion date is required")
    private String completionDate;

    private String description;
    private String iconName;
    private Integer displayOrder;

    public EducationDto() {}

    public EducationDto(Long id, String degree, String institution, String completionDate,
                        String description, String iconName, Integer displayOrder) {
        this.id = id;
        this.degree = degree;
        this.institution = institution;
        this.completionDate = completionDate;
        this.description = description;
        this.iconName = iconName;
        this.displayOrder = displayOrder;
    }

    public static EducationDtoBuilder builder() {
        return new EducationDtoBuilder();
    }

    public static class EducationDtoBuilder {
        private Long id;
        private String degree;
        private String institution;
        private String completionDate;
        private String description;
        private String iconName;
        private Integer displayOrder;

        public EducationDtoBuilder id(Long id) { this.id = id; return this; }
        public EducationDtoBuilder degree(String degree) { this.degree = degree; return this; }
        public EducationDtoBuilder institution(String institution) { this.institution = institution; return this; }
        public EducationDtoBuilder completionDate(String completionDate) { this.completionDate = completionDate; return this; }
        public EducationDtoBuilder description(String description) { this.description = description; return this; }
        public EducationDtoBuilder iconName(String iconName) { this.iconName = iconName; return this; }
        public EducationDtoBuilder displayOrder(Integer displayOrder) { this.displayOrder = displayOrder; return this; }

        public EducationDto build() {
            return new EducationDto(id, degree, institution, completionDate, description, iconName, displayOrder);
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
