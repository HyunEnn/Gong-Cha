package com.b306.gongcha.dto.request;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
//@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class SendMessageRequest {  // 메세지 전송 요청 DTO
    private Long roomId;
    private Long senderId;
    private String content;
}
