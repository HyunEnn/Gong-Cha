package com.b306.gongcha.entity;

import com.b306.gongcha.dto.response.UserTransferResponse;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class UserTransfer extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_transfer_id")
    private Long id;

    private Boolean permit;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user; // 신청자(팀장) ID

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "transfer_id")
    private Transfer transfer;

    public void acceptTransfer() {

        this.permit = true;
    }

    public UserTransferResponse toUserTransferResponse() {

        return UserTransferResponse.builder()
                .userId(user.getId())
                .userName(user.getName())
                .permit(permit)
                .build();
    }

}
