package com.portfolio.service;

import com.portfolio.dto.AuthRequest;
import com.portfolio.dto.AuthResponse;
import com.portfolio.entity.User;
import com.portfolio.repository.UserRepository;
import com.portfolio.security.JwtTokenProvider;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider tokenProvider;
    private final UserRepository userRepository;

    public AuthService(AuthenticationManager authenticationManager,
                       JwtTokenProvider tokenProvider,
                       UserRepository userRepository) {
        this.authenticationManager = authenticationManager;
        this.tokenProvider = tokenProvider;
        this.userRepository = userRepository;
    }

    public AuthResponse authenticateUser(AuthRequest authRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        authRequest.getUsername().trim(),
                        authRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = tokenProvider.generateToken(authentication);

        User user = userRepository.findByUsername(authRequest.getUsername().trim())
                .or(() -> userRepository.findByEmail(authRequest.getUsername().trim()))
                .orElse(null);

        String email = user != null ? user.getEmail() : "";
        String role = user != null ? user.getRole() : "ROLE_ADMIN";
        String username = user != null ? user.getUsername() : authRequest.getUsername();

        return AuthResponse.builder()
                .token(jwt)
                .tokenType("Bearer")
                .username(username)
                .email(email)
                .role(role)
                .build();
    }
}
