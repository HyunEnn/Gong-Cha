package com.b306.gongcha.dto.response;

import lombok.*;

@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class CardResponse {
    private int shooting;
    private int pass;
    private int dribble;
    private int speed;
}
