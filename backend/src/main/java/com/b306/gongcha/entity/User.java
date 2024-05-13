package com.b306.gongcha.entity;

import com.b306.gongcha.entity.num.ClubRole;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class User extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long id;

    private String name;
    private String userInfo;
    private String email;
    private String role;
    private String provider;
    private String profile;
    private String firebaseToken;

    @OneToMany(mappedBy = "toUser")
    private List<Notice> noticeList = new ArrayList<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "club_id")
    private Club club;

    @Enumerated(EnumType.STRING)
    private ClubRole clubRole;

    // 편의 메서드
    public void updateName(String name) {
        this.name = name;
    }

    public void updateEmail(String email) {
        this.email = email;
    }

    public void updateProfile(String profile) {
        this.profile = profile;
    }

    public void changeRole(ClubRole clubRole) {
        this.clubRole = clubRole;
    }

    public void changeClub(Club club) {
        this.club = club;
    }

    public void deleteClub() {
        this.club = null;
    }

    public void quitClub() {
        club.getClubUser().remove(this);
        this.club = null;
    }
}
