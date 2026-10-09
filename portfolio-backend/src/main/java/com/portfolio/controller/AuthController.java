package com.portfolio.controller;

import com.portfolio.dto.ApiResponse;
import com.portfolio.dto.AuthRequest;
import com.portfolio.dto.AuthResponse;
import com.portfolio.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponse>> login(@Valid @RequestBody AuthRequest request) {
        AuthResponse response = authService.authenticateUser(request);
        return ResponseEntity.ok(ApiResponse.ok("Login successful", response));
    }

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getCurrentUser(@AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.ok(ApiResponse.error("Not authenticated"));
        }
        Map<String, Object> userData = Map.of(
                "username", userDetails.getUsername(),
                "authorities", userDetails.getAuthorities()
        );
        return ResponseEntity.ok(ApiResponse.ok(userData));
    }
}
