package com.b306.gongcha.repository;


import com.b306.gongcha.entity.RefreshToken;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface RefreshTokenRepository extends CrudRepository<RefreshToken, Long> {

    Boolean existsByRefreshToken(String refreshToken);
    void deleteByRefreshToken(String refreshToken);
}
