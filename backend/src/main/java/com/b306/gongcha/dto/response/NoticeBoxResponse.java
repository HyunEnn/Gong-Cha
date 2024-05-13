package com.b306.gongcha.dto.response;

import com.b306.gongcha.entity.Club;
import com.b306.gongcha.entity.Notice;
import com.b306.gongcha.entity.NoticeType;
import com.b306.gongcha.entity.User;
import lombok.Builder;
import lombok.Getter;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@Builder
public class NoticeBoxResponse {
    private String content;
    private String fromUser;
    private String toUser;
    private NoticeType noticeType;
    private Boolean readPermit;
    private Boolean responsePermit;
    public static List<NoticeBoxResponse> fromEntity(User user) {
        return user.getNoticeList().stream()
                .map(notice -> NoticeBoxResponse.builder()
                        .content(notice.getContent())
                        .fromUser(notice.getFromUser().getName())
                        .noticeType(notice.getNoticeType())
                        .readPermit(notice.getReadPermit())
                        .responsePermit(notice.getResponsePermit())
                        .build())
                .collect(Collectors.toList());
    }
}
