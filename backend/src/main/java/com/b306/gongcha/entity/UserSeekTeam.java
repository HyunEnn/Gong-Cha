package com.b306.gongcha.entity;

import com.b306.gongcha.dto.response.UserSeekTeamResponse;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class UserSeekTeam {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "seek_team_rel_id")
    private Long id;

    @Column(name = "seek_team_permit")
    private Boolean seekTeamPermit;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "writer_user_id")
    private User writerUser;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "seek_team_id")
    private SeekTeam seekTeam;

    public void acceptSeekTeam() {

        this.seekTeamPermit = true;
    }

    public UserSeekTeamResponse toUserSeekTeamResponse() {

        UserSeekTeamResponse userSeekTeamResponse = UserSeekTeamResponse.builder()
                .id(id)
                .seekTeamPermit(seekTeamPermit)
                .writerNickname(writerUser.getName())
                .userNickname(user.getName())
                .build();
        return userSeekTeamResponse;
    }

}
