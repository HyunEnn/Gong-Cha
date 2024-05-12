package com.b306.gongcha.controller;

import com.b306.gongcha.dto.request.MatchingRequest;
import com.b306.gongcha.dto.response.CommonResponse;
import com.b306.gongcha.service.MatchingService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "Matching", description = "Matching 관련 API")
@RestController
@RequiredArgsConstructor
@RequestMapping("/matching")
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

    @Operation(
            summary = "매칭 전체 조회",
            description = "매칭 목록을 조회함."
    )
    @ApiResponse(
            responseCode = "200",
            description = "매칭 목록을 정상적으로 조회하였습니다."
    )
    @GetMapping("")
    public ResponseEntity<CommonResponse> getAllMatchings(
            @PageableDefault(sort = "createdAt", direction = Sort.Direction.DESC, size = 10) Pageable pageable) {

        return new ResponseEntity<>(CommonResponse.builder()
                .message("매칭 목록 조회 완료")
                .data(matchingService.getAllMatchings(pageable))
                .build(), HttpStatus.OK);
    }

}
