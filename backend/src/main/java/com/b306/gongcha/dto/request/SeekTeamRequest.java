package com.b306.gongcha.dto.request;

import com.b306.gongcha.entity.*;
import lombok.*;

@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@ToString
public class SeekTeamRequest {

    private String date;
    private String address;
    private String title;
    private String info;
    private Gender gender;
    private Indoor indoor;
    private Difficulty difficulty;
    private Status status;
    private Long writerId;

    public SeekTeam toSeekTeam() {
        SeekTeam seekTeam = SeekTeam.builder()
                .date(date)
                .address(address)
                .title(title)
                .info(info)
                .gender(gender)
                .indoor(indoor)
                .difficulty(difficulty)
                .status(status)
                .build();
        return seekTeam;
    }

}
