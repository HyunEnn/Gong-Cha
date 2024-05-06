package com.b306.gongcha.dto.request;

import com.b306.gongcha.entity.Club;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ClubMakeRequest {

    private String clubName;
    private String desc;
    private String logo;

    public Club toEntity() {
        return Club.builder()
                .name(clubName)
                .desc(desc)
                .logo(logo)
                .build();
    }

}
