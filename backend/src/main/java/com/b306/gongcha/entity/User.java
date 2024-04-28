package com.b306.gongcha.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private long id;

    private String name;
    private String userInfo;
    private String email;
    private Enum role;
    private String provider;
    private String gender;
    private int mannerScore;
    private int yellowCard;

    @Builder
    public User(String name, String userInfo, String email, Enum role, String provider, String gender, int mannerScore, int yellowCard) {
        this.name = name;
        this.userInfo = userInfo;
        this.email = email;
        this.role = role;
        this.provider = provider;
        this.gender = gender;
        this.mannerScore = mannerScore;
        this.yellowCard = yellowCard;
    }
}
