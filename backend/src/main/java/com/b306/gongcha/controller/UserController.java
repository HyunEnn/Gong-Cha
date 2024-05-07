package com.b306.gongcha.controller;

import com.b306.gongcha.dto.response.CommonResponse;
import com.b306.gongcha.service.CardServiceImpl;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {
    private final CardServiceImpl cardService;

    @GetMapping("/card/{id}")
    public ResponseEntity<CommonResponse> getUserCard(@PathVariable("id") Long userId){

        return new ResponseEntity<>(CommonResponse.builder()
                .message("선수 카드 조회")
                .data(cardService.getCard(userId))
                .build(), HttpStatus.OK);
    }

//    @PatchMapping("/card/rating")
//    public ResponseEntity<CommonResponse> userRating(@RequestBody ){
//
//        return null;
//    }
}
