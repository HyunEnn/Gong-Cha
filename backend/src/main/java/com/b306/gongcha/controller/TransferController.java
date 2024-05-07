package com.b306.gongcha.controller;

import com.b306.gongcha.dto.request.TransferRequest;
import com.b306.gongcha.dto.response.CommonResponse;
import com.b306.gongcha.service.TransferService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/transfer")
@RequiredArgsConstructor
public class TransferController {

    private final TransferService transferService;

    // 이적시장 정보 전체 조회
    @GetMapping("/")
    public ResponseEntity<CommonResponse> getAllTransfers() {

        return new ResponseEntity<>(CommonResponse.builder()
                .message("이적시장 목록 전체 조회")
                .data(transferService.getAllTransfers())
                .build(), HttpStatus.OK);
    }

    // 이적시장 정보 상세 조회
    @GetMapping("/{transferId}")
    public ResponseEntity<CommonResponse> getTransfer(@PathVariable Long transferId) {

        return new ResponseEntity<>(CommonResponse.builder()
                .message("이적시장 정보 상세 조회")
                .data(transferService.getTransfer(transferId))
                .build(), HttpStatus.OK);
    }
    
    // 이적시장 정보 작성
    @PostMapping("/")
    public ResponseEntity<CommonResponse> createTransfer(@RequestBody TransferRequest transferRequest) {

        return new ResponseEntity<>(CommonResponse.builder()
                .message("이적시장 정보 작성")
                .data(transferService.createTransfer(transferRequest))
                .build(), HttpStatus.OK);
    }

    // 이적시장 정보 수정
    @PatchMapping("/{transferId}")
    public ResponseEntity<CommonResponse> updateTransfer(@PathVariable Long transferId, @RequestBody TransferRequest transferRequest) {

        return new ResponseEntity<>(CommonResponse.builder()
                .message("이적시장 정보 수정")
                .data(transferService.updateTransfer(transferId, transferRequest))
                .build(), HttpStatus.OK);
    }

    // 이적시장 정보 삭제
    @DeleteMapping("/{transferId}")
    public ResponseEntity<CommonResponse> deleteTransfer(@PathVariable Long transferId) {

        return new ResponseEntity<>(CommonResponse.builder()
                .message("이적시장 정보 삭제")
                .data(transferService.deleteTransfer(transferId))
                .build(), HttpStatus.OK);
    }
    
    // 이적시장 선수에게 팀장이 신청
    @PostMapping("/request/{transferId}/{userId}")
    public ResponseEntity<CommonResponse> requestTransfer(@PathVariable Long transferId, @PathVariable Long userId) {

        return new ResponseEntity<>(CommonResponse.builder()
                .message("이적시장 선수에게 팀장이 신청")
                .data(transferService.requestTransfer(transferId, userId))
                .build(), HttpStatus.OK);
    }

    // 이적시장 번호로 해당 선수가 받은 신청 목록 조회
    @GetMapping("/request/{transferId}")
    public ResponseEntity<CommonResponse> getUserTransferList(@PathVariable Long transferId) {

        return new ResponseEntity<>(CommonResponse.builder()
                .message("해당 선수가 받은 신청 목록 조회")
                .data(transferService.getUserTransferByTransfer(transferId))
                .build(), HttpStatus.OK);
    }

    // 이적시장 번호와 신청 선수 번호로 개별 신청 조회
    @GetMapping("/request/{transferId}/{userId}")
    public ResponseEntity<CommonResponse> getUserTransfer(@PathVariable Long transferId, @PathVariable Long userId) {

        return new ResponseEntity<>(CommonResponse.builder()
                .message("선수 구인 게시글 구인 신청 조회")
                .data(transferService.getUserTransfer(transferId, userId))
                .build(), HttpStatus.OK);
    }

    // 이적시장 신청 승인
    @PatchMapping("/request/{transferId}/{userId}")
    public ResponseEntity<CommonResponse> acceptTransfer(@PathVariable Long transferId, @PathVariable Long userId) {

        return new ResponseEntity<>(CommonResponse.builder()
                .message("이적시장 신청 승인")
                .data(transferService.acceptTransfer(transferId, userId))
                .build(), HttpStatus.OK);
    }
    
    // 이적시장 신청 거절
    @DeleteMapping("/request/{transferId}/{userId}")
    public ResponseEntity<CommonResponse> rejectTransfer(@PathVariable Long transferId, @PathVariable Long userId) {

        return new ResponseEntity<>(CommonResponse.builder()
                .message("이적시장 신청 거절")
                .data(transferService.rejectTransfer(transferId, userId))
                .build(), HttpStatus.OK);
    }

}
