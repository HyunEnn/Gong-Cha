package com.b306.gongcha.service;

import com.b306.gongcha.dto.request.TeamRequest;
import com.b306.gongcha.dto.response.TeamResponse;
import com.b306.gongcha.dto.response.UserTeamResponse;
import com.b306.gongcha.entity.*;
import com.b306.gongcha.exception.CustomException;
import com.b306.gongcha.exception.ErrorCode;
import com.b306.gongcha.repository.DayOfWeekRepository;
import com.b306.gongcha.repository.TeamRepository;
import com.b306.gongcha.repository.UserRepository;
import com.b306.gongcha.repository.UserTeamRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Transactional
@Service
@RequiredArgsConstructor
public class TeamServiceImpl implements TeamService {

    private final TeamRepository teamRepository;
    private final UserTeamRepository userTeamRepository;
    private final UserRepository userRepository;
    private final DayOfWeekRepository dayOfWeekRepository;

    // 팀 목록 게시글 전체 조회
    @Override
    public List<TeamResponse> getAllTeams() {

        List<TeamResponse> teamResponseList = new ArrayList<>();
        List<Team> teamList = teamRepository.findAll();
        teamList.forEach(t -> teamResponseList.add(t.toTeamResponse()));
        return teamResponseList;
    }

    // 팀 게시글 상세 조회
    @Override
    public TeamResponse getTeam(Long teamId) {

        Team team = teamRepository.findById(teamId).orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_BOARD));
        return team.toTeamResponse();
    }

    // 팀 정보 생성
    @Override
    public TeamResponse createTeam(TeamRequest teamRequest) {

        // 팀 정보 저장
        Team team = teamRequest.toTeam();
        Team savedTeam = teamRepository.save(team);
        
        // 요일 정보 저장
        List<String> dayOfWeekRequestList = teamRequest.getDayOfWeek();
        for(String d : dayOfWeekRequestList) {
            DayOfWeek dayOfWeek = DayOfWeek.builder()
                    .dayOfWeek(d)
                    .team(savedTeam)
                    .build();
            dayOfWeekRepository.save(dayOfWeek);
        }

        // 팀장 정보 저장
        UserTeam teamCaptain = UserTeam.builder()
                .role(Role.valueOf("팀장"))
                .user(userRepository.findById(teamRequest.getWriterId()).orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_USER)))
                .team(teamRepository.findById(savedTeam.getId()).orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_BOARD)))
                .build();
        userTeamRepository.save(teamCaptain);

        // 팀원 정보 저장
        List<User> userList = new ArrayList<>();
        List<Long> userIdList = teamRequest.getUserList();
        userIdList.forEach(ui -> userList.add(userRepository.findById(ui).orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_USER))));
        for(User u : userList) {
            UserTeam userTeam = UserTeam.builder()
                    .role(Role.valueOf("팀원"))
                    .user(u)
                    .team(savedTeam)
                    .build();
            userTeamRepository.save(userTeam);
        }
        return savedTeam.toTeamResponse();
    }

    // 팀 정보 수정
    @Override
    public TeamResponse updateTeam(Long teamId, TeamRequest teamRequest) {

//        Team team = teamRepository.findById(teamId).orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_BOARD));
//        team

        // 요일 정보 수정
        return null;
    }
    
    // 이미 존재하는 팀원 정보 삭제

    // 팀 정보 삭제
    @Override
    public Long deleteTeam(Long teamId) {

        if(teamRepository.findById(teamId).isPresent()) {
            teamRepository.deleteById(teamId);
        }
        else {
            throw new CustomException(ErrorCode.NOT_FOUND_BOARD);
        }
        return teamId;
    }

    // 선수가 팀에 신청
    @Override
    public UserTeam requestTeam(Long teamId, Long userId) {

        Team team = teamRepository.findById(teamId).orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_BOARD));
        User user = userRepository.findById(userId).orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_USER));

        return null;
    }

    // 선수 정보로 신청 목록 확인
    @Override
    public List<UserTeamResponse> getUserTeamByUser(Long userId) {
        return List.of();
    }

    // 팀 정보로 신청 목록 확인
    @Override
    public List<UserTeamResponse> getUserTeamByTeam(Long teamId) {
        return List.of();
    }

    // 팀 정보, 신청자 정보로 개별 신청 확인
    @Override
    public UserTeamResponse getUserTeam(Long teamId, Long userId) {
        return null;
    }

    // 팀장이 신청자의 신청 승인 - 팀 목록에 추가
    @Override
    public UserTeamResponse acceptTeam(Long teamId, Long userId) {

        Team team = teamRepository.findById(teamId).orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_BOARD));
        User user = userRepository.findById(userId).orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_USER));
        UserTeam userTeam = UserTeam.builder()
                .role(Role.valueOf("팀원"))
                .team(team)
                .user(user)
                .build();
        UserTeam savedUserTeam = userTeamRepository.save(userTeam);
        return savedUserTeam.toUserTeamResponse();
    }

    // 팀장이 신청자의 신청 거절
    @Override
    public Long rejectTeam(Long teamId, Long userId) {

        UserTeam userTeam = userTeamRepository.findByTeamIdAndUserId(teamId, userId).orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_REQUEST));
        userTeamRepository.deleteById(userTeam.getId());
        return userId;
    }
}
