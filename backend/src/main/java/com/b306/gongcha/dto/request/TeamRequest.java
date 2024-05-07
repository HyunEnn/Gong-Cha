package com.b306.gongcha.dto.request;

import com.b306.gongcha.entity.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@ToString
public class TeamRequest {

    private MatchType matchType; // 매치 종류 - 내전, 친선전
    private String address; // 희망 매치 장소
    private LocalDateTime startTime; // 희망 매치 시간 시작
    private LocalDateTime endTime; // 희망 매치 시간 종료
    private String[] dayOfWeek; // 희망 요일 목록
    private Difficulty difficulty; // 경기 수준
    private Long[] userList; // 참여 클럽원 목록

    public Team toTeam() {
        return Team.builder()
                .matchType(matchType)
                .startTime(startTime)
                .endTime(endTime)
                .address(address)
                .difficulty(difficulty)
                .build();
    }

}
