package com.b306.gongcha.dto.response;

import com.b306.gongcha.entity.Club;
import com.b306.gongcha.entity.num.ClubRole;
import lombok.Builder;
import lombok.Getter;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@Builder
public class ClubUserResponse {

    private String userName;
    private ClubRole userRole;

    public static List<ClubUserResponse> from(Club club) {
        return club.getClubUser().stream()
                .map(user -> ClubUserResponse.builder()
                        .userName(user.getName())
                        .userRole(user.getClubRole())
                        .build())
                .collect(Collectors.toList());
    }
}
