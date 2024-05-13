package com.b306.gongcha.controller;

import com.b306.gongcha.dto.request.UserRatingRequest;
import com.b306.gongcha.dto.response.CommonResponse;
import com.b306.gongcha.service.CardServiceImpl;
import com.b306.gongcha.service.UserServiceImpl;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@Tag(name = "User", description = "FCM 알림 관련 API")
@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final CardServiceImpl cardService;
    private final UserServiceImpl userService;

    @Operation(
            summary = "유저 선수 카드 조회",
            description = "다른 유저의 선수 카드를 조회함."
    )
    @ApiResponse(
            responseCode = "200",
            description = "선수 카드 조회에 성공했습니다."
    )
    @Schema(

    )
    @GetMapping("/card/{id}")
    public ResponseEntity<CommonResponse> getUserCard(@PathVariable("id") Long userId){

        return new ResponseEntity<>(CommonResponse.builder()
                .message("선수 카드 조회 성공")
                .data(cardService.getCard(userId))
                .build(), HttpStatus.OK);
    }

    @Operation(
            summary = "내 선수 카드 조회",
            description = "내 선수 카드를 조회함."
    )
    @ApiResponse(
            responseCode = "200",
            description = "내 선수 카드 조회에 성공했습니다."
    )
    @GetMapping("my-page/card")
    public ResponseEntity<CommonResponse> getMyCard(){

        return new ResponseEntity<>(CommonResponse.builder()
                .message("내 선수 카드 조회 성공")
                .data(cardService.getMyCard())
                .build(), HttpStatus.OK);
    }


    @Operation(
            summary = "선수 평가",
            description = "경기 후 유저를 평가함."
    )
    @ApiResponse(
            responseCode = "200",
            description = "선수 평가에 성공했습니다."
    )
    @PatchMapping("/card")
    public ResponseEntity<CommonResponse> userRating(@RequestBody UserRatingRequest cardRequest){

        cardService.userRating(cardRequest);
        return new ResponseEntity<>(CommonResponse.builder()
                .message("선수 평가 성공")
                .build(), HttpStatus.OK);
    }

    @Operation(
            summary = "프로필 사진 변경",
            description = "유저 프로필 사진을 변경함."
    )
    @ApiResponse(
            responseCode = "200",
            description = "프로필 사진 변경에 성공했습니다."
    )
    @PatchMapping("/profile")
    public ResponseEntity<CommonResponse> updateProfile(
            @RequestPart(value = "file", required = false) MultipartFile file){

        return new ResponseEntity<>(CommonResponse.builder()
                .message("프로필 사진 변경 성공")
                .data(userService.updateProfile(file))
                .build(), HttpStatus.OK);
    }

    @Operation(
            summary = "알림 메세지 조회",
            description = "유저가 받은 알림을 조회함."
    )
    @ApiResponse(
            responseCode = "200",
            description = "알림 조회에 성공했습니다."
    )
    @PostMapping("/notice")
    public ResponseEntity<CommonResponse> notice(){
        return new ResponseEntity<>(CommonResponse.builder()
                .message("알림 조회 성공")
                .data(userService.getNotices())
                .build(), HttpStatus.OK);
    }
}

