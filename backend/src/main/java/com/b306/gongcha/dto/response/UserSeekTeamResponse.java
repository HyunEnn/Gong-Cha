package com.b306.gongcha.dto.response;

import lombok.*;

@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@ToString
public class UserSeekTeamResponse {

    private Long id;
    private Boolean seekTeamPermit;
    private String writerNickname;
    private String userNickname;

}
