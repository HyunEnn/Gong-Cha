package com.b306.gongcha.repository;

import com.b306.gongcha.entity.UserTeam;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserTeamRepository extends JpaRepository<UserTeam, Long> {

    Optional<UserTeam> findByTeamIdAndUserId(Long teamId, Long userId);
}
