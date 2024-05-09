package com.b306.gongcha.dto.response;

import com.b306.gongcha.entity.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Builder
public class TeamResponse {

    private Long id;
    private MatchType matchType;
    private String region;
    private String district;
    private int startTime;
    private int endTime;
    private List<String> dayOfWeekList;
    private Difficulty difficulty;
    private Status status;

    public static TeamResponse fromEntity(Team team) {

        return TeamResponse.builder()
                .id(team.getId())
                .matchType(team.getMatchType())
                .region(team.getRegion())
                .district(team.getDistrict())
                .startTime(team.getStartTime())
                .endTime(team.getEndTime())
                .dayOfWeekList(team.getDayOfWeek())
                .difficulty(team.getDifficulty())
                .status(team.getStatus())
                .build();
    }

}
