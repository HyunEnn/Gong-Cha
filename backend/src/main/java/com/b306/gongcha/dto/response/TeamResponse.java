package com.b306.gongcha.dto.response;

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
public class TeamResponse {

    private Long id;
    private MatchType matchType;
    private String region;
    private String district;
    private int startTime;
    private int endTime;
    private List<String> dayOfWeekList;
    private Difficulty difficulty;
    private List<UserTeamResponse> userTeamList;

    public void setUserTeamList(List<UserTeamResponse> userTeamList) {

        this.userTeamList = userTeamList;
    }



}
