package com.b306.gongcha.service;

import com.b306.gongcha.dto.request.TeamRequest;
import com.b306.gongcha.dto.response.TeamResponse;
import com.b306.gongcha.dto.response.UserTeamResponse;
import com.b306.gongcha.entity.UserTeam;

import java.util.List;

public interface TeamService {

    List<TeamResponse> getAllTeams();
    TeamResponse getTeam(Long teamId);
    TeamResponse createTeam(TeamRequest teamRequest);
    TeamResponse updateTeam(Long teamId, TeamRequest teamRequest);
    Long deleteTeam(Long teamId);
    // 선수가 팀에게 참여 요청
    UserTeamResponse requestTeam(Long teamId, Long userId);
    // 신청자 기준으로 신청한 목록 조회
    List<UserTeamResponse> getUserTeamByUser(Long userId);
    // 팀 기준으로 신청 받은 목록 조회
    List<UserTeamResponse> getUserTeamByTeam(Long teamId);
    // 팀장이 선수의 신청 수락
    UserTeamResponse acceptTeam(Long teamId, Long userId);
    // 팀장이 선수의 신청 거절
    Long rejectTeam(Long teamId, Long userId);

}
