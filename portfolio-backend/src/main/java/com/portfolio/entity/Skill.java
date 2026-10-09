package com.portfolio.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "skills")
public class Skill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(nullable = false, length = 60)
    private String category;

    @Column(nullable = false, length = 50)
    private String level = "Intermediate";

    @Column(length = 60)
    private String iconName;

    @Column(nullable = false)
    private Integer displayOrder = 0;

    public Skill() {}

    public Skill(Long id, String name, String category, String level, String iconName, Integer displayOrder) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.level = level != null ? level : "Intermediate";
        this.iconName = iconName;
        this.displayOrder = displayOrder != null ? displayOrder : 0;
    }

    public static SkillBuilder builder() {
        return new SkillBuilder();
    }

    public static class SkillBuilder {
        private Long id;
        private String name;
        private String category;
        private String level = "Intermediate";
        private String iconName;
        private Integer displayOrder = 0;

        public SkillBuilder id(Long id) { this.id = id; return this; }
        public SkillBuilder name(String name) { this.name = name; return this; }
        public SkillBuilder category(String category) { this.category = category; return this; }
        public SkillBuilder level(String level) { this.level = level; return this; }
        public SkillBuilder iconName(String iconName) { this.iconName = iconName; return this; }
        public SkillBuilder displayOrder(Integer displayOrder) { this.displayOrder = displayOrder; return this; }

        public Skill build() {
            return new Skill(id, name, category, level, iconName, displayOrder);
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
