package com.b306.gongcha.entity;

import com.b306.gongcha.dto.response.DayOfWeekResponse;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class DayOfWeek {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "day_of_week_id")
    private Long id;

//    private Boolean monday;
//    private Boolean tuesday;
//    private Boolean wednesday;
//    private Boolean thursday;
//    private Boolean friday;
//    private Boolean saturday;
//    private Boolean sunday;
    private String dayOfWeek;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "team_id")
    private Team team;

    public DayOfWeekResponse toDayOfResponse() {

        return DayOfWeekResponse.builder()
                .teamId(team.getId())
                .dayOfWeek(dayOfWeek)
                .build();
    }

}
