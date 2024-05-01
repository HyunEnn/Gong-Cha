package com.b306.gongcha.entity;

import com.b306.gongcha.dto.response.RecruitResponse;
import com.b306.gongcha.dto.response.UserRecruitResponse;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class UserRecruit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "recruit_rel_id")
    private Long id;

    private Boolean recruit_permit;

    @ManyToOne(fetch = FetchType.LAZY) // EAGER로 변경 시, 선수 구인 게시글 신청 시(requestRecruit) 오류 해결
    @JoinColumn(name = "writer_user_id") // JoinColumn - 해당 오류와는 관계 없는 것으로 보임
    private User writerUser;

    @ManyToOne(fetch = FetchType.LAZY) // EAGER로 변경 시, 선수 구인 게시글 신청 승인 시(acceptRecruit) 오류 해결
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY) // EAGER로 변경 시, 선수 구인 게시글 신청 승인 시(acceptRecruit) 오류 해결
    @JoinColumn(name = "recruit_id")
    private Recruit recruit;

    public void acceptRecruit() {

        this.recruit_permit = true;
    }

    public UserRecruitResponse toUserRecruitResponse() {

        UserRecruitResponse userRecruitResponse = UserRecruitResponse.builder()
                .id(id)
                .recruit_permit(recruit_permit)
                .writerNickname(writerUser.getNickname())
                .userNickname(user.getNickname())
                .build();
        return userRecruitResponse;
    }

}
