package com.b306.gongcha.entity;

import com.b306.gongcha.dto.UserDTO;
import com.b306.gongcha.dto.response.TeamResponse;
import jakarta.persistence.*;
import lombok.*;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
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

    @Column(name = "match_type")
    private MatchType matchType; // 매치 성격 - 내전/친선
    @Column(name = "start_time")
    private LocalDateTime startTime; // 희망 시간 시작
    @Column(name = "end_time")
    private LocalDateTime endTime; // 희망 시간 종료
    private String address; // 지역
    @Enumerated(EnumType.STRING)
    private Difficulty difficulty; // 경기 수준
    @Enumerated(EnumType.STRING)
    @Builder.Default
    private Status status = Status.valueOf("모집중"); // 팀 상태 - 모집중, 모집완료, 매칭중, 매칭완료

//    // 요일 목록
//    @OneToMany(mappedBy = "dayOfWeek", cascade = CascadeType.REMOVE)
//    private List<DayOfWeek> dayOfWeekList = new ArrayList<>();
//
//    // 팀원 목록
//    @OneToMany(mappedBy = "team", cascade = CascadeType.REMOVE)
//    private List<UserTeam> userTeamList = new ArrayList<>();

    public void changeStatus(Status status) {

        this.status = status;
    }

    public TeamResponse toTeamResponse() {

        return TeamResponse.builder()
                .id(id)
                .matchType(matchType)
                .address(address)
                .startTime(startTime)
                .endTime(endTime)
//                .dayOfWeek()
                .difficulty(difficulty)
//                .userList()
                .build();
    }

}
