package com.b306.gongcha.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum Role {
    /*
        USER: 회원
        BLOCK: 회원정지
     */
    ROLE_USER("USER"),
    ROLE_BLOCK("BLOCK");

    final String role;
}
