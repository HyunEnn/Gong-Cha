package com.b306.gongcha.service;

import com.b306.gongcha.dto.RecruitRequestDto;
import com.b306.gongcha.dto.RecruitResponseDto;
import com.b306.gongcha.entity.UserRecruit;

import java.util.List;

public interface RecruitService {

    List<RecruitResponseDto> getAllRecruits();
    RecruitResponseDto getRecruit(Long recruitId);
    void createRecruit(RecruitRequestDto recruitRequestDto);
    void updateRecruit(Long recruitId, RecruitRequestDto recruitRequestDto);
    void deleteRecruit(Long recruitId);
    // 선수 구직 신청 요청
    void requestRecruit(Long recruitId, Long userId);
    // 신청한 사람 기준 신청 내역 조회
    List<UserRecruit> getUserRecruitByUser(Long userId);
    // 신청 받은 사람 기준 신청 내역 조회
    List<UserRecruit> getUserRecruitByRecruit(Long recruitId);
    // 신청 내역 상세 조회
    UserRecruit getUserRecruit(Long recruitId, Long userId);
    // 선수 구직 신청 승인
    void acceptRecruit(Long recruitId, Long userId);
    // 선수 구직 신청 거절
    void rejectRecruit(Long recruitId, Long userId);
}
