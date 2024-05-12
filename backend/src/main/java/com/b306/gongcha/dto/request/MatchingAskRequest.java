package com.b306.gongcha.dto.request;

import com.b306.gongcha.entity.Matching;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.Column;
import jakarta.persistence.FetchType;
import jakarta.persistence.ManyToOne;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MatchingAskRequest {

    private Long versusTeamId;
    private Boolean permit;

}
