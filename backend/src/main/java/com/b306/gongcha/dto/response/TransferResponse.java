package com.b306.gongcha.dto.response;

import com.b306.gongcha.entity.*;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@ToString
public class TransferResponse {

    private Long id;
    private MatchType matchType;
    private int startTime; // 희망 신청 시간 시작
    private int endTime; // 희망 신청 시간 종료
    private String region; // 광역시/도
    private String district; // 일반시/군/구
    private Difficulty difficulty; // 경기 수준
    private List<String> dayOfWeek; // 희망 요일
    private String info; // 선수 한마디
    private Boolean isJoined; // 선수 팀 합류 여부
    private User user; // 작성자

}
