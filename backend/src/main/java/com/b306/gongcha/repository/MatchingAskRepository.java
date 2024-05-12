package com.b306.gongcha.repository;

import com.b306.gongcha.entity.MatchingAsk;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MatchingAskRepository extends JpaRepository<MatchingAsk, Long> {

    @Query("select ma from MatchingAsk ma where ma.matching.matchingTeamId = :matchingTeamId and ma.versusTeamId = :versusTeamId")
    MatchingAsk findByMatchingTeamIdAndVersusTeamId(Long matchingTeamId, Long versusTeamId);
    @Query("select ma from MatchingAsk ma where ma.matching.matchingTeamId = :matchingTeamId and ma.permit = false")
    List<MatchingAsk> findByMatchingTeamIdAndPermitIsFalse(Long matchingTeamId);
}
