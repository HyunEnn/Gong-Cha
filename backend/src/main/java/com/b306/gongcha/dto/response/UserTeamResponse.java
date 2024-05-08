package com.b306.gongcha.dto.response;

import com.b306.gongcha.entity.Role;
import lombok.*;

@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@ToString
public class UserTeamResponse {

    private Long id;
    private Role role;
    private Long teamId;
    private String userName;

}
