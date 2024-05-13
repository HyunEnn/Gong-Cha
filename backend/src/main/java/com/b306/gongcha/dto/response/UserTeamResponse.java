package com.b306.gongcha.dto.response;

import com.b306.gongcha.entity.BaseEntity;
import com.b306.gongcha.entity.Role;
import com.b306.gongcha.entity.Team;
import com.b306.gongcha.entity.UserTeam;
import lombok.*;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@Builder
public class UserTeamResponse extends BaseEntity {

    private Role role;
    private Long userId;
    private String userName;
    private Boolean permit;

    public static List<UserTeamResponse> fromEntity(Team team) {

        return team.getUserTeamList().stream()
                .map(user -> UserTeamResponse.builder()
                        .role(user.getRole())
                        .userId(user.getUser().getId())
                        .userName(user.getUser().getName())
                        .permit(user.getPermit())
                        .build())
                .collect(Collectors.toList());
    }

}
