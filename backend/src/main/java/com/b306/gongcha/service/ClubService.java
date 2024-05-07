package com.b306.gongcha.service;

import com.b306.gongcha.dto.request.ClubMakeRequest;
import com.b306.gongcha.dto.response.ClubInfoResponse;
import com.b306.gongcha.entity.Club;
import com.b306.gongcha.entity.User;
import com.b306.gongcha.entity.num.ClubRole;
import com.b306.gongcha.exception.CustomException;
import com.b306.gongcha.exception.ErrorCode;
import com.b306.gongcha.repository.ClubRepository;
import com.b306.gongcha.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ClubService {

    private final ClubRepository clubRepository;
    private final UserRepository userRepository;

    @Transactional
    public void createClub(Long userId, ClubMakeRequest clubMakeRequest) {

        // 클럽 생성
        Club club = Club.fromRequest(clubMakeRequest);

        // 클럽을 만든 유저 추가
        userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_USER));

        // 이미 클럽에 있는 사용자인지 확인
        userRepository.findById(userId).ifPresent(user -> {
            if(user.getClubRole() == null) {
                club.addClubUser(user);

                // 유저의 권한 ( 마스터 ) 로 설정
                user.changeRole(ClubRole.MASTER);

                // 클럽의 마스터 설정
                club.changeMaster(user.getName());

                clubRepository.save(club);
            }
            else {
                throw new CustomException(ErrorCode.ALREADY_EXIST_USER_IN_CLUB);
            }
        });
    }

    @Transactional(readOnly = true)
    public Page<ClubInfoResponse> getAllClubs(Pageable pageable) {

        Page<Club> clubs = clubRepository.findAll(pageable);
        return clubs.map(ClubInfoResponse::fromEntity);
    }

}
