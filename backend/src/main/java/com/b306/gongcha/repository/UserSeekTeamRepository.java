package com.b306.gongcha.repository;

import com.b306.gongcha.entity.UserRecruit;
import com.b306.gongcha.entity.UserSeekTeam;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserSeekTeamRepository extends JpaRepository<UserSeekTeam, Long> {

    List<UserSeekTeam> findAllBySeekTeamId(Long seekTeamId);
    List<UserSeekTeam> findAllByUserId(Long userId);
    Optional<UserSeekTeam> findBySeekTeamIdAndUserId(Long seekTeamId, Long userId);

}
