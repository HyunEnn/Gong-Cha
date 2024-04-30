package com.b306.gongcha.dto.response;

import com.b306.gongcha.entity.Difficulty;
import com.b306.gongcha.entity.Gender;
import com.b306.gongcha.entity.Indoor;
import com.b306.gongcha.entity.Status;
import lombok.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString
public class RecruitResponse {

    private Long id;
    private String date;
    private String address;
    private String field;
    private String info;
    private Gender gender;
    private Indoor indoor;
    private Difficulty difficulty;
    private Status status;
    private int currentPlayers;
    private int allPlayers;

    @Builder(toBuilder = true)
    public RecruitResponse(Long id, String date, String address, String field, String info, Gender gender, Indoor indoor, Difficulty difficulty, Status status, int currentPlayers, int allPlayers) {
        this.id = id;
        this.date = date;
        this.address = address;
        this.field = field;
        this.info = info;
        this.gender = gender;
        this.indoor = indoor;
        this.difficulty = difficulty;
        this.status = status;
        this.currentPlayers = currentPlayers;
        this.allPlayers = allPlayers;
    }
}
