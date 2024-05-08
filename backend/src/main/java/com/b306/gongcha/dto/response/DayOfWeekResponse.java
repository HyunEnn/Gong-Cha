package com.b306.gongcha.dto.response;

import lombok.*;

@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@ToString
public class DayOfWeekResponse {

    Long teamId;
    String dayOfWeek;

}
