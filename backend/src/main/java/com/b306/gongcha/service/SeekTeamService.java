package com.b306.gongcha.service;

import com.b306.gongcha.dto.request.SeekTeamRequest;
import com.b306.gongcha.dto.response.SeekTeamResponse;
import com.b306.gongcha.dto.response.UserSeekTeamResponse;

import java.util.List;

public interface SeekTeamService {

    List<SeekTeamResponse> getAllSeekTeams();
    SeekTeamResponse getSeekTeam(Long seekTeamId);
    SeekTeamRequest createSeekTeam(SeekTeamRequest seekTeamRequest);
    SeekTeamRequest updateSeekTeam(Long seekTeamId, SeekTeamRequest seekTeamRequest);
    Long deleteSeekTeam(Long seekTeamId);
    UserSeekTeamResponse requestSeekTeam(Long seekTeamId, Long userId);
    List<UserSeekTeamResponse> getUserSeekTeamByUser(Long userId);
    List<UserSeekTeamResponse> getUserSeekTeamBySeekTeam(Long seekTeamId);
    UserSeekTeamResponse getUserSeekTeam(Long seekTeamId, Long userId);
    UserSeekTeamResponse acceptSeekTeam(Long seekTeamId, Long userId);
    Long rejectSeekTeam(Long seekTeamId, Long userId);

}
