package com.portfolio.service;

import com.portfolio.dto.EducationDto;
import com.portfolio.entity.Education;
import com.portfolio.exception.ResourceNotFoundException;
import com.portfolio.repository.EducationRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class EducationService {

    private final EducationRepository educationRepository;

    public EducationService(EducationRepository educationRepository) {
        this.educationRepository = educationRepository;
    }

    @Transactional(readOnly = true)
    public List<EducationDto> getAllEducation() {
        return educationRepository.findAllByOrderByDisplayOrderAscIdAsc()
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public EducationDto getEducationById(Long id) {
        Education education = educationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Education", "id", id));
        return mapToDto(education);
    }

    @Transactional
    public EducationDto createEducation(EducationDto dto) {
        Education education = Education.builder()
                .degree(dto.getDegree())
                .institution(dto.getInstitution())
                .completionDate(dto.getCompletionDate())
                .description(dto.getDescription())
                .iconName(dto.getIconName() != null ? dto.getIconName() : "GraduationCap")
                .displayOrder(dto.getDisplayOrder() != null ? dto.getDisplayOrder() : 0)
                .build();

        return mapToDto(educationRepository.save(education));
    }

    @Transactional
    public EducationDto updateEducation(Long id, EducationDto dto) {
        Education education = educationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Education", "id", id));

        education.setDegree(dto.getDegree());
        education.setInstitution(dto.getInstitution());
        education.setCompletionDate(dto.getCompletionDate());
        education.setDescription(dto.getDescription());
        if (dto.getIconName() != null) education.setIconName(dto.getIconName());
        if (dto.getDisplayOrder() != null) education.setDisplayOrder(dto.getDisplayOrder());

        return mapToDto(educationRepository.save(education));
    }

    @Transactional
    public void deleteEducation(Long id) {
        Education education = educationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Education", "id", id));
        educationRepository.delete(education);
    }

    public EducationDto mapToDto(Education education) {
        return EducationDto.builder()
                .id(education.getId())
                .degree(education.getDegree())
                .institution(education.getInstitution())
                .completionDate(education.getCompletionDate())
                .description(education.getDescription())
                .iconName(education.getIconName())
                .displayOrder(education.getDisplayOrder())
                .build();
    }
}
