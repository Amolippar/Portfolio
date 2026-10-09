package com.portfolio.service;

import com.portfolio.dto.ContactMessageDto;
import com.portfolio.dto.DashboardStatsDto;
import com.portfolio.entity.ContactMessage;
import com.portfolio.exception.ResourceNotFoundException;
import com.portfolio.repository.ContactMessageRepository;
import com.portfolio.repository.EducationRepository;
import com.portfolio.repository.ProjectRepository;
import com.portfolio.repository.SkillRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ContactService {

    private final ContactMessageRepository contactMessageRepository;
    private final ProjectRepository projectRepository;
    private final SkillRepository skillRepository;
    private final EducationRepository educationRepository;

    public ContactService(ContactMessageRepository contactMessageRepository,
                          ProjectRepository projectRepository,
                          SkillRepository skillRepository,
                          EducationRepository educationRepository) {
        this.contactMessageRepository = contactMessageRepository;
        this.projectRepository = projectRepository;
        this.skillRepository = skillRepository;
        this.educationRepository = educationRepository;
    }

    @Transactional
    public ContactMessageDto saveMessage(ContactMessageDto dto) {
        ContactMessage message = ContactMessage.builder()
                .name(dto.getName().trim())
                .email(dto.getEmail().trim())
                .subject(dto.getSubject().trim())
                .message(dto.getMessage().trim())
                .isRead(false)
                .build();

        return mapToDto(contactMessageRepository.save(message));
    }

    @Transactional(readOnly = true)
    public List<ContactMessageDto> getAllMessages() {
        return contactMessageRepository.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public void deleteMessage(Long id) {
        ContactMessage message = contactMessageRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("ContactMessage", "id", id));
        contactMessageRepository.delete(message);
    }

    @Transactional
    public ContactMessageDto markAsRead(Long id) {
        ContactMessage message = contactMessageRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("ContactMessage", "id", id));
        message.setIsRead(true);
        return mapToDto(contactMessageRepository.save(message));
    }

    @Transactional(readOnly = true)
    public DashboardStatsDto getDashboardStats() {
        return DashboardStatsDto.builder()
                .totalProjects(projectRepository.count())
                .totalSkills(skillRepository.count())
                .totalEducation(educationRepository.count())
                .totalMessages(contactMessageRepository.count())
                .unreadMessages(contactMessageRepository.countByIsReadFalse())
                .build();
    }

    public ContactMessageDto mapToDto(ContactMessage message) {
        return ContactMessageDto.builder()
                .id(message.getId())
                .name(message.getName())
                .email(message.getEmail())
                .subject(message.getSubject())
                .message(message.getMessage())
                .isRead(message.getIsRead())
                .createdAt(message.getCreatedAt())
                .build();
    }
}
