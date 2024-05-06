package com.b306.gongcha.service;

import com.b306.gongcha.dto.request.ClubMakeRequest;
import com.b306.gongcha.entity.Club;
import com.b306.gongcha.entity.User;
import com.b306.gongcha.entity.num.ClubRole;
import com.b306.gongcha.exception.CustomException;
import com.b306.gongcha.exception.ErrorCode;
import com.b306.gongcha.repository.ClubRepository;
import com.b306.gongcha.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ClubService {

    private final ClubRepository clubRepository;
    private final UserRepository userRepository;

    public void createClub(Long userId, ClubMakeRequest clubMakeRequest) {

        // 클럽 생성
        Club club = clubMakeRequest.toEntity();

        // 클럽을 만든 유저 추가
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_USER));
        club.addClubUser(user);

        // 유저의 권한 ( 마스터 ) 로 설정
        user.changeRole(ClubRole.MASTER);

        clubRepository.save(club);
    }


}
