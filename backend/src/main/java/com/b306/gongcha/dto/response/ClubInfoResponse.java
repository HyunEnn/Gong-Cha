package com.b306.gongcha.dto.response;

import com.b306.gongcha.entity.Club;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ClubInfoResponse {

    private String logo;
    private String name;
    private String master;

    public static ClubInfoResponse fromEntity(Club club) {
        return ClubInfoResponse.builder()
                .logo(club.getLogo())
                .name(club.getName())
                .master(club.getMaster())
                .build();
    }
}
