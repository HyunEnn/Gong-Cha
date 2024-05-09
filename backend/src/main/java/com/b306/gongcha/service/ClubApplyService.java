package com.b306.gongcha.service;

import com.b306.gongcha.dto.request.ClubApplyRequest;
import com.b306.gongcha.entity.Club;
import com.b306.gongcha.entity.ClubApply;
import com.b306.gongcha.entity.User;
import com.b306.gongcha.exception.CustomException;
import com.b306.gongcha.exception.ErrorCode;
import com.b306.gongcha.global.GetCurrentUserId;
import com.b306.gongcha.repository.ClubApplyRepository;
import com.b306.gongcha.repository.ClubRepository;
import com.b306.gongcha.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

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

        Club club = clubRepository.findById(clubId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_CLUB));

        // dto 정보를 entity 에 conversion
        ClubApply clubApply = request.fromRequestWithUserAndClub(applyUser, club);

        // db 에 저장
        clubApplyRepository.save(clubApply);
    }

    public void permitApply() {

        Long userId = GetCurrentUserId.currentUserId();

        User masterUser = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_USER));


    }
}
