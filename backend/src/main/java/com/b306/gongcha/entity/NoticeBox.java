package com.b306.gongcha.entity;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class NoticeBox extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "notice_box_id")
    private Long id;

    @Schema(description = "알림 보내는 유저")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "from_user_id")
    private User fromUser;

    @Schema(description = "알림 받는 유저")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "to_user_id")
    private User toUser;

    @Schema(description = "알림 내용", allowableValues = "..님으로 부터 팀 가입 요청이 도착했습니다.")
    private String content;

    @Schema(description = "알림 조회 여부", allowableValues = "true")
    private Boolean readPermit;

    @Schema(description = "알림 처리 여부", allowableValues = "true")
    private Boolean responsePermit;

    @Enumerated(EnumType.STRING)
    @Schema(description = "알림 타입", allowableValues = { "invite", "join", "matching"} )
    private NoticeType noticeType;
}
