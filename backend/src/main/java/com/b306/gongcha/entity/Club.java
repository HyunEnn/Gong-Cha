package com.b306.gongcha.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Club extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "club_id")
    private Long id;

    private String name;
    private String master;

    @Column(columnDefinition = "TEXT")
    private String desc;
    private String logo;

    public void updateName(String name) {
        this.name = name;
    }

    public void changeMaster(String master) {
        this.master = master;
    }

    public void updateLogo(String logo) {
        this.logo = logo;
    }

}
