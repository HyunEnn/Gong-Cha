package com.b306.gongcha.controller;

import com.b306.gongcha.dto.request.TeamRequest;
import com.b306.gongcha.dto.response.CommonResponse;
import com.b306.gongcha.service.TeamService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "Team", description = "Team 관련 API")
@RestController
@RequiredArgsConstructor
@RequestMapping("/team")
public class TeamController {

    private final TeamService teamService;

    @Operation(
            summary = "팀 전체 조회",
            description = "팀 목록 전체 조회"
    )
    @ApiResponse(
            responseCode = "200",
            description = "팀 목록 전체 조회 완료"
    )
    @GetMapping("/")
    public ResponseEntity<CommonResponse> getAllTeams() {

        return new ResponseEntity<>(CommonResponse.builder()
                .message("선수 구인 게시글 전체 조회")
                .data(teamService.getAllTeams())
                .build(), HttpStatus.OK);
    }


    @Operation(
            summary = "팀 상세 조회",
            description = "팀 상세 정보 조회"
    )
    @ApiResponse(
            responseCode = "200",
            description = "팀 상세 정보 조회 완료"
    )
    @GetMapping("/{teamId}")
    public ResponseEntity<CommonResponse> getTeam(@PathVariable Long teamId) {

        return new ResponseEntity<>(CommonResponse.builder()
                .message("선수 구인 게시글 전체 조회")
                .data(teamService.getTeam(teamId))
                .build(), HttpStatus.OK);
    }

    @Operation(
            summary = "팀 생성",
            description = "유저가 팀 생성"
    )
    @ApiResponse(
            responseCode = "200",
            description = "팀 생성 완료"
    )
    @PostMapping("/")
    public ResponseEntity<CommonResponse> createTeam(@RequestBody TeamRequest teamRequest) {

        return new ResponseEntity<>(CommonResponse.builder()
                .message("선수 구인 게시글 전체 조회")
                .data(teamService.createTeam(teamRequest))
                .build(), HttpStatus.OK);
    }

}
