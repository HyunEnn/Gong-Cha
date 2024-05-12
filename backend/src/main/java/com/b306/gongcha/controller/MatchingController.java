package com.b306.gongcha.controller;

import com.b306.gongcha.dto.request.MatchingRequest;
import com.b306.gongcha.dto.response.CommonResponse;
import com.b306.gongcha.service.MatchingService;
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

@Tag(name = "Matching", description = "Matching 관련 API")
@RestController
@RequiredArgsConstructor
@RequestMapping("/Matching")
public class MatchingController {

    private final MatchingService matchingService;

    @Operation(
            summary = "매치 생성",
            description = "팀장이 매칭을 생성함."
    )
    @ApiResponse(
        responseCode = "200",
        description = "매칭이 정상적으로 생성되었습니다."
    )
    @PostMapping("/create")
    public ResponseEntity<CommonResponse> createClub(@RequestBody MatchingRequest matchingRequest) {

        matchingService.createMatching(matchingRequest);
        return new ResponseEntity<>(CommonResponse.builder()
                .message("매칭 생성 완료")
                .build(), HttpStatus.OK);
    }

}
