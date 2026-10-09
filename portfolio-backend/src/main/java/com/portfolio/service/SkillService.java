package com.portfolio.service;

import com.portfolio.dto.SkillDto;
import com.portfolio.entity.Skill;
import com.portfolio.exception.ResourceNotFoundException;
import com.portfolio.repository.SkillRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SkillService {

    private final SkillRepository skillRepository;

    public SkillService(SkillRepository skillRepository) {
        this.skillRepository = skillRepository;
    }

    @Transactional(readOnly = true)
    public List<SkillDto> getAllSkills() {
        return skillRepository.findAllByOrderByCategoryAscDisplayOrderAsc()
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<SkillDto> getSkillsByCategory(String category) {
        return skillRepository.findByCategoryOrderByDisplayOrderAsc(category)
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public SkillDto getSkillById(Long id) {
        Skill skill = skillRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Skill", "id", id));
        return mapToDto(skill);
    }

    @Transactional
    public SkillDto createSkill(SkillDto dto) {
        Skill skill = Skill.builder()
                .name(dto.getName())
                .category(dto.getCategory())
                .level(dto.getLevel() != null ? dto.getLevel() : "Intermediate")
                .iconName(dto.getIconName())
                .displayOrder(dto.getDisplayOrder() != null ? dto.getDisplayOrder() : 0)
                .build();

        return mapToDto(skillRepository.save(skill));
    }

    @Transactional
    public SkillDto updateSkill(Long id, SkillDto dto) {
        Skill skill = skillRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Skill", "id", id));

        skill.setName(dto.getName());
        skill.setCategory(dto.getCategory());
        if (dto.getLevel() != null) skill.setLevel(dto.getLevel());
        if (dto.getIconName() != null) skill.setIconName(dto.getIconName());
        if (dto.getDisplayOrder() != null) skill.setDisplayOrder(dto.getDisplayOrder());

        return mapToDto(skillRepository.save(skill));
    }

    @Transactional
    public void deleteSkill(Long id) {
        Skill skill = skillRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Skill", "id", id));
        skillRepository.delete(skill);
    }

    public SkillDto mapToDto(Skill skill) {
        return SkillDto.builder()
                .id(skill.getId())
                .name(skill.getName())
                .category(skill.getCategory())
                .level(skill.getLevel())
                .iconName(skill.getIconName())
                .displayOrder(skill.getDisplayOrder())
                .build();
    }
}
