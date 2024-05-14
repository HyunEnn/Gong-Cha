package com.b306.gongcha.dto.request;

import com.b306.gongcha.entity.Difficulty;
import com.b306.gongcha.entity.MatchType;
import com.b306.gongcha.entity.Status;
import lombok.Builder;
import lombok.Getter;

import java.text.DateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Getter
@Builder
public class MatchingRequest {

    private String date; // 예약 시간
    private String region; // 광역시, 도
    private String district; // 일반시, 군, 구
    private String info; // 희망 매치 시간 시작
    private Difficulty difficulty; // 경기 수준
    private Long matchingTeamId; // 작성자(팀장) id

    public void updateMatchingTeamId(Long matchingTeamId) {

        this.matchingTeamId = matchingTeamId;
    }

}
