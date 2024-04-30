package com.b306.gongcha.controller;

import com.b306.gongcha.service.CustomLogoutService;
import com.b306.gongcha.service.Oauth2TokenService;
import com.b306.gongcha.util.JWTUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class AuthController {

    private final JWTUtil jwtUtil;
    private final Oauth2TokenService oauth2TokenService;
    private final CustomLogoutService logoutService;

    @GetMapping("/my")
    public ResponseEntity<String> MyAPI() {
        return ResponseEntity.ok("my route");
    }

    @PostMapping("/regenerate")
    public ResponseEntity<?> reissue(HttpServletRequest request, HttpServletResponse response) {
        oauth2TokenService.regenerateAccessToken(request, response);
        return ResponseEntity.ok("access token regenerate success");
    }

}
