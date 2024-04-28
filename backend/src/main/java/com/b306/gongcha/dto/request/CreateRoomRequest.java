package com.b306.gongcha.dto.request;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
//@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class CreateRoomRequest {  // 채팅방 생성 요청 DTO
    private Long senderId;
    private Long receiverId;
}
