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

    @Query("select count(m) from Matching m where m.status = '경기종료' and m.matchingTeamId = (select ut.team.id from UserTeam ut where ut.team.status = '경기종료' and ut.user.id = (select u.id from User u where u.id = :userId))")
    int countAllByTeamIdAndStatus(Long userId);

    @Query("select count(ma) from MatchingAsk ma where ma.permit = true and ma.versusTeamId = (select ut.team.id from UserTeam ut where ut.team.status = '경기종료' and ut.user.id = (select u.id from User u where u.id = :userId))")
    int countAllByVersusTeamIdAndStatus(Long userId);

}
