package com.b306.gongcha.dto.response;

import com.b306.gongcha.entity.Difficulty;
import com.b306.gongcha.entity.MatchType;
import com.b306.gongcha.entity.User;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@ToString
public class TeamResponse {

    private Long id;
    private MatchType matchType;
    private String address;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private String[] dayOfWeek;
    private Difficulty difficulty;
    private User[] userList;

}
