package com.b306.gongcha.dto.response;

import com.b306.gongcha.entity.Message;
import com.b306.gongcha.entity.User;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RoomInfoResponse {
    private Long roomId;
    private User sender;
    private User receiver;
    private Message lastMessage;
}
