package com.b306.gongcha.entity;

import com.b306.gongcha.dto.request.SeekTeamRequest;
import com.b306.gongcha.dto.response.SeekTeamResponse;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class SeekTeam {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "seek_team_id")
    private Long id;

    private String date; // 경기 신청 시간
    private String address; // 시, 도 위치
    private String title; // 게시글 제목
    private String info; // 게시글 소개

    @Enumerated(EnumType.STRING)
    private Gender gender; // 성별

    @Enumerated(EnumType.STRING)
    private Indoor indoor; // 실내, 실외 여부

    @Enumerated(EnumType.STRING)
    private Difficulty difficulty; // 경기 수준 정보

    @Enumerated(EnumType.STRING)
    private Status status; // 모집 상태 정보

    @OneToMany(mappedBy = "seekTeam", cascade = CascadeType.REMOVE)
    private List<UserSeekTeam> userSeekTeamList = new ArrayList<>();

    public void updateSeekTeam(SeekTeamRequest seekTeamRequest) {

        this.date = seekTeamRequest.getDate();
        this.address = seekTeamRequest.getAddress();
        this.title = seekTeamRequest.getTitle();
        this.info = seekTeamRequest.getInfo();
        this.gender = seekTeamRequest.getGender();
        this.indoor = seekTeamRequest.getIndoor();
        this.difficulty = seekTeamRequest.getDifficulty();
        this.status = seekTeamRequest.getStatus();
    }

    public SeekTeamResponse toSeekTeamResponse() {

        SeekTeamResponse seekTeamResponse = SeekTeamResponse.builder()
                .id(id)
                .date(date)
                .address(address)
                .title(title)
                .info(info)
                .gender(gender)
                .indoor(indoor)
                .difficulty(difficulty)
                .status(status)
                .build();
        return seekTeamResponse;
    }

}
