package com.b306.gongcha.dto.response;

import com.b306.gongcha.entity.MatchingAsk;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MatchingAskResponse {

    private Long id;
    private Long versusTeamId;
    private Boolean permit;

    public MatchingAskResponse fromEntity(MatchingAsk matchingAsk) {

        return MatchingAskResponse.builder()
                .id(matchingAsk.getId())
                .versusTeamId(matchingAsk.getVersusTeamId())
                .permit(matchingAsk.getPermit())
                .build();
    }

}
