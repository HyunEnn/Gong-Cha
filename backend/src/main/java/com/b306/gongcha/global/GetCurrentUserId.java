package com.b306.gongcha.global;

import com.b306.gongcha.dto.response.CustomOAuth2User;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

public class GetCurrentUserId {

    public static Long currentUserId() {
        // SecurityContext에서 Authentication 객체 가져오기
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Long userId = null;

        // 사용자의 아이디 번호 가져오기
        if (authentication != null && authentication.isAuthenticated()) {
            CustomOAuth2User userDetails = (CustomOAuth2User) authentication.getPrincipal();
            userId = userDetails.getUserId();
            System.out.println("userId = " + userId);
        }
        return userId;
    }
}
