package com.portfolio.controller;

import com.portfolio.dto.ApiResponse;
import com.portfolio.dto.ContactMessageDto;
import com.portfolio.dto.DashboardStatsDto;
import com.portfolio.service.ContactService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contact")
public class ContactController {

    private final ContactService contactService;

    public ContactController(ContactService contactService) {
        this.contactService = contactService;
    }

    @PostMapping
    public ResponseEntity<ApiResponse<ContactMessageDto>> submitContactMessage(@Valid @RequestBody ContactMessageDto dto) {
        ContactMessageDto saved = contactService.saveMessage(dto);
        return new ResponseEntity<>(ApiResponse.ok("Your message has been sent successfully!", saved), HttpStatus.CREATED);
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<List<ContactMessageDto>>> getAllMessages() {
        List<ContactMessageDto> list = contactService.getAllMessages();
        return ResponseEntity.ok(ApiResponse.ok(list));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Void>> deleteMessage(@PathVariable Long id) {
        contactService.deleteMessage(id);
        return ResponseEntity.ok(ApiResponse.ok("Message deleted successfully", null));
    }

    @PatchMapping("/{id}/read")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<ContactMessageDto>> markAsRead(@PathVariable Long id) {
        ContactMessageDto updated = contactService.markAsRead(id);
        return ResponseEntity.ok(ApiResponse.ok(updated));
    }

    @GetMapping("/stats")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<DashboardStatsDto>> getDashboardStats() {
        DashboardStatsDto stats = contactService.getDashboardStats();
        return ResponseEntity.ok(ApiResponse.ok(stats));
    }
}
