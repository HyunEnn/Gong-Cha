package com.b306.gongcha.dto.request;

import com.b306.gongcha.entity.Card;
import lombok.*;

@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@ToString
public class UserRatingRequest {
    private Long shooting;
    private Long pass;
    private Long dribble;
    private Long speed;
}
