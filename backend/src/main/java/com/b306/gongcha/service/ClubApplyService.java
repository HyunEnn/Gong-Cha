package com.b306.gongcha.service;

import com.b306.gongcha.dto.request.ClubApplyRequest;
import com.b306.gongcha.dto.response.ClubApplyResponse;
import com.b306.gongcha.entity.Club;
import com.b306.gongcha.entity.ClubApply;
import com.b306.gongcha.entity.User;
import com.b306.gongcha.entity.num.ClubRole;
import com.b306.gongcha.exception.CustomException;
import com.b306.gongcha.exception.ErrorCode;
import com.b306.gongcha.global.GetCurrentUserId;
import com.b306.gongcha.repository.ClubApplyRepository;
import com.b306.gongcha.repository.ClubRepository;
import com.b306.gongcha.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ClubApplyService {

    private final ClubApplyRepository clubApplyRepository;
    private final UserRepository userRepository;
    private final ClubRepository clubRepository;

    /**
     * 1. 어떤 유저가 어떤 클럽에 신청을 했는 지에 대한 요청 필요
     * 2. 클럽 마스터가 해당 요청을 승인하면 팀에 추가하고 삭제, 거절하면 그대로 삭제
     */

    public void applyClub(Long clubId, ClubApplyRequest request) {

        Long userId = GetCurrentUserId.currentUserId();

        // 유효성 검사
        User applyUser = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_ID));

        // 신청 유저가 클럽에 들어가 있는 상태인지 유효성 검사
        if (applyUser.getClub().getId() != null) {
            throw new CustomException(ErrorCode.ALREADY_EXIST_USER_IN_CLUB);
        }

        Club club = clubRepository.findById(clubId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_CLUB));

        // dto 정보를 entity 에 conversion
        ClubApply clubApply = request.fromRequestWithUserAndClub(applyUser, club);

        // db 에 저장
        clubApplyRepository.save(clubApply);
    }

    public List<ClubApplyResponse> getAllClubApplies(Long clubId) {

        Long userId = GetCurrentUserId.currentUserId();

        User clubMaster = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_ID));

        Club club = clubRepository.findById(clubId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_CLUB));

        // 현재 접속한 유저가 마스터인지 확인
        if(clubMaster.getClub().getId() == clubId && clubMaster.getClubRole() == ClubRole.MASTER) {
            List<ClubApply> clubApplies = clubApplyRepository.findAll();

            return clubApplies.stream()
                    .map(ClubApplyResponse::fromEntity)
                    .collect(Collectors.toList());
        } else {
            throw new CustomException(ErrorCode.NO_AUTHORITY);
        }

    }


    public void permitApply() {

        Long userId = GetCurrentUserId.currentUserId();

        User masterUser = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_USER));


    }
}
