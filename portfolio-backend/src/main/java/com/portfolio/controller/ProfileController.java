package com.portfolio.controller;

import com.portfolio.dto.ApiResponse;
import com.portfolio.dto.ProfileDto;
import com.portfolio.service.ProfileService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profile")
public class ProfileController {

    private final ProfileService profileService;

    public ProfileController(ProfileService profileService) {
        this.profileService = profileService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<ProfileDto>> getProfile() {
        ProfileDto profile = profileService.getProfile();
        return ResponseEntity.ok(ApiResponse.ok(profile));
    }

    @PutMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<ProfileDto>> updateProfile(@Valid @RequestBody ProfileDto profileDto) {
        ProfileDto updated = profileService.updateProfile(profileDto);
        return ResponseEntity.ok(ApiResponse.ok("Profile updated successfully", updated));
    }
}
