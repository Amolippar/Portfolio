package com.portfolio.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import java.time.LocalDateTime;

public class ContactMessageDto {
    private Long id;

    @NotBlank(message = "Name is required")
    private String name;

    @NotBlank(message = "Email is required")
    @Email(message = "Valid email is required")
    private String email;

    @NotBlank(message = "Subject is required")
    private String subject;

    @NotBlank(message = "Message is required")
    private String message;

    private Boolean isRead;
    private LocalDateTime createdAt;

    public ContactMessageDto() {}

    public ContactMessageDto(Long id, String name, String email, String subject, String message, Boolean isRead, LocalDateTime createdAt) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.subject = subject;
        this.message = message;
        this.isRead = isRead;
        this.createdAt = createdAt;
    }

    public static ContactMessageDtoBuilder builder() {
        return new ContactMessageDtoBuilder();
    }

    public static class ContactMessageDtoBuilder {
        private Long id;
        private String name;
        private String email;
        private String subject;
        private String message;
        private Boolean isRead;
        private LocalDateTime createdAt;

        public ContactMessageDtoBuilder id(Long id) { this.id = id; return this; }
        public ContactMessageDtoBuilder name(String name) { this.name = name; return this; }
        public ContactMessageDtoBuilder email(String email) { this.email = email; return this; }
        public ContactMessageDtoBuilder subject(String subject) { this.subject = subject; return this; }
        public ContactMessageDtoBuilder message(String message) { this.message = message; return this; }
        public ContactMessageDtoBuilder isRead(Boolean isRead) { this.isRead = isRead; return this; }
        public ContactMessageDtoBuilder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }

        public ContactMessageDto build() {
            return new ContactMessageDto(id, name, email, subject, message, isRead, createdAt);
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getSubject() { return subject; }
    public void setSubject(String subject) { this.subject = subject; }
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
    public Boolean getIsRead() { return isRead; }
    public void setIsRead(Boolean isRead) { this.isRead = isRead; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
