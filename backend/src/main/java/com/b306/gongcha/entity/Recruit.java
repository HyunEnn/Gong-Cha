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
    @Column(name = "current_players")
    private int currentPlayers;
    @Column(name = "all_players")
    private int allPlayers;

    public RecruitResponseDto toRecruitResponseDto() {
        RecruitResponseDto recruitResponseDto = RecruitResponseDto.builder()
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
        return recruitResponseDto;
    }

    @Builder(toBuilder = true)
    public Recruit(Long id, String address, String field, Gender gender, Indoor indoor, Difficulty difficulty, String date, int currentPlayers, int allPlayers, String info) {
        this.id = id;
        this.address = address;
        this.field = field;
        this.gender = gender;
        this.indoor = indoor;
        this.difficulty = difficulty;
        this.date = date;
        this.currentPlayers = currentPlayers;
        this.allPlayers = allPlayers;
        this.info = info;
    }

}
