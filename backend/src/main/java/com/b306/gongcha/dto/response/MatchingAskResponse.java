package com.b306.gongcha.dto.response;

import com.b306.gongcha.entity.MatchingAsk;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MatchingAskResponse {

    private Long id;
    private Long matchingTeamId;
    private Long versusTeamId;
    private Boolean permit;

    public static MatchingAskResponse fromEntity(MatchingAsk matchingAsk) {

        return MatchingAskResponse.builder()
                .id(matchingAsk.getId())
                .matchingTeamId(matchingAsk.getMatching().getMatchingTeamId())
                .versusTeamId(matchingAsk.getVersusTeamId())
                .permit(matchingAsk.getPermit())
                .build();
    }

}
