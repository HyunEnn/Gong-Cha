package com.b306.gongcha.dto;

import com.b306.gongcha.entity.Difficulty;
import com.b306.gongcha.entity.Gender;
import com.b306.gongcha.entity.Indoor;
import lombok.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString
public class RecruitResponseDto {

//    private Long id;
    private String date;
    private String address;
    private String field;
    private String info;
    private Gender gender;
    private Indoor indoor;
    private Difficulty difficulty;
    private int currentPlayers;
    private int allPlayers;

    @Builder(toBuilder = true)
    public RecruitResponseDto(String date, String address, String field, String info, Gender gender, Indoor indoor, Difficulty difficulty, int currentPlayers, int allPlayers) {
        this.date = date;
        this.address = address;
        this.field = field;
        this.info = info;
        this.gender = gender;
        this.indoor = indoor;
        this.difficulty = difficulty;
        this.currentPlayers = currentPlayers;
        this.allPlayers = allPlayers;
    }
}
