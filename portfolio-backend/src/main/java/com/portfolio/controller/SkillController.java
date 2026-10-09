package com.portfolio.controller;

import com.portfolio.dto.ApiResponse;
import com.portfolio.dto.SkillDto;
import com.portfolio.service.SkillService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/skills")
public class SkillController {

    private final SkillService skillService;

    public SkillController(SkillService skillService) {
        this.skillService = skillService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<SkillDto>>> getAllSkills() {
        List<SkillDto> list = skillService.getAllSkills();
        return ResponseEntity.ok(ApiResponse.ok(list));
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<ApiResponse<List<SkillDto>>> getSkillsByCategory(@PathVariable String category) {
        List<SkillDto> list = skillService.getSkillsByCategory(category);
        return ResponseEntity.ok(ApiResponse.ok(list));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<SkillDto>> getSkillById(@PathVariable Long id) {
        SkillDto skill = skillService.getSkillById(id);
        return ResponseEntity.ok(ApiResponse.ok(skill));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<SkillDto>> createSkill(@Valid @RequestBody SkillDto dto) {
        SkillDto created = skillService.createSkill(dto);
        return new ResponseEntity<>(ApiResponse.ok("Skill created successfully", created), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<SkillDto>> updateSkill(@PathVariable Long id, @Valid @RequestBody SkillDto dto) {
        SkillDto updated = skillService.updateSkill(id, dto);
        return ResponseEntity.ok(ApiResponse.ok("Skill updated successfully", updated));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Void>> deleteSkill(@PathVariable Long id) {
        skillService.deleteSkill(id);
        return ResponseEntity.ok(ApiResponse.ok("Skill deleted successfully", null));
    }
}
