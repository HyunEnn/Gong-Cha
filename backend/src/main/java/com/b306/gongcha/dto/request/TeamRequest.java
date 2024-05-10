package com.b306.gongcha.dto.request;

import com.b306.gongcha.entity.*;
import lombok.*;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Getter
@Builder
public class TeamRequest {

    private MatchType matchType; // 매치 종류 - 내전, 친선전
    private String region; // 광역시, 도
    private String district; // 일반시, 군, 구
    private int startTime; // 희망 매치 시간 시작
    private int endTime; // 희망 매치 시간 종료
    private List<String> dayOfWeek; // 희망 요일 목록
    private Difficulty difficulty; // 경기 수준
    private Status status; // 팀 상태 - 모집중, 모집완료, 매칭중, 매칭완료
    private List<Long> userList; // 참여 클럽원 목록
    private Long writerId; // 작성자(팀장) id

    public Team toTeam() {

        return Team.builder()
                .matchType(matchType)
                .startTime(startTime)
                .endTime(endTime)
                .dayOfWeek(dayOfWeek)
                .region(region)
                .district(district)
                .difficulty(difficulty)
                .status(status)
                .build();
    }

}