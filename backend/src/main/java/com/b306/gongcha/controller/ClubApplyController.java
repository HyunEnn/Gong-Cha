package com.b306.gongcha.controller;

import com.b306.gongcha.dto.request.ClubApplyRequest;
import com.b306.gongcha.dto.response.CommonResponse;
import com.b306.gongcha.service.ClubApplyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/club/applies")
public class ClubApplyController {

    private final ClubApplyService clubApplyService;

    @PostMapping("/")
    public ResponseEntity<CommonResponse> applyClub(
            @RequestParam Long clubId,
            @RequestBody ClubApplyRequest request) {

        clubApplyService.applyClub(clubId, request);
        return new ResponseEntity<>(CommonResponse.builder()
                .message("클럽 신청 완료")
                .build(), HttpStatus.OK);
    }
}
