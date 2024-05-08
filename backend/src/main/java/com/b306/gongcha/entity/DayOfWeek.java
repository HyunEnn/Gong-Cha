package com.b306.gongcha.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@ToString
public class DayOfWeek {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "day_of_week_id")
    private Long id;

    @Column(name = "day_of_week")
    private String dayOfWeek;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "team_id")
    private Team team;

}
