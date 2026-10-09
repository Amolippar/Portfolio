package com.portfolio.controller;

import com.portfolio.dto.ApiResponse;
import com.portfolio.dto.EducationDto;
import com.portfolio.service.EducationService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/education")
public class EducationController {

    private final EducationService educationService;

    public EducationController(EducationService educationService) {
        this.educationService = educationService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<EducationDto>>> getAllEducation() {
        List<EducationDto> list = educationService.getAllEducation();
        return ResponseEntity.ok(ApiResponse.ok(list));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<EducationDto>> getEducationById(@PathVariable Long id) {
        EducationDto education = educationService.getEducationById(id);
        return ResponseEntity.ok(ApiResponse.ok(education));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<EducationDto>> createEducation(@Valid @RequestBody EducationDto dto) {
        EducationDto created = educationService.createEducation(dto);
        return new ResponseEntity<>(ApiResponse.ok("Education created successfully", created), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<EducationDto>> updateEducation(@PathVariable Long id, @Valid @RequestBody EducationDto dto) {
        EducationDto updated = educationService.updateEducation(id, dto);
        return ResponseEntity.ok(ApiResponse.ok("Education updated successfully", updated));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Void>> deleteEducation(@PathVariable Long id) {
        educationService.deleteEducation(id);
        return ResponseEntity.ok(ApiResponse.ok("Education deleted successfully", null));
    }
}
