package com.portfolio.dto;

import jakarta.validation.constraints.NotBlank;

public class SkillDto {
    private Long id;

    @NotBlank(message = "Skill name is required")
    private String name;

    @NotBlank(message = "Category is required")
    private String category;

    private String level;
    private String iconName;
    private Integer displayOrder;

    public SkillDto() {}

    public SkillDto(Long id, String name, String category, String level, String iconName, Integer displayOrder) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.level = level;
        this.iconName = iconName;
        this.displayOrder = displayOrder;
    }

    public static SkillDtoBuilder builder() {
        return new SkillDtoBuilder();
    }

    public static class SkillDtoBuilder {
        private Long id;
        private String name;
        private String category;
        private String level;
        private String iconName;
        private Integer displayOrder;

        public SkillDtoBuilder id(Long id) { this.id = id; return this; }
        public SkillDtoBuilder name(String name) { this.name = name; return this; }
        public SkillDtoBuilder category(String category) { this.category = category; return this; }
        public SkillDtoBuilder level(String level) { this.level = level; return this; }
        public SkillDtoBuilder iconName(String iconName) { this.iconName = iconName; return this; }
        public SkillDtoBuilder displayOrder(Integer displayOrder) { this.displayOrder = displayOrder; return this; }

        public SkillDto build() {
            return new SkillDto(id, name, category, level, iconName, displayOrder);
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public String getLevel() { return level; }
    public void setLevel(String level) { this.level = level; }
    public String getIconName() { return iconName; }
    public void setIconName(String iconName) { this.iconName = iconName; }
    public Integer getDisplayOrder() { return displayOrder; }
    public void setDisplayOrder(Integer displayOrder) { this.displayOrder = displayOrder; }
}
