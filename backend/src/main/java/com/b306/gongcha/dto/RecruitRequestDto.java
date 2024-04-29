package com.b306.gongcha.dto;

import com.b306.gongcha.entity.*;
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
    private Status status;
    private int currentPlayers;
    private int allPlayers;
    private Long writerId;

    @Builder(toBuilder = true)
    public RecruitRequestDto(String date, String address, String field, String info, Gender gender, Indoor indoor, Difficulty difficulty, Status status, int currentPlayers, int allPlayers, Long writerId) {
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
        this.writerId = writerId;
    }

    public Recruit toRecruit() {
        Recruit recruit = Recruit.builder()
                .date(date)
                .address(address)
                .field(field)
                .info(info)
                .gender(gender)
                .indoor(indoor)
                .difficulty(difficulty)
                .status(status)
                .currentPlayers(currentPlayers)
                .allPlayers(allPlayers)
                .build();
        return recruit;
    }

}
