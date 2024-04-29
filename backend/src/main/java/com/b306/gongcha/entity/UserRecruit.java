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

    private Boolean recruit_permit;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "writer_user_id")
    private User writerUser;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    @JoinColumn(name = "recruit_id")
    private Recruit recruit;

    @Builder(toBuilder = true)
    public UserRecruit(Long id, Boolean recruit_permit, User writerUser, User user, Recruit recruit) {
        this.id = id;
        this.recruit_permit = recruit_permit;
        this.writerUser = writerUser;
        this.user = user;
        this.recruit = recruit;
    }
}
