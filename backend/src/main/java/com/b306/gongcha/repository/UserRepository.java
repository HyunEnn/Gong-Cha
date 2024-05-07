package com.b306.gongcha.repository;

import com.b306.gongcha.entity.User;
import com.b306.gongcha.entity.num.ClubRole;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

    User findByUserInfo(String userInfo);


}
