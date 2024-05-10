package com.b306.gongcha.dto.response;

import lombok.*;

@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@ToString
public class UserTransferResponse {

    private Long userId;
    private String userName;
    private Boolean permit;

}
