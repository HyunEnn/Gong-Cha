package com.b306.gongcha.entity;

import com.b306.gongcha.dto.request.TransferRequest;
import com.b306.gongcha.dto.response.TransferResponse;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Transfer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "transfer_id")
    private Long id;

    // ex) 08시~22시
    @Column(name = "start_time")
    private int startTime; // 희망 신청 시간 시작 - 08시
    @Column(name = "end_time")
    private int endTime; // 희망 신청 시간 종료 - 22시
    @Column(name = "day_of_week")
    private String dayOfWeek; // 희망 요일 - 평일, 주말, 월~일
    private String area; // 희망 지역 - 시, 군/구 단위
    private String info; // 선수 한마디

    @Enumerated(EnumType.STRING)
    private Gender gender; // 성별

    @Enumerated(EnumType.STRING)
    private Indoor indoor; // 실내, 실외 여부

    @Enumerated(EnumType.STRING)
    private Difficulty difficulty; // 경기 수준

    @Enumerated(EnumType.STRING)
    private Status status; // 모집 상태 정보

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    public void updateTransfer(TransferRequest transferRequest) {

        this.startTime = transferRequest.getStartTime();
        this.endTime = transferRequest.getEndTime();
        this.dayOfWeek = transferRequest.getDayOfWeek();
        this.area = transferRequest.getArea();
        this.info = transferRequest.getInfo();
        this.gender = transferRequest.getGender();
        this.indoor = transferRequest.getIndoor();
        this.difficulty = transferRequest.getDifficulty();
        this.status = transferRequest.getStatus();
        this.user = transferRequest.getUser();
    }

    public TransferResponse toTransferResponse() {

        return TransferResponse.builder()
                .id(id)
                .startTime(startTime)
                .endTime(endTime)
                .dayOfWeek(dayOfWeek)
                .area(area)
                .info(info)
                .gender(gender)
                .indoor(indoor)
                .difficulty(difficulty)
                .status(status)
                .user(user)
                .build();
    }

}
