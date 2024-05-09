package com.b306.gongcha.controller;

import com.b306.gongcha.dto.request.UserRatingRequest;
import com.b306.gongcha.dto.response.CommonResponse;
import com.b306.gongcha.service.CardServiceImpl;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final CardServiceImpl cardService;

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
            summary = "유저 선수 카드 조회",
            description = "다른 유저의 선수 카드를 조회함."
    )
    @ApiResponse(
            responseCode = "200",
            description = "선수 카드 조회에 성공했습니다."
    )
    @Schema(

    )
    @GetMapping("my-page/card/{id}")
    public ResponseEntity<CommonResponse> getMyCard(@PathVariable("id") Long userId){

        return new ResponseEntity<>(CommonResponse.builder()
                .message("선수 카드 조회 성공")
                .data(cardService.getCard(userId))
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
}
