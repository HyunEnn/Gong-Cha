package com.b306.gongcha.service;

import com.b306.gongcha.dto.request.MatchingRequest;
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
    public void createMatching(MatchingRequest matchingRequest) {

        Matching matching = Matching.fromRequest(matchingRequest);
        matchingRepository.save(matching);
    }

}
