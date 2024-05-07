package com.b306.gongcha.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@DynamicInsert
public class Card {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private int shooting;
    private int pass;
    private int dribble;
    private int speed;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", unique = true)
    private User user;

    @Builder
    public Card(int shooting, int pass, int dribble, int speed, User user){
        this.shooting = shooting;
        this.pass = pass;
        this.dribble = dribble;
        this.speed = speed;
        this.user = user;
    }
}
