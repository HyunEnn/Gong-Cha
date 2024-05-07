package com.b306.gongcha.dto.request;

import com.b306.gongcha.entity.*;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@ToString
public class TransferRequest {

    private int startTime; // 희망 신청 시간 시작
    private int endTime; // 희망 신청 시간 종료
    private String dayOfWeek; // 희망 요일 - 평일, 주말, 월~일
    private String area; // 희망 지역 - 시, 군/구 단위
    private String info; // 선수 한마디
    private Gender gender; // 성별
    private Indoor indoor; // 실내, 실외 여부
    private Difficulty difficulty; // 경기 수준
    private Status status; // 모집 상태 정보
    private Long userId; // 작성자

    public Transfer toTransfer() {
        return Transfer.builder()
                .startTime(startTime)
                .endTime(endTime)
                .dayOfWeek(dayOfWeek)
                .area(area)
                .info(info)
                .gender(gender)
                .indoor(indoor)
                .difficulty(difficulty)
                .status(status)
                .build();
    }

}
