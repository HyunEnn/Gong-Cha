package com.b306.gongcha.controller;

import com.b306.gongcha.dto.request.NotificationRequest;
import com.b306.gongcha.dto.response.CommonResponse;
import com.b306.gongcha.service.NotificationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "Notification", description = "FCM 알림 관련 API")
@RequiredArgsConstructor
@RestController
@RequestMapping("/notification")
public class NotificationController {

    private final NotificationService notificationService;

    @Operation(
            summary = "FCM 알림 전송",
            description = "FCM 서버에 알림을 전송함."
    )
    @ApiResponse(
            responseCode = "200",
            description = "알림 전송에 성공했습니다."
    )
    @PostMapping
    public ResponseEntity<CommonResponse> sendNotification(@RequestBody NotificationRequest request){

        notificationService.sendNotification(request);
        return new ResponseEntity<>(CommonResponse.builder()
                .message("알림 전송 성공")
                .build(), HttpStatus.OK);
    }
}
