package com.b306.gongcha.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
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

    public void updateShooting(int update_value){
        this.shooting = update_value;
    }

    public void updatePass(int update_value){
        this.pass = update_value;
    }

    public void updateDribble(int update_value){
        this.dribble = update_value;
    }

    public void updateSpeed(int update_value){
        this.speed = update_value;
    }

    @Builder
    public Card(int shooting, int pass, int dribble, int speed, User user){
        this.shooting = shooting;
        this.pass = pass;
        this.dribble = dribble;
        this.speed = speed;
        this.user = user;
    }
}
