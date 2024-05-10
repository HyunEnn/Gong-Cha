package com.b306.gongcha.service;

import com.b306.gongcha.dto.request.TransferRequest;
import com.b306.gongcha.dto.response.TransferResponse;
import com.b306.gongcha.dto.response.UserTransferResponse;
import com.b306.gongcha.entity.Transfer;
import com.b306.gongcha.entity.User;
import com.b306.gongcha.entity.UserTransfer;
import com.b306.gongcha.exception.CustomException;
import com.b306.gongcha.exception.ErrorCode;
import com.b306.gongcha.repository.TransferRepository;
import com.b306.gongcha.repository.UserRepository;
import com.b306.gongcha.repository.UserTransferRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Transactional
@Service
@RequiredArgsConstructor
public class TransferServiceImpl implements TransferService{

    private final TransferRepository transferRepository;
    private final UserTransferRepository userTransferRepository;
    private final UserRepository userRepository;

    // 이적시장 선수 전체 조회
    @Override
    public List<TransferResponse> getAllTransfers() {

        List<TransferResponse> transferResponseList = new ArrayList<>();
        List<Transfer> transferList = transferRepository.findAll();
        // 전체 리스트 조회 후 Response Dto List 형태로 변환
        transferList.forEach(t -> transferResponseList.add(t.toTransferResponse()));
        return transferResponseList;
    }

    // 이적시장 선수 상세 조회
    @Override
    public TransferResponse getTransfer(Long transferId) {

        // 조회 실패 시 해당 정보 조회 실패 에러 반환
        Transfer transfer = transferRepository.findById(transferId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_BOARD));
        return transfer.toTransferResponse();
    }

    // 이적시장 선수 정보 작성
    @Override
    public TransferResponse createTransfer(TransferRequest transferRequest) {

        Transfer transfer = transferRequest.toTransfer();
        User user = userRepository.findById(transferRequest.getWriterId())
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_USER));
        transfer.setUser(user);
        transferRepository.save(transfer);
        return transfer.toTransferResponse();
    }

    // 이적시장 선수 정보 수정
    @Override
    public TransferResponse updateTransfer(Long transferId, TransferRequest transferRequest) {

        Transfer transfer = transferRepository.findById(transferId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_BOARD));
        transfer.updateTransfer(transferRequest);
        return transfer.toTransferResponse();
    }

    // 이적시장 선수 정보 삭제
    @Override
    public Long deleteTransfer(Long transferId) {

        // 조회 실패 시 해당 정보 조회 실패 에러 반환
        if(transferRepository.findById(transferId).isEmpty()) {
            throw new CustomException(ErrorCode.NOT_FOUND_BOARD);
        }
        else {
            transferRepository.deleteById(transferId);
        }
        return transferId;
    }

    // 이적시장 합류 신청
    @Override
    public UserTransferResponse requestTransfer(Long transferId, Long userId) {

        // 이적시장 정보, 신청자 정보 받아오기
        Transfer transfer = transferRepository.findById(transferId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_BOARD));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_USER));
        // 작성자와 신청자가 동일인인 경우
        if(userId.equals(transfer.getUser().getId())) {
            throw new CustomException(ErrorCode.BOARD_REQUEST_FAIL);
        }
        // 신청자가 해당 글에 중복 신청한 경우
        else if(userTransferRepository.findByTransferIdAndUserId(transferId, userId).isPresent()) {
            throw new CustomException(ErrorCode.BOARD_REQUEST_DUPLICATE);
        }
        UserTransfer userTransfer = UserTransfer.builder()
                .permit(false)
                .transfer(transfer)
                .user(user)
                .build();
        return userTransferRepository.save(userTransfer).toUserTransferResponse();
    }

    // 신청자 번호로 해당 선수 신청 내역 조회 
    @Override
    public List<UserTransferResponse> getUserTransferByUser(Long userId) {

        List<UserTransferResponse> userTransferResponseList = new ArrayList<>();
        List<UserTransfer> userTransferList = userTransferRepository.findAllByUserId(userId);
        userTransferList.forEach(ut -> userTransferResponseList.add(ut.toUserTransferResponse()));
        return userTransferResponseList;
    }
    
    // 이적시장 번호로 해당 선수 받은 신청 내역 조회
    @Override
    public List<UserTransferResponse> getUserTransferByTransfer(Long transferId) {

        List<UserTransferResponse> userTransferResponseList = new ArrayList<>();
        List<UserTransfer> userTransferList = userTransferRepository.findAllByTransferId(transferId);
        userTransferList.forEach(ut -> userTransferResponseList.add(ut.toUserTransferResponse()));
        return userTransferResponseList;
    }

    // 이적시장 번호, 신청자 번호로 해당 게시글 신청 선수 내역 조회
    @Override
    public UserTransferResponse getUserTransfer(Long transferId, Long userId) {

        return userTransferRepository.findByTransferIdAndUserId(transferId, userId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_REQUEST)).toUserTransferResponse();
    }

    // 이적시장 신청 승인
    @Override
    public UserTransferResponse acceptTransfer(Long transferId, Long userId) {

        UserTransfer userTransfer = userTransferRepository.findByTransferIdAndUserId(transferId, userId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_REQUEST));
        userTransfer.acceptTransfer();
        return userTransfer.toUserTransferResponse();
    }

    // 이적시장 신청 거절
    @Override
    public Long rejectTransfer(Long transferId, Long userId) {

        UserTransfer userTransfer = userTransferRepository.findByTransferIdAndUserId(transferId, userId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_REQUEST));
        userTransferRepository.deleteById(userTransfer.getId());
        return transferId;
    }
}
