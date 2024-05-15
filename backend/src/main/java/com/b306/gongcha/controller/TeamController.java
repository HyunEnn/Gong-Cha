package com.b306.gongcha.controller;

import com.b306.gongcha.dto.request.TeamRequest;
import com.b306.gongcha.dto.response.CommonResponse;
import com.b306.gongcha.dto.response.TeamResponse;
import com.b306.gongcha.dto.response.UserTeamResponse;
import com.b306.gongcha.exception.CustomException;
import com.b306.gongcha.exception.ErrorCode;
import com.b306.gongcha.service.TeamService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
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
    @ApiResponse(responseCode = "200", description = "팀 목록 전체 조회 완료", content = @Content(schema = @Schema(implementation = TeamResponse.class)))
    @GetMapping("")
    public ResponseEntity<CommonResponse> getAllTeams(
            @PageableDefault(sort = "createdAt", direction = Sort.Direction.DESC, size = 10) Pageable pageable) {

        return new ResponseEntity<>(CommonResponse.builder()
                .message("팀 목록 전체 조회")
                .data(teamService.getAllTeams(pageable))
                .build(), HttpStatus.OK);
    }


    @Operation(
            summary = "팀 상세 조회",
            description = "팀 상세 정보 조회"
    )
    @ApiResponses(
            value = {
                    @ApiResponse(responseCode = "200", description = "팀 상세 정보 조회 완료", content = @Content(schema = @Schema(implementation = TeamResponse.class))),
                    @ApiResponse(responseCode = "404", description = "존재하지 않는 팀입니다", content = @Content(schema = @Schema(implementation = ErrorCode.class)))
            }
    )
    @GetMapping("/{teamId}")
    public ResponseEntity<CommonResponse> getTeam(@PathVariable Long teamId) {

        return new ResponseEntity<>(CommonResponse.builder()
                .message("팀 상세 정보 조회")
                .data(teamService.getTeam(teamId))
                .build(), HttpStatus.OK);
    }

    @Operation(
            summary = "팀의 팀원 조회",
            description = "팀의 팀원들 조회"
    )
    @ApiResponses(
            value = {
                    @ApiResponse(responseCode = "200", description = "팀원들이 정상적으로 조회되었습니다.", content = @Content(schema = @Schema(implementation = UserTeamResponse.class))),
                    @ApiResponse(responseCode = "404", description = "존재하지 않는 팀입니다", content = @Content(schema = @Schema(implementation = ErrorCode.class)))
            }
    )
    @GetMapping("/{teamId}/teamUsers")
    public ResponseEntity<CommonResponse> getTeamUsers(@PathVariable Long teamId) {

        return new ResponseEntity<>(CommonResponse.builder()
                .message("팀원 조회 성공")
                .data(teamService.getTeamUsers(teamId))
                .build(), HttpStatus.OK);
    }


    @Operation(
            summary = "팀 생성",
            description = "유저가 팀 생성"
    )
    @ApiResponses(
            value = {
                    @ApiResponse(responseCode = "200", description = "팀 생성 완료", content = @Content(schema = @Schema(implementation = TeamResponse.class))),
                    @ApiResponse(responseCode = "404", description = "존재하지 않는 유저입니다", content = @Content(schema = @Schema(implementation = ErrorCode.class)))
            }
    )
    @PostMapping("")
    public ResponseEntity<CommonResponse> createTeam(@RequestBody TeamRequest teamRequest) {

        return new ResponseEntity<>(CommonResponse.builder()
                .message("선수 구인 게시글 전체 조회")
                .data(teamService.createTeam(teamRequest))
                .build(), HttpStatus.OK);
    }

    @Operation(
            summary = "팀 정보 수정",
            description = "팀장이 팀 정보 수정"
    )
    @ApiResponses(
            value = {
                    @ApiResponse(responseCode = "200", description = "팀 정보 수정 완료", content = @Content(schema = @Schema(implementation = TeamResponse.class))),
                    @ApiResponse(responseCode = "404", description = "존재하지 않는 팀입니다", content = @Content(schema = @Schema(implementation = ErrorCode.class)))
            }
    )
    @PatchMapping("/{teamId}")
    public ResponseEntity<CommonResponse> updateTeam(@PathVariable Long teamId, @RequestBody TeamRequest teamRequest) {

        return new ResponseEntity<>(CommonResponse.builder()
                .message("팀장의 팀 정보 수정")
                .data(teamService.updateTeam(teamId, teamRequest))
                .build(), HttpStatus.OK);
    }

    @Operation(
            summary = "팀 삭제",
            description = "팀장이 팀원이 없는 본인의 팀 삭제"
    )
    @ApiResponses(
            value = {
                    @ApiResponse(responseCode = "200", description = "팀 삭제 완료"),
                    @ApiResponse(responseCode = "404", description = "존재하지 않는 유저입니다", content = @Content(schema = @Schema(implementation = ErrorCode.class)))
            }
    )
    @DeleteMapping("/{teamId}")
    public ResponseEntity<CommonResponse> deleteTeam(@PathVariable Long teamId) {

        return new ResponseEntity<>(CommonResponse.builder()
                .message("팀장의 팀 정보 삭제")
                .data(teamService.deleteTeam(teamId))
                .build(), HttpStatus.OK);
    }

    @Operation(
            summary = "선수 -> 팀 참가 요청",
            description = "선수가 팀에게 팀 참여 요청"
    )
    @ApiResponses(
            value = {
                    @ApiResponse(responseCode = "200", description = "팀 참여 신청 완료", content = @Content(schema = @Schema(implementation = UserTeamResponse.class))),
                    @ApiResponse(responseCode = "404", description = "존재하지 않는 팀입니다", content = @Content(schema = @Schema(implementation = ErrorCode.class)))
            }
    )
    @PostMapping("/{teamId}/{userId}")
    public ResponseEntity<CommonResponse> requestTeam(@PathVariable Long teamId, @PathVariable Long userId) {

        return new ResponseEntity<>(CommonResponse.builder()
                .message("선수가 팀에게 팀 참여 요청")
                .data(teamService.requestTeam(teamId, userId))
                .build(), HttpStatus.OK);
    }

    @Operation(
            summary = "팀이 받은 요청 목록 조회",
            description = "팀장이 팀이 받은 요청 목록 조회"
    )
    @ApiResponses(
            value = {
                    @ApiResponse(responseCode = "200", description = "팀이 받은 요청 목록 조회", content = @Content(schema = @Schema(implementation = UserTeamResponse.class))),
                    @ApiResponse(responseCode = "404", description = "존재하지 않는 팀입니다", content = @Content(schema = @Schema(implementation = ErrorCode.class)))
            }
    )
    @GetMapping("/request/{teamId}")
    public ResponseEntity<CommonResponse> getTeamRequest(@PathVariable Long teamId) {

        return new ResponseEntity<>(CommonResponse.builder()
                .message("팀장이 팀이 받은 요청 목록 조회")
                .data(teamService.getUserTeamByTeam(teamId))
                .build(), HttpStatus.OK);
    }

    @Operation(
            summary = "선수의 요청 승인",
            description = "팀장이 선수의 참여 요청을 승인"
    )
    @ApiResponses(
            value = {
                    @ApiResponse(responseCode = "200", description = "선수 요청 승인", content = @Content(schema = @Schema(implementation = UserTeamResponse.class))),
                    @ApiResponse(responseCode = "404", description = "존재하지 않는 팀입니다", content = @Content(schema = @Schema(implementation = ErrorCode.class)))
            }
    )
    @PatchMapping("/{teamId}/{userId}")
    public ResponseEntity<CommonResponse> acceptTeam(@PathVariable Long teamId, @PathVariable Long userId) {

        return new ResponseEntity<>(CommonResponse.builder()
                .message("팀장이 선수 참여 요청 승인")
                .data(teamService.acceptTeam(teamId, userId))
                .build(), HttpStatus.OK);
    }

    @Operation(
            summary = "선수의 요청 거절",
            description = "팀장이 선수의 참여 요청을 거절"
    )
    @ApiResponses(
            value = {
                    @ApiResponse(responseCode = "200", description = "선수 요청 거절"),
                    @ApiResponse(responseCode = "404", description = "존재하지 않는 요청입니다", content = @Content(schema = @Schema(implementation = ErrorCode.class)))
            }
    )
    @DeleteMapping("/{teamId}/{userId}")
    public ResponseEntity<CommonResponse> rejectTeam(@PathVariable Long teamId, @PathVariable Long userId) {

        return new ResponseEntity<>(CommonResponse.builder()
                .message("팀장이 선수 참여 요청 거절")
                .data(teamService.rejectTeam(teamId, userId))
                .build(), HttpStatus.OK);
    }

    @Operation(
            summary = "팀장이 선수 모집 종료",
            description = "팀장이 게시판에서 선수 모집을 종료함"
    )
    @ApiResponses(
            value = {
                    @ApiResponse(responseCode = "200", description = "팀장이 선수 모집 종료"),
                    @ApiResponse(responseCode = "404", description = "존재하지 않는 팀입니다", content = @Content(schema = @Schema(implementation = ErrorCode.class)))
            }
    )
    @PatchMapping("/close/{teamId}")
    public ResponseEntity<CommonResponse> endTeamRequest(@PathVariable Long teamId) {

        return new ResponseEntity<>(CommonResponse.builder()
                .message("팀장이 선수 모집 종료")
                .data(teamService.endTeamRecruit(teamId))
                .build(), HttpStatus.OK);
    }

    @Operation(
            summary = "팀원 정보 목록 조회",
            description = "팀에서 팀원 정보 목록을 조회함"
    )
    @ApiResponse(
            responseCode = "200",
            description = "팀에서 팀원 정보 목록을 조회 성공"
    )
    @GetMapping("/{teamId}/teammates")
    public ResponseEntity<CommonResponse> getTeammates(@PathVariable Long teamId) {

        return new ResponseEntity<>(CommonResponse.builder()
                .message("팀에서 팀원 정보 목록을 조회")
                .data(teamService.getUsersByTeam(teamId))
                .build(), HttpStatus.OK);
    }

    @Operation(
            summary = "팀원 카드 목록 조회",
            description = "팀에서 팀원 카드 목록을 조회함"
    )
    @ApiResponse(
            responseCode = "200",
            description = "팀에서 팀원 카드 목록을 조회 성공"
    )
    @GetMapping("/{teamId}/teammates/cards")
    public ResponseEntity<CommonResponse> getTeammateCards(@PathVariable Long teamId) {

        return new ResponseEntity<>(CommonResponse.builder()
                .message("팀에서 팀원 카드 목록을 조회")
                .data(teamService.getCardsByTeam(teamId))
                .build(), HttpStatus.OK);
    }

}
