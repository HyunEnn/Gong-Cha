package com.b306.gongcha.entity;

import com.b306.gongcha.dto.response.UserTransferResponse;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class UserTransfer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_transfer_id")
    private Long id;

    private Boolean transferPermit;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "transfer_id")
    private Transfer transfer;

    public void acceptTransfer() {

        this.transferPermit = true;
    }

    public UserTransferResponse toUserTransferResponse() {

        return UserTransferResponse.builder()
                .transferId(transfer.getId())
                .userName(user.getName())
                .transferPermit(transferPermit)
                .build();
    }

}
