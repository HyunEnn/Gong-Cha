package com.b306.gongcha.dto.response;

import com.b306.gongcha.entity.Club;
import com.b306.gongcha.entity.User;
import com.b306.gongcha.entity.num.ClubRole;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UserInfoResponse {

    private Long id;
    private String name;
    private Long clubId;
    private ClubRole clubRole;

    public static UserInfoResponse fromEntity(User user) {

        return UserInfoResponse.builder()
                .id(user.getId())
                .name(user.getName())
                .clubId(user.getClub().getId())
                .clubRole(ClubRole.MASTER)
                .build();
    }

}
