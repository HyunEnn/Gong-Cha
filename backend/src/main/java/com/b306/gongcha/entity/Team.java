package com.b306.gongcha.entity;

import com.b306.gongcha.dto.request.TeamRequest;
import com.b306.gongcha.dto.response.TeamResponse;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Team {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "team_id")
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "match_type")
    private MatchType matchType; // 매치 성격 - 내전/친선
    @Column(name = "start_time")
    private int startTime; // 희망 시간 시작
    @Column(name = "end_time")
    private int endTime; // 희망 시간 종료
    private String region; // 광역시, 도
    private String district; // 일반시, 군, 구
    @Enumerated(EnumType.STRING)
    private Difficulty difficulty; // 경기 수준
    @Enumerated(EnumType.STRING)
    @Builder.Default
    private Status status = Status.valueOf("모집중"); // 팀 상태 - 모집중, 모집완료, 매칭중, 매칭완료

    @ElementCollection(fetch = FetchType.LAZY)
    private List<String> dayOfWeek;

    // 팀원 목록
    @OneToMany(mappedBy = "team", cascade = CascadeType.REMOVE)
    @Builder.Default
    private List<UserTeam> userTeamList = new ArrayList<>();

    public void updateTeam(TeamRequest teamRequest) {

        this.matchType = teamRequest.getMatchType();
        this.startTime = teamRequest.getStartTime();
        this.endTime = teamRequest.getEndTime();
        this.region = teamRequest.getRegion();
        this.district = teamRequest.getDistrict();
        this.difficulty = teamRequest.getDifficulty();
        this.status = teamRequest.toTeam().getStatus();
        this.dayOfWeek = teamRequest.getDayOfWeek();
    }

    public void updateStatus(Status status) {

        this.status = status;
    }

    public TeamResponse toTeamResponse() {

        return TeamResponse.builder()
                .id(id)
                .matchType(matchType)
                .region(region)
                .district(district)
                .startTime(startTime)
                .endTime(endTime)
                .dayOfWeekList(dayOfWeek)
                .difficulty(difficulty)
//                .userList(userTeamList)
                .build();
    }

}
