package com.portfolio.service;

import com.portfolio.dto.ProfileDto;
import com.portfolio.entity.Profile;
import com.portfolio.exception.ResourceNotFoundException;
import com.portfolio.repository.ProfileRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ProfileService {

    private final ProfileRepository profileRepository;

    public ProfileService(ProfileRepository profileRepository) {
        this.profileRepository = profileRepository;
    }

    @Transactional(readOnly = true)
    public ProfileDto getProfile() {
        Profile profile = profileRepository.findFirstByOrderByIdAsc()
                .orElseThrow(() -> new ResourceNotFoundException("Profile not found"));
        return mapToDto(profile);
    }

    @Transactional
    public ProfileDto updateProfile(ProfileDto dto) {
        Profile profile = profileRepository.findFirstByOrderByIdAsc()
                .orElseGet(Profile::new);

        profile.setFullName(dto.getFullName());
        profile.setTitle(dto.getTitle());
        profile.setBio(dto.getBio());
        profile.setAboutDetails(dto.getAboutDetails());
        profile.setEmail(dto.getEmail());
        profile.setPhone(dto.getPhone());
        profile.setLocation(dto.getLocation());
        profile.setGithubUrl(dto.getGithubUrl());
        profile.setLinkedinUrl(dto.getLinkedinUrl());
        profile.setResumeUrl(dto.getResumeUrl());
        profile.setAvatarUrl(dto.getAvatarUrl());
        profile.setExperienceStat(dto.getExperienceStat());
        profile.setProjectsStat(dto.getProjectsStat());
        profile.setTechnologiesStat(dto.getTechnologiesStat());
        profile.setEducationStat(dto.getEducationStat());

        Profile saved = profileRepository.save(profile);
        return mapToDto(saved);
    }

    public ProfileDto mapToDto(Profile profile) {
        return ProfileDto.builder()
                .id(profile.getId())
                .fullName(profile.getFullName())
                .title(profile.getTitle())
                .bio(profile.getBio())
                .aboutDetails(profile.getAboutDetails())
                .email(profile.getEmail())
                .phone(profile.getPhone())
                .location(profile.getLocation())
                .githubUrl(profile.getGithubUrl())
                .linkedinUrl(profile.getLinkedinUrl())
                .resumeUrl(profile.getResumeUrl())
                .avatarUrl(profile.getAvatarUrl())
                .experienceStat(profile.getExperienceStat())
                .projectsStat(profile.getProjectsStat())
                .technologiesStat(profile.getTechnologiesStat())
                .educationStat(profile.getEducationStat())
                .updatedAt(profile.getUpdatedAt())
                .build();
    }
}
