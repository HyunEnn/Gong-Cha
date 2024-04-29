package com.b306.gongcha.entity;

import com.b306.gongcha.dto.RecruitRequestDto;
import com.b306.gongcha.dto.RecruitResponseDto;
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

    public RecruitResponseDto toRecruitResponseDto() {
        RecruitResponseDto recruitResponseDto = RecruitResponseDto.builder()
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
        return recruitResponseDto;
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
