package com.b306.gongcha.controller;

import com.b306.gongcha.dto.request.PhoneRequest;
import com.b306.gongcha.dto.request.VerifyCodeRequest;
import com.b306.gongcha.dto.response.CommonResponse;
import com.b306.gongcha.service.Oauth2TokenService;
import com.b306.gongcha.service.SMSVerificationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "Auth API", description = "AUTH 관련 API 입니다.")
@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {

    private final Oauth2TokenService oauth2TokenService;
    private final SMSVerificationService smsVerificationService;

    @Operation(
            summary = "ACCESS 토큰 재발급",
            description = "REFRESH 토큰을 통한 ACCESS 토큰 재발급을 진행합니다."
    )
    @ApiResponse(
            responseCode = "200",
            description = "ACCESS 토큰을 재발급합니다."
    )
    @PostMapping("/regenerate")
    public ResponseEntity<CommonResponse> reissue(HttpServletRequest request, HttpServletResponse response) {
        oauth2TokenService.regenerateAccessToken(request, response);
        return new ResponseEntity<>(CommonResponse.builder()
                .message("access token regenerate success")
                .build(), HttpStatus.OK);
    }


    @PostMapping("/phone")
    public ResponseEntity<CommonResponse> sendAuthCode(
            HttpServletRequest httpServletRequest,
            @RequestBody PhoneRequest request) {

        smsVerificationService.sendSmsToUser(httpServletRequest, request);
        return new ResponseEntity<>(CommonResponse.builder()
                .message("휴대폰 번호로 인증번호 전송")
                .build(), HttpStatus.OK);
    }

    @GetMapping("/phone")
    public ResponseEntity<CommonResponse> sendSmsToUser(@RequestBody VerifyCodeRequest request) {

        if(smsVerificationService.verifyCode(request)) {
            smsVerificationService.savePhoneNum(request);

            return new ResponseEntity<>(CommonResponse.builder()
                    .message("인증이 성공적으로 완료되었습니다.")
                    .build(),HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(CommonResponse.builder()
                    .message("인증에 실패하였습니다.")
                    .build(), HttpStatus.OK);
        }

    }
}
