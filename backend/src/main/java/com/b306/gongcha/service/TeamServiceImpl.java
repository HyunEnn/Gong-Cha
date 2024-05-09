package com.b306.gongcha.service;

import com.b306.gongcha.dto.request.TeamRequest;
import com.b306.gongcha.dto.response.TeamResponse;
import com.b306.gongcha.dto.response.UserTeamResponse;
import com.b306.gongcha.entity.*;
import com.b306.gongcha.exception.CustomException;
import com.b306.gongcha.exception.ErrorCode;
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

    // 팀 목록 게시글 전체 조회
    @Override
    public List<TeamResponse> getAllTeams() {

        List<TeamResponse> teamResponseList = new ArrayList<>();
        List<Team> teamList = teamRepository.findAll();
        for(Team t : teamList) {
            TeamResponse teamResponse = t.toTeamResponse();
            // 팀원 정보 가져오기
            List<UserTeamResponse> userTeamResponseList = new ArrayList<>();
            // 승인된 팀원들만 가져오기
            List<UserTeam> userTeamList = userTeamRepository.findAllByTeamIdAndPermitIsTrue(t.getId());
            userTeamList.forEach(u -> userTeamResponseList.add(u.toUserTeamResponse()));
            teamResponse.setUserTeamList(userTeamResponseList);

            teamResponseList.add(teamResponse);
        }
        return teamResponseList;
    }

    // 팀 게시글 상세 조회
    @Override
    public TeamResponse getTeam(Long teamId) {

        Team team = teamRepository.findById(teamId).orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_TEAM));
        // 팀원 정보 가져오기
        List<UserTeamResponse> userTeamResponseList = new ArrayList<>();
        // 승인된 팀원들만 가져오기
        List<UserTeam> userTeamList = userTeamRepository.findAllByTeamIdAndPermitIsTrue(teamId);
        userTeamList.forEach(u -> userTeamResponseList.add(u.toUserTeamResponse()));

        TeamResponse teamResponse = team.toTeamResponse();
        teamResponse.setUserTeamList(userTeamResponseList);
        return teamResponse;
    }

    // 팀 정보 생성
    @Override
    public TeamResponse createTeam(TeamRequest teamRequest) {

        // 팀 정보 저장
        Team team = teamRequest.toTeam();
        Team savedTeam = teamRepository.save(team);

        // 팀장 정보 저장
        UserTeam teamCaptain = UserTeam.builder()
                .role(Role.valueOf("팀장"))
                .user(userRepository.findById(teamRequest.getWriterId()).orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_USER)))
                .team(teamRepository.findById(savedTeam.getId()).orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_TEAM)))
                .permit(true)
                .build();
        userTeamRepository.save(teamCaptain);

        // 팀원 정보 저장 - 주어진 유저 id값 목록 사용
        List<User> userList = new ArrayList<>();
        List<Long> userIdList = teamRequest.getUserList();
        userIdList.forEach(ui -> userList.add(userRepository.findById(ui).orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_USER))));
        for(User user : userList) {
            UserTeam userTeam = UserTeam.builder()
                    .role(Role.valueOf("팀원"))
                    .user(user)
                    .team(savedTeam)
                    .permit(true)
                    .build();
            userTeamRepository.save(userTeam);
        }
        List<UserTeamResponse> userTeamResponseList = new ArrayList<>();
        List<UserTeam> userTeamList = userTeamRepository.findAllByTeamIdAndPermitIsTrue(savedTeam.getId());
        userTeamList.forEach(u -> userTeamResponseList.add(u.toUserTeamResponse()));
        TeamResponse teamResponse = savedTeam.toTeamResponse();
        teamResponse.setUserTeamList(userTeamResponseList);
        return teamResponse;
    }

    // 팀 정보 수정
    @Override
    public TeamResponse updateTeam(Long teamId, TeamRequest teamRequest) {

        // 팀 정보 수정
        Team team = teamRepository.findById(teamId).orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_USER));
        team.updateTeam(teamRequest);

        return team.toTeamResponse();
    }

    // 팀 정보 삭제
    @Override
    public Long deleteTeam(Long teamId) {

        if(teamRepository.findById(teamId).isPresent()) {
//            userTeamRepository.deleteAllByTeamId(teamId);
            teamRepository.deleteById(teamId);
        }
        else {
            throw new CustomException(ErrorCode.NOT_FOUND_TEAM);
        }
        return teamId;
    }

    // 선수가 팀에 신청
    @Override
    public UserTeamResponse requestTeam(Long teamId, Long userId) {

        Team team = teamRepository.findById(teamId).orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_TEAM));
        User user = userRepository.findById(userId).orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_USER));
        if(userTeamRepository.findByTeamIdAndUserId(teamId, userId).isPresent()) {
            throw new CustomException(ErrorCode.BOARD_REQUEST_DUPLICATE);
        }
        UserTeam userTeam = UserTeam.builder()
                .user(user)
                .team(team)
                .role(Role.valueOf("팀원"))
                .build();
        UserTeam seavedUserTeam = userTeamRepository.save(userTeam);
        return seavedUserTeam.toUserTeamResponse();
    }

    // 선수 정보로 신청 목록 확인
    @Override
    public List<UserTeamResponse> getUserTeamByUser(Long userId) {

        List<UserTeamResponse> userTeamResponseList = new ArrayList<>();
        List<UserTeam> userTeamList = userTeamRepository.findByUserId(userId);
        userTeamList.forEach(u -> userTeamResponseList.add(u.toUserTeamResponse()));
        return userTeamResponseList;
    }

    // 팀 정보로 신청 목록 확인
    @Override
    public List<UserTeamResponse> getUserTeamByTeam(Long teamId) {

        List<UserTeamResponse> userTeamResponseList = new ArrayList<>();
        List<UserTeam> userTeamList = userTeamRepository.findAllByTeamId(teamId);
        userTeamList.forEach(u -> userTeamResponseList.add(u.toUserTeamResponse()));
        return userTeamResponseList;
    }

    // 팀장이 신청자의 신청 승인 - 팀 목록에 추가
    @Override
    public UserTeamResponse acceptTeam(Long teamId, Long userId) {

        // 최대 인원수(7명)를 넘게 추가하는 경우 예외처리
        int teamMembers = userTeamRepository.findAllByTeamIdAndPermitIsTrue(teamId).size();
        if(teamMembers == 7) {
            throw new CustomException(ErrorCode.MEMBER_LIMIT_EXCEEDED);
        }
        UserTeam userTeam = userTeamRepository.findByTeamIdAndUserId(teamId, userId).orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_REQUEST));
        // 이미 팀에 추가된 사용자인 경우 예외처리
        if(userTeam.getPermit()) {
            throw new CustomException(ErrorCode.MEMBER_ALREADY_ACCEPTED);
        }
        userTeam.acceptUser();
        // 인원 수 추가 후 7명이 되었으면 모집 상태를 "모집 완료"로 변경
        Team team = teamRepository.findById(teamId).orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_TEAM));
        if(teamMembers == 6) {
            team.updateStatus(Status.valueOf("모집완료"));
        }
        return userTeam.toUserTeamResponse();
    }

    // 팀장이 신청자의 신청 거절
    @Override
    public Long rejectTeam(Long teamId, Long userId) {

        UserTeam userTeam = userTeamRepository.findByTeamIdAndUserId(teamId, userId).orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_USER));
        userTeamRepository.deleteById(userTeam.getId());
        return userId;
    }

    @Override
    public TeamResponse endTeamRecruit(Long teamId) {

        Team team = teamRepository.findById(teamId).orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_TEAM));
        team.updateStatus(Status.valueOf("모집완료"));
        return team.toTeamResponse();
    }
}
