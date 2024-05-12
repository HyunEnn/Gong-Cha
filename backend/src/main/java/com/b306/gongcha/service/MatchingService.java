package com.b306.gongcha.service;

import com.b306.gongcha.dto.request.MatchingRequest;
import com.b306.gongcha.dto.response.MatchingResponse;
import com.b306.gongcha.entity.Matching;
import com.b306.gongcha.entity.Role;
import com.b306.gongcha.entity.Team;
import com.b306.gongcha.entity.UserTeam;
import com.b306.gongcha.exception.CustomException;
import com.b306.gongcha.exception.ErrorCode;
import com.b306.gongcha.repository.MatchingAskRepository;
import com.b306.gongcha.repository.MatchingRepository;
import com.b306.gongcha.repository.UserTeamRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RequiredArgsConstructor
@Service
public class MatchingService {

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

        Matching matching = Matching.fromRequest(matchingRequest);
        matchingRepository.save(matching);
    }

    @Transactional(readOnly = true)
    public Page<MatchingResponse> getAllMatchings(Pageable pageable) {

        Page<Matching> matchings = matchingRepository.findAll(pageable);
        return matchings.map(MatchingResponse::fromEntity);
    }

    @Transactional(readOnly = true)
    public MatchingResponse getMatching(Long matchingId) {

        Matching matching = matchingRepository.findById(matchingId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_MATCHING));
        return MatchingResponse.fromEntity(matching);
    }

    public MatchingResponse updateMatching(Long matchingId, MatchingRequest matchingRequest) {

        Matching matching = matchingRepository.findById(matchingId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_MATCHING));
        matching.updateMatching(matchingRequest);
        return MatchingResponse.fromEntity(matching);
    }

    public void deleteMatching(Long matchingId) {

        if(matchingRepository.findById(matchingId).isEmpty()) {
            throw new CustomException(ErrorCode.NOT_FOUND_MATCHING);
        }
        else {
            matchingRepository.deleteById(matchingId);
        }
    }

}
