package com.b306.gongcha.dto.request;

import com.b306.gongcha.entity.Club;
import com.b306.gongcha.entity.ClubApply;
import com.b306.gongcha.entity.User;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ClubApplyRequest {

    private String content;

    public ClubApply fromRequestWithUserAndClub(User user, Club club) {

        return ClubApply.builder()
                .user(user)
                .club(club)
                .applyContent(content)
                .build();
    }

}
