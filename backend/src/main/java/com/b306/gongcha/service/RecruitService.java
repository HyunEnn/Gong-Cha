package com.b306.gongcha.service;

import com.b306.gongcha.dto.RecruitRequestDto;
import com.b306.gongcha.dto.RecruitResponseDto;

import java.util.List;

public interface RecruitService {

    List<RecruitResponseDto> getAllRecruits();
    RecruitResponseDto getRecruit(Long recruitId);
    void createRecruit(RecruitRequestDto recruitRequestDto);
    void updateRecruit(Long recruitId, RecruitRequestDto recruitRequestDto);
    void deleteRecruit(Long recruitId);
    // 선수 구직 신청 요청
    // 선수 구직 신청 승인
    // 선수 구직 신청 거절

}
