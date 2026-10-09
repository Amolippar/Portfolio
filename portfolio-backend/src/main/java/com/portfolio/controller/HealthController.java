package com.portfolio.controller;

import com.portfolio.dto.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class HealthController {

    @GetMapping({"/", "/health", "/api/health"})
    public ResponseEntity<ApiResponse<Map<String, Object>>> getHealth() {
        Map<String, Object> data = new HashMap<>();
        data.put("status", "UP");
        data.put("app", "Amol Ippar Full Stack Developer Portfolio Ecosystem");
        data.put("version", "1.0.0");
        data.put("timestamp", System.currentTimeMillis());

        return ResponseEntity.ok(ApiResponse.ok("Service is running healthy", data));
    }
}
