package com.b306.gongcha.controller;

import com.b306.gongcha.dto.request.SeekTeamRequest;
import com.b306.gongcha.dto.response.CommonResponse;
import com.b306.gongcha.service.SeekTeamService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/seek-team")
@RequiredArgsConstructor
public class SeekTeamController {

    private final SeekTeamService seekTeamService;

    // 팀구해요 게시글 전체 조회
    @GetMapping("/")
    public ResponseEntity<CommonResponse> getAllSeekTeams() {

        return new ResponseEntity<>(CommonResponse.builder()
                .message("팀구해요 게시글 전체 조회")
                .data(seekTeamService.getAllSeekTeams())
                .build(), HttpStatus.OK);
    }

    // 팀구해요 게시글 상세 조회
    @GetMapping("/{seekTeamId}")
    public ResponseEntity<CommonResponse> getSeekTeam(@PathVariable Long seekTeamId) {

        return new ResponseEntity<>(CommonResponse.builder()
                .message("팀구해요 게시글 상세 조회")
                .data(seekTeamService.getSeekTeam(seekTeamId))
                .build(), HttpStatus.OK);
    }

    // 팀구해요 게시글 작성
    @PostMapping("/")
    public ResponseEntity<CommonResponse> createSeekTeam(@RequestBody SeekTeamRequest seekTeamRequest) {

        return new ResponseEntity<>(CommonResponse.builder()
                .message("팀구해요 게시글 작성")
                .data(seekTeamService.createSeekTeam(seekTeamRequest))
                .build(), HttpStatus.OK);
    }

    // 팀구해요 게시글 수정
    @PatchMapping("/{seekTeamId}")
    public ResponseEntity<CommonResponse> updateSeekTeam(@PathVariable Long seekTeamId, @RequestBody SeekTeamRequest seekTeamRequest) {

        return new ResponseEntity<>(CommonResponse.builder()
                .message("팀구해요 게시글 수정")
                .data(seekTeamService.updateSeekTeam(seekTeamId, seekTeamRequest))
                .build(), HttpStatus.OK);
    }

    // 팀구해요 게시글 삭제
    @DeleteMapping("/{seekTeamId}")
    public ResponseEntity<CommonResponse> deleteSeekTeam(@PathVariable Long seekTeamId) {

        return new ResponseEntity<>(CommonResponse.builder()
                .message("팀구해요 게시글 삭제")
                .data(seekTeamService.deleteSeekTeam(seekTeamId))
                .build(), HttpStatus.OK);
    }

    // 팀구해요 게시글 팀 신청
    @PostMapping("/{seekTeamId}/{userId}")
    public ResponseEntity<CommonResponse> requestSeekTeam(@PathVariable Long seekTeamId, @PathVariable Long userId) {

        return new ResponseEntity<>(CommonResponse.builder()
                .message("팀구해요 게시글 팀 신청")
                .data(seekTeamService.requestSeekTeam(seekTeamId, userId))
                .build(), HttpStatus.OK);
    }

    // 팀구해요 게시글 번호로 해당 게시글 신청 목록 조회
    @GetMapping("/request/{seekTeamId}")
    public ResponseEntity<CommonResponse> getUserSeekTeamList(@PathVariable Long seekTeamId) {

        return new ResponseEntity<>(CommonResponse.builder()
                .message("팀구해요 게시글 팀 신청 목록 조회")
                .data(seekTeamService.getUserSeekTeamBySeekTeam(seekTeamId))
                .build(), HttpStatus.OK);
    }

    // 팀구해요 게시글 번호와 신청자 번호로 개별 신청 조회
    @GetMapping("/request/{seekTeamId}/{userId}")
    public ResponseEntity<CommonResponse> getUserSeekTeam(@PathVariable Long seekTeamId, @PathVariable Long userId) {

        return new ResponseEntity<>(CommonResponse.builder()
                .message("팀구해요 게시글 팀 신청 조회")
                .data(seekTeamService.getUserSeekTeam(seekTeamId, userId))
                .build(), HttpStatus.OK);
    }

    // 팀구해요 게시글 팀 신청 승인
    @PatchMapping("/{seekTeamId}/{userId}")
    public ResponseEntity<CommonResponse> acceptSeekTeam(@PathVariable Long seekTeamId, @PathVariable Long userId) {

        return new ResponseEntity<>(CommonResponse.builder()
                .message("팀구해요 게시글 팀 신청 승인")
                .data(seekTeamService.acceptSeekTeam(seekTeamId, userId))
                .build(), HttpStatus.OK);
    }

    // 팀구해요 게시글 팀 신청 거절
    @DeleteMapping("/{seekTeamId}/{userId}")
    public ResponseEntity<CommonResponse> rejectSeekTeam(@PathVariable Long seekTeamId, @PathVariable Long userId) {

        return new ResponseEntity<>(CommonResponse.builder()
                .message("팀구해요 게시글 팀 신청 거절")
                .data(seekTeamService.rejectSeekTeam(seekTeamId, userId))
                .build(), HttpStatus.OK);
    }

}
