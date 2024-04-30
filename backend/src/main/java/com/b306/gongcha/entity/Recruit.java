package com.b306.gongcha.entity;

import com.b306.gongcha.dto.request.RecruitRequest;
import com.b306.gongcha.dto.response.RecruitResponse;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Recruit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "recruit_id")
    private Long id;

    private String date;
    private String address;
    private String field;
    private String info;
    @Enumerated(EnumType.STRING)
    private Gender gender;
    @Enumerated(EnumType.STRING)
    private Indoor indoor;
    @Enumerated(EnumType.STRING)
    private Difficulty difficulty;
    @Enumerated(EnumType.STRING)
    private Status status;
    @Column(name = "current_players")
    private int currentPlayers;
    @Column(name = "all_players")
    private int allPlayers;

    public void updateRecruit(RecruitRequest recruitRequest) {

        this.date = recruitRequest.getDate();
        this.address = recruitRequest.getAddress();
        this.field = recruitRequest.getField();
        this.info = recruitRequest.getInfo();
        this.gender = recruitRequest.getGender();
        this.indoor = recruitRequest.getIndoor();
        this.difficulty = recruitRequest.getDifficulty();
        this.status = recruitRequest.getStatus();
        this.currentPlayers = recruitRequest.getCurrentPlayers();
        this.allPlayers = recruitRequest.getAllPlayers();
    }

    public RecruitResponse toRecruitResponse() {

        RecruitResponse recruitResponse = RecruitResponse.builder()
                .id(id)
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
        return recruitResponse;
    }

    @Builder(toBuilder = true)
    public Recruit(Long id, String date, String address, String field, String info, Gender gender, Indoor indoor, Difficulty difficulty, Status status, int currentPlayers, int allPlayers) {

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
