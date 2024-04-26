package com.b306.gongcha.controller;

import com.b306.gongcha.dto.RecruitRequestDto;
import com.b306.gongcha.dto.RecruitResponseDto;
import com.b306.gongcha.entity.UserRecruit;
import com.b306.gongcha.service.RecruitService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/recruit")
@RequiredArgsConstructor
public class RecruitController {

    @Autowired
    private final RecruitService recruitService;

    private Logger log = LoggerFactory.getLogger(RecruitController.class);

    // 선수 구인 게시글 전체 조회
    @GetMapping("")
    public ResponseEntity<List<RecruitResponseDto>> getAllRecruits() {
        List<RecruitResponseDto> recruitResponseDtoList = recruitService.getAllRecruits();
        return new ResponseEntity<>(recruitResponseDtoList, HttpStatus.OK);
    }

    // 선수 구인 게시글 상세 조회
    @GetMapping("/{recruitId}")
    public ResponseEntity<RecruitResponseDto> getRecruit(@PathVariable Long recruitId) {
        RecruitResponseDto recruitResponseDto = recruitService.getRecruit(recruitId);
        if(recruitResponseDto == null) {
            log.info("조회하려는 선수 구인 게시글을 찾지 못했습니다.");
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        log.info("선수 구인 게시글 정보: {}", recruitResponseDto);
        return new ResponseEntity<>(recruitResponseDto, HttpStatus.OK);
    }

    // 선수 구인 게시글 작성
    @PostMapping("")
    public ResponseEntity<Void> createRecruit(@RequestBody RecruitRequestDto recruitRequestDto) {
        recruitService.createRecruit(recruitRequestDto);
//        log.info("작성한 선수 구인 게시글 정보: {}", recruitService.getRecruit(recruitRequestDto.getId()));
        log.info("작성한 선수 구인 게시글 정보: {}", recruitRequestDto);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    // 선수 구인 게시글 수정
    @PatchMapping("/{recruitId}")
    public ResponseEntity<Void> updateRecruit(@PathVariable Long recruitId, @RequestBody RecruitRequestDto recruitRequestDto) {
        log.info("수정하려는 선수 구인 게시글 정보: {}", recruitService.getRecruit(recruitId));
        if(recruitService.getRecruit(recruitId) == null) {
            log.info("수정하고자 하는 선수 구인 게시글을 찾지 못했습니다.");
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        recruitService.updateRecruit(recruitId, recruitRequestDto);
        log.info("수정한 선수 구인 게시글 정보: {}", recruitService.getRecruit(recruitId));
        return new ResponseEntity<>(HttpStatus.OK);
    }

    // 선수 구인 게시글 삭제
    @DeleteMapping("/{recruitId}")
    public ResponseEntity<Void> deleteRecruit(@PathVariable Long recruitId) {
        if(recruitService.getRecruit(recruitId) == null) {
            log.info("삭제하고자 하는 선수 구인 게시글을 찾지 못했습니다.");
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        log.info("삭제하려는 선수 구인 게시글 정보: {}", recruitService.getRecruit(recruitId));
        recruitService.deleteRecruit(recruitId);
        log.info("해당 선수 구인 게시글이 삭제되었습니다.");
        return new ResponseEntity<>(HttpStatus.OK);
    }

    // 선수 구인 게시글 구인 신청
    @PostMapping("/{recruitId}/{userId}")
    public ResponseEntity<Void> requestRecruit(@PathVariable Long recruitId, @PathVariable Long userId) {
        if(recruitService.getRecruit(recruitId) != null) {
            recruitService.requestRecruit(recruitId, userId);
            log.info("구인 신청이 완료되었습니다.");
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/request/{recruitId}")
    public ResponseEntity<List<UserRecruit>> getUserRecruitList(@PathVariable Long recruitId) {
        List<UserRecruit> userRecruitList = recruitService.getUserRecruitByRecruit(recruitId);
        return new ResponseEntity<>(userRecruitList, HttpStatus.OK);
    }

    @GetMapping("/request/{recruitId}/{userId}")
    public ResponseEntity<UserRecruit> getUserRecruit(@PathVariable Long recruitId, @PathVariable Long userId) {
        UserRecruit userRecruit = recruitService.getUserRecruit(recruitId, userId);
        return new ResponseEntity<>(userRecruit, HttpStatus.OK);
    }

    // 선수 구인 게시글 구인 신청 승인 - 경로 중복 오류: accept, reject 등 표시 필요 or accept 또는 reject 입력을 받아서 저장
    // 승인 시 신청 선수 정보를 신청한 게시글의 팀에 추가
    @PatchMapping("/{recruitId}/accept/{userId}") // 변경 예정 - API 컨벤션: API에 행위가 들어가면 안됨
    public ResponseEntity<Void> acceptRecruit(@PathVariable Long recruitId, @PathVariable Long userId) {
        if(recruitService.getRecruit(recruitId) != null) {
            recruitService.acceptRecruit(recruitId, userId);
            log.info("구인 신청이 승인되었습니다.");
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

    // 선수 구인 게시글 구인 신청 거절
    // 신청 정보 삭제 or 거절 상태?
    @PatchMapping("/{recruitId}/reject/{userId}") // 변경 예정 - API 컨벤션: API에 행위가 들어가면 안됨
    public ResponseEntity<Void> rejectRecruit(@PathVariable Long recruitId, @PathVariable Long userId) {
        if(recruitService.getRecruit(recruitId) != null) {
            recruitService.rejectRecruit(recruitId, userId);
            log.info("구인 신청이 거절되었습니다.");
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
