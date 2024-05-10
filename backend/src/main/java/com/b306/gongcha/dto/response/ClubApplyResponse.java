package com.b306.gongcha.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ClubApplyResponse {

    private String userName;
    private String content;

}
