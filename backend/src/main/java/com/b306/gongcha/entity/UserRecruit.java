package com.b306.gongcha.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UserRecruit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "recruit_rel_id")
    private Long id;

    // Enum으로 변경? - "신청"(게시글에 신청한 상태), "승인"(신청 수락), "거절"(신청 거절 - 거절 알림, 재신청 방지)
    private String recruit_permit;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "recruit_id")
    private Recruit recruit;

    @Builder(toBuilder = true)
    public UserRecruit(Long id, String recruit_permit, User user, Recruit recruit) {
        this.id = id;
        this.recruit_permit = recruit_permit;
        this.user = user;
        this.recruit = recruit;
    }
}
