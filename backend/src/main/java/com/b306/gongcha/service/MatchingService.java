package com.b306.gongcha.service;

import com.b306.gongcha.dto.request.MatchingAskRequest;
import com.b306.gongcha.dto.request.MatchingRequest;
import com.b306.gongcha.dto.response.MatchingAskResponse;
import com.b306.gongcha.dto.response.MatchingResponse;
import com.b306.gongcha.entity.*;
import com.b306.gongcha.exception.CustomException;
import com.b306.gongcha.exception.ErrorCode;
import com.b306.gongcha.global.GetCurrentUserId;
import com.b306.gongcha.repository.MatchingAskRepository;
import com.b306.gongcha.repository.MatchingRepository;
import com.b306.gongcha.repository.TeamRepository;
import com.b306.gongcha.repository.UserTeamRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class MatchingService {

    private final TeamRepository teamRepository;
    private final UserTeamRepository userTeamRepository;
    private final MatchingRepository matchingRepository;
    private final MatchingAskRepository matchingAskRepository;

    // 매칭 게시판에서 팀장인지 확인
    public Boolean isManager(Long userId) {

        if(userTeamRepository.findByUserIdAndRole(userId, Role.valueOf("팀장"))==null) {
            throw new CustomException(ErrorCode.NO_AUTHORITY_MANAGER);
        }
        return true;
    }
    
    // 매칭 게시판 작성
    @Transactional
    public void createMatching(MatchingRequest matchingRequest) {

        Long userId = GetCurrentUserId.currentUserId();
        if(isManager(userId)) {
            Matching matching = Matching.fromRequest(matchingRequest);
            matchingRepository.save(matching);
        }

    }

    // 매칭 게시판 전체 조회
    @Transactional(readOnly = true)
    public Page<MatchingResponse> getAllMatchings(Pageable pageable) {

        Page<Matching> matchings = matchingRepository.findAll(pageable);
        return matchings.map(MatchingResponse::fromEntity);
    }

    // 매칭 게시판 상세 조회
    @Transactional(readOnly = true)
    public MatchingResponse getMatching(Long matchingId) {

        Matching matching = matchingRepository.findById(matchingId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_MATCHING));
        return MatchingResponse.fromEntity(matching);
    }

    // 매칭 게시판 정보 수정
    public MatchingResponse updateMatching(Long matchingId, MatchingRequest matchingRequest) {

        Matching matching = matchingRepository.findById(matchingId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_MATCHING));
        matching.updateMatching(matchingRequest);
        return MatchingResponse.fromEntity(matching);
    }

    // 매칭 게시판 정보 삭제
    public void deleteMatching(Long matchingId) {

        if(matchingRepository.findById(matchingId).isEmpty()) {
            throw new CustomException(ErrorCode.NOT_FOUND_MATCHING);
        }
        else {
            matchingRepository.deleteById(matchingId);
        }
    }

    // 매칭 신청하기
    @Transactional
    public void requestMatching(Long matchingTeamId, Long versusTeamId) {

        // 신청하는 팀의 존재 여부 확인
        if(teamRepository.findById(versusTeamId).isEmpty()) {
            throw new CustomException(ErrorCode.NOT_FOUND_TEAM);
        }
        // 동일 팀으로 이미 신청했는지 확인
        else if(matchingAskRepository.findByMatchingTeamIdAndVersusTeamId(matchingTeamId, versusTeamId).isPresent()) {
            throw new CustomException(ErrorCode.BOARD_REQUEST_DUPLICATE);
        }
        else {
            MatchingAskRequest matchingAskRequest = new MatchingAskRequest(versusTeamId, false);
            MatchingAsk matchingAsk = MatchingAsk.fromRequest(matchingAskRequest);
            matchingAsk.updateMatching(matchingRepository.findById(matchingTeamId)
                    .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_MATCHING)));
            matchingAskRepository.save(matchingAsk);
        }

    }
    
    // 게시판 작성한 팀이 받은 신청 목록 조회
    @Transactional(readOnly = true)
    public List<MatchingAskResponse> getAllMatchingAsks(Long matchingTeamId) {

        List<MatchingAskResponse> matchingAskResponseList = new ArrayList<>();
        List<MatchingAsk> matchingAskList = matchingAskRepository.findByMatchingTeamIdAndPermitIsFalse(matchingTeamId);
        matchingAskList.forEach(ma -> matchingAskResponseList.add(MatchingAskResponse.fromEntity(ma)));
        return matchingAskResponseList;
    }

    // 게시판 작성한 팀장이 받은 신청 목록 조회
    @Transactional(readOnly = true)
    public List<MatchingAskResponse> getAllMatchingAsksByUserId() {

        Long userId = GetCurrentUserId.currentUserId();
        Long teamId = userTeamRepository.findByUserIdAndRole(userId, Role.valueOf("팀장")).getId();
        List<MatchingAskResponse> matchingAskResponseList = new ArrayList<>();
        List<MatchingAsk> matchingAskList = matchingAskRepository.findByMatchingTeamIdAndPermitIsFalse(teamId);
        matchingAskList.forEach(ma -> matchingAskResponseList.add(MatchingAskResponse.fromEntity(ma)));
        return matchingAskResponseList;
    }

    // 받은 신청 승인
    public void acceptMatching(Long matchingTeamId, Long versusTeamId) {

        // 신청 정보 확인
        MatchingAsk matchingAsk = matchingAskRepository.findByMatchingTeamIdAndVersusTeamId(matchingTeamId, versusTeamId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_REQUEST));
        // 신청 정보 승인 여부 확인
        if(matchingAsk.getPermit()) {
            throw new CustomException(ErrorCode.BOARD_REQUEST_DUPLICATE);
        }
        else {
            matchingAsk.updatePermit(true);
            matchingAskRepository.save(matchingAsk);
        }
    }

    // 받은 신청 거절
    public void rejectMatching(Long matchingTeamId, Long versusTeamId) {

        // 신청 정보 확인
        MatchingAsk matchingAsk = matchingAskRepository.findByMatchingTeamIdAndVersusTeamId(matchingTeamId, versusTeamId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_REQUEST));
        matchingAskRepository.delete(matchingAsk);
    }

}
