package com.b306.gongcha.dto.response;

import com.b306.gongcha.entity.Role;
import lombok.*;

@Getter
@Builder
public class UserTeamResponse {

    private Role role;
    private Long teamId;
    private String userName;
    private Boolean permit;

}
