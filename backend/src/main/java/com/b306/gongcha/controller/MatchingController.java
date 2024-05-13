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

    @Operation(
            summary = "매칭 상세 조회",
            description = "매칭 상세 정보를 조회함."
    )
    @ApiResponse(
            responseCode = "200",
            description = "매칭 상세 정보를 정상적으로 조회하였습니다."
    )
    @GetMapping("/{matchingId}")
    public ResponseEntity<CommonResponse> getMatching(@PathVariable Long matchingId) {

        return new ResponseEntity<>(CommonResponse.builder()
                .message("매칭 상세 정보 조회 완료")
                .data(matchingService.getMatching(matchingId))
                .build(), HttpStatus.OK);
    }

    @Operation(
            summary = "매칭 정보 수정",
            description = "매칭 정보를 수정함."
    )
    @ApiResponse(
            responseCode = "200",
            description = "매칭 정보를 정상적으로 수정하였습니다."
    )
    @PatchMapping("/{matchingId}")
    public ResponseEntity<CommonResponse> updateMatching(@PathVariable Long matchingId, @RequestBody MatchingRequest matchingRequest) {

        return new ResponseEntity<>(CommonResponse.builder()
                .message("매칭 정보 수정 완료")
                .data(matchingService.updateMatching(matchingId, matchingRequest))
                .build(), HttpStatus.OK);
    }

    @Operation(
            summary = "매칭 정보 삭제",
            description = "매칭 정보를 삭제함."
    )
    @ApiResponse(
            responseCode = "200",
            description = "매칭 정보를 정상적으로 삭제하였습니다."
    )
    @DeleteMapping("/{matchingId}")
    public ResponseEntity<CommonResponse> deleteMatching(@PathVariable Long matchingId) {

        matchingService.deleteMatching(matchingId);
        return new ResponseEntity<>(CommonResponse.builder()
                .message("매칭 정보 삭제 완료")
                .build(), HttpStatus.OK);
    }

    @Operation(
            summary = "상대팀 매칭 신청",
            description = "상대팀이 매칭 게시판에 매칭을 신청함."
    )
    @ApiResponse(
            responseCode = "200",
            description = "매칭을 정상적으로 신청하였습니다."
    )
    @PostMapping("/request/{matchingTeamId}/{versusTeamId}")
    public ResponseEntity<CommonResponse> requestMatching(@PathVariable Long matchingTeamId, @PathVariable Long versusTeamId) {

        matchingService.requestMatching(matchingTeamId, versusTeamId);
        return new ResponseEntity<>(CommonResponse.builder()
                .message("매칭 신청 완료")
                .build(), HttpStatus.OK);
    }

    @Operation(
            summary = "상대팀 매칭 신청 목록",
            description = "상대팀이 해당 매칭 게시판 신청 목록을 조회함."
    )
    @ApiResponse(
            responseCode = "200",
            description = "매칭 신청 목록을 정상적으로 조회하였습니다."
    )
    @GetMapping("/request/{matchingTeamId}")
    public ResponseEntity<CommonResponse> getRequestMatching(@PathVariable Long matchingTeamId) {

        return new ResponseEntity<>(CommonResponse.builder()
                .message("매칭 신청 목록 조회 완료")
                .data(matchingService.getAllMatchingAsks(matchingTeamId))
                .build(), HttpStatus.OK);
    }

    @Operation(
            summary = "상대팀 매칭 신청 승인",
            description = "상대팀이 해당 매칭 게시판 신청을 승인함."
    )
    @ApiResponse(
            responseCode = "200",
            description = "매칭 신청을 정상적으로 승인하였습니다."
    )
    @PatchMapping("/request/{matchingTeamId}/{versusTeamId}")
    public ResponseEntity<CommonResponse> acceptMatching(@PathVariable Long matchingTeamId, @PathVariable Long versusTeamId) {

        matchingService.acceptMatching(matchingTeamId, versusTeamId);
        return new ResponseEntity<>(CommonResponse.builder()
                .message("매칭 신청 승인 완료")
                .build(), HttpStatus.OK);
    }

    @Operation(
            summary = "상대팀 매칭 신청 거절",
            description = "상대팀이 해당 매칭 게시판 신청을 거절함."
    )
    @ApiResponse(
            responseCode = "200",
            description = "매칭 신청을 정상적으로 거절하였습니다."
    )
    @DeleteMapping("/request/{matchingTeamId}/{versusTeamId}")
    public ResponseEntity<CommonResponse> rejectMatching(@PathVariable Long matchingTeamId, @PathVariable Long versusTeamId) {

        matchingService.rejectMatching(matchingTeamId, versusTeamId);
        return new ResponseEntity<>(CommonResponse.builder()
                .message("매칭 신청 거절 완료")
                .build(), HttpStatus.OK);
    }

}