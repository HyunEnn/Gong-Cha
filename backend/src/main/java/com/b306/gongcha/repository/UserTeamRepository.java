package com.b306.gongcha.repository;

import com.b306.gongcha.entity.UserTeam;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserTeamRepository extends JpaRepository<UserTeam, Long> {

    Optional<UserTeam> findByTeamIdAndUserId(Long teamId, Long userId);
    // 승인 여부와 상관없이 신청한 모든 유저 정보 반환
    List<UserTeam> findAllByTeamId(Long teamId);
    List<UserTeam> findByUserId(Long userId);
    // 팀에 승인된 선수들만 보여주기 
    List<UserTeam> findAllByTeamIdAndPermitIsTrue(Long teamId);
    // 승인 대기 목록 선수들만 보여주기
    List<UserTeam> findAllByTeamIdAndPermitIsFalse(Long teamId);
}
