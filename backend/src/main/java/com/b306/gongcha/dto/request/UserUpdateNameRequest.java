package com.b306.gongcha.dto.request;

import com.b306.gongcha.entity.User;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UserUpdateNameRequest {
    private String name;

    public User toUser(User user){
        return User.builder()
                .name(user.getName())
                .build();
    }
}
