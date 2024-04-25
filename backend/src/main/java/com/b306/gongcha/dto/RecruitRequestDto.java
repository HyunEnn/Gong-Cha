package com.b306.gongcha.dto;

import com.b306.gongcha.entity.Difficulty;
import com.b306.gongcha.entity.Gender;
import com.b306.gongcha.entity.Indoor;
import com.b306.gongcha.entity.Recruit;
import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString
public class RecruitRequestDto {

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
    public RecruitRequestDto(String date, String address, String field, String info, Gender gender, Indoor indoor, Difficulty difficulty, int currentPlayers, int allPlayers) {
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

    public Recruit toRecruit() {
        Recruit recruit = Recruit.builder()
                .date(this.getDate())
                .address(this.getAddress())
                .field(this.getField())
                .info(this.getInfo())
                .gender(this.getGender())
                .indoor(this.getIndoor())
                .difficulty(this.getDifficulty())
                .currentPlayers(this.getCurrentPlayers())
                .allPlayers(this.getAllPlayers())
                .build();
        return recruit;
    }

}
