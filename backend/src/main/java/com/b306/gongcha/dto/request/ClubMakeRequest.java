package com.b306.gongcha.dto.request;

import com.b306.gongcha.entity.Club;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ClubMakeRequest {

    private String clubName;
    private String description;
    private String logo;

}
