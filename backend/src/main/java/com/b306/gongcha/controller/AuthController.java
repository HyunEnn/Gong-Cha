package com.b306.gongcha.controller;

import com.b306.gongcha.dto.response.CommonResponse;
import com.b306.gongcha.service.CustomLogoutService;
import com.b306.gongcha.service.Oauth2TokenService;
import com.b306.gongcha.util.JWTUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {

    private final JWTUtil jwtUtil;
    private final Oauth2TokenService oauth2TokenService;
    private final CustomLogoutService logoutService;

    @GetMapping("/info")
    public ResponseEntity<CommonResponse> loginInfo() {

        return new ResponseEntity<>(CommonResponse.builder()
                .message("유저 로그인 정보 조회 성공")
                .data(oauth2TokenService.getUserInfo())
                .build(), HttpStatus.OK);
    }

    @GetMapping("/my")
    public ResponseEntity<String> MyAPI() {
        return ResponseEntity.ok("my route");
    }

    @PostMapping("/regenerate")
    public ResponseEntity<CommonResponse> reissue(HttpServletRequest request, HttpServletResponse response) {
        oauth2TokenService.regenerateAccessToken(request, response);
        return new ResponseEntity<>(CommonResponse.builder()
                .message("access token regenerate success")
                .build(), HttpStatus.OK);
    }

}
