package com.b306.gongcha.repository;

import com.b306.gongcha.entity.Card;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public interface CardRepository extends JpaRepository<Card, Long> {
    Optional<Card> findByUserId(Long userId);

//    @Query("select m from Card m where m.user.id = :shooting or m.user.id = :pass or m.user.id = :dribble or m.user.id = :speed")
//    List<Card> findByUserId(@Param("shooting") Long shooting,
//                            @Param("pass") Long pass,
//                            @Param("dribble") Long dribble,
//                            @Param("speed") Long speed);
}