package com.b306.gongcha.repository;

import com.b306.gongcha.entity.DayOfWeek;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DayOfWeekRepository extends JpaRepository<DayOfWeek, Long> {
    List<DayOfWeek> findAllByTeamId(Long teamId);
    void deleteByTeamId(Long teamId);
}
