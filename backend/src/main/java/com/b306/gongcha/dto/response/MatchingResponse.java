package com.b306.gongcha.dto.response;

import com.b306.gongcha.entity.Difficulty;
import com.b306.gongcha.entity.Matching;
import com.b306.gongcha.entity.Status;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.TextStyle;
import java.util.Locale;

@Getter
@Builder
public class MatchingResponse {

    private Long id;
    private String date; // 경기 시간
    private String region; // 광역시, 도
    private String district; // 일반시, 군, 구
    private String info; // 모집 한마디
    private Difficulty difficulty; // 경기 수준
    private Status status; // 팀 상태 - 매칭중, 매칭완료
    private Long matchingTeamId;

    public static MatchingResponse fromEntity(Matching matching) {

        return MatchingResponse.builder()
                .id(matching.getId())
                .date(matching.getDate().format(DateTimeFormatter.ofPattern("yyyy-MM-dd E요일 HH:mm")))
                .region(matching.getRegion())
                .district(matching.getDistrict())
                .info(matching.getInfo())
                .difficulty(matching.getDifficulty())
                .status(matching.getStatus())
                .matchingTeamId(matching.getMatchingTeamId())
                .build();
    }

}
