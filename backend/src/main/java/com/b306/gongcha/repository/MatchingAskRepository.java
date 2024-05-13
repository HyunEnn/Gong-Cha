package com.b306.gongcha.repository;

import com.b306.gongcha.entity.MatchingAsk;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface MatchingAskRepository extends JpaRepository<MatchingAsk, Long> {

    @Query("select ma from MatchingAsk ma where ma.matching.matchingTeamId = :matchingTeamId and ma.versusTeamId = :versusTeamId")
    Optional<MatchingAsk> findByMatchingTeamIdAndVersusTeamId(Long matchingTeamId, Long versusTeamId);
    @Query("select ma from MatchingAsk ma where ma.matching.matchingTeamId = :matchingTeamId and ma.permit = false")
    List<MatchingAsk> findByMatchingTeamIdAndPermitIsFalse(Long matchingTeamId);
    @Query("select ma from MatchingAsk ma where ma.matching.matchingTeamId = :matchingTeamId and ma.permit = true")
    Optional<MatchingAsk> findByMatchingTeamIdAndPermitIsTrue(Long matchingTeamId);

}
