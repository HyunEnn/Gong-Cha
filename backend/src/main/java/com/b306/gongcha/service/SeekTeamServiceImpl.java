package com.b306.gongcha.service;

import com.b306.gongcha.dto.request.SeekTeamRequest;
import com.b306.gongcha.dto.response.SeekTeamResponse;
import com.b306.gongcha.dto.response.UserSeekTeamResponse;
import com.b306.gongcha.entity.SeekTeam;
import com.b306.gongcha.entity.User;
import com.b306.gongcha.entity.UserSeekTeam;
import com.b306.gongcha.exception.CustomException;
import com.b306.gongcha.exception.ErrorCode;
import com.b306.gongcha.repository.SeekTeamRepository;
import com.b306.gongcha.repository.UserRepository;
import com.b306.gongcha.repository.UserSeekTeamRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Transactional
@Service
@RequiredArgsConstructor
public class SeekTeamServiceImpl implements SeekTeamService{

    private final SeekTeamRepository seekTeamRepository;
    private final UserSeekTeamRepository userSeekTeamRepository;
    private final UserRepository userRepository;

    // 팀구해요 게시글 전체 조회
    @Override
    public List<SeekTeamResponse> getAllSeekTeams() {

        List<SeekTeamResponse> seekTeamResponseList = new ArrayList<>();
        List<SeekTeam> seekTeamList = seekTeamRepository.findAll();
        seekTeamList.forEach(s -> seekTeamResponseList.add(s.toSeekTeamResponse()));
        return seekTeamResponseList;
    }

    // 팀구해요 게시글 상세 조회
    @Override
    public SeekTeamResponse getSeekTeam(Long seekTeamId) {

        // 없는 게시글 번호로 조회 시 게시글 조회 실패 에러 반환
        SeekTeam seekTeam = seekTeamRepository.findById(seekTeamId).orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_BOARD));
        return seekTeam.toSeekTeamResponse();
    }

    // 팀구해요 게시글 작성
    @Override
    public SeekTeamRequest createSeekTeam(SeekTeamRequest seekTeamRequest) {

        // 게시글 정보, 작성자 정보 가져오기
        SeekTeam seekTeam = seekTeamRequest.toSeekTeam();
        SeekTeam savedSeekTeam = seekTeamRepository.save(seekTeam);
        User writer = userRepository.findById(seekTeamRequest.getWriterId()).orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_USER));
        // 작성자 저장을 위한 dummy user
        User emptyUser = userRepository.findById(0L).orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_USER));
        // UserSeekTeam에 작성자 정보 저장
        UserSeekTeam userSeekTeam = UserSeekTeam.builder()
                .writerUser(writer)
                .user(emptyUser)
                .seekTeamPermit(false)
                .seekTeam(savedSeekTeam)
                .build();
        userSeekTeamRepository.save(userSeekTeam);
        return seekTeamRequest;
    }

    // 팀구해요 게시글 수정
    @Override
    public SeekTeamRequest updateSeekTeam(Long seekTeamId, SeekTeamRequest seekTeamRequest) {

        // 없는 게시글 번호로 조회 시 게시글 조회 실패 에러 반환
        SeekTeam seekTeam = seekTeamRepository.findById(seekTeamId).orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_BOARD));
        seekTeam.updateSeekTeam(seekTeamRequest);
        return seekTeamRequest;
    }

    // 팀구해요 게시글 삭제
    @Override
    public Long deleteSeekTeam(Long seekTeamId) {

        // 없는 게시글 번호로 조회 시 게시글 조회 실패 에러 반환
        if(seekTeamRepository.findById(seekTeamId).isPresent()) {
            seekTeamRepository.deleteById(seekTeamId);
        }
        else {
            throw new CustomException(ErrorCode.NOT_FOUND_BOARD);
        }
        return seekTeamId;
    }

    // 팀구해요 게시글 팀 신청
    @Override
    public UserSeekTeamResponse requestSeekTeam(Long seekTeamId, Long userId) {

        // 게시글 정보, 신청자 정보, 작성자 정보 받아오기
        SeekTeam seekTeam = seekTeamRepository.findById(seekTeamId).orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_BOARD));
        User user = userRepository.findById(userId).orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_USER));
        User writer = userSeekTeamRepository.findBySeekTeamIdAndUserId(seekTeamId, 0L)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_USER)).getWriterUser();
        // 신청자 관련 예외 처리
        if(user.getId().equals(writer.getId())) { // 작성자와 신청자가 동일한 경우
            throw new CustomException(ErrorCode.BOARD_REQUEST_FAIL);
        } else if (userSeekTeamRepository.findBySeekTeamIdAndUserId(seekTeamId, userId).isPresent()) { // 이미 동일 게시판에 신청한 경우
            throw new CustomException(ErrorCode.BOARD_REQUEST_DUPLICATE);
        }
        UserSeekTeam userSeekTeam = UserSeekTeam.builder()
                .writerUser(writer)
                .user(user)
                .seekTeam(seekTeam)
                .seekTeamPermit(false)
                .build();
        return userSeekTeamRepository.save(userSeekTeam).toUserSeekTeamResponse();
    }

    // 팀장 번호로 해당 유저의 신청 내역 조회
    @Override
    public List<UserSeekTeamResponse> getUserSeekTeamByUser(Long userId) {

        List<UserSeekTeamResponse> userSeekTeamResponseList = new ArrayList<>();
        List<UserSeekTeam> userSeekTeamList = userSeekTeamRepository.findAllByUserId(userId);
        userSeekTeamList.forEach(us -> userSeekTeamResponseList.add(us.toUserSeekTeamResponse()));
        return userSeekTeamResponseList;
    }

    // 게시글 번호로 해당 게시글이 받은 신청 내역 조회
    @Override
    public List<UserSeekTeamResponse> getUserSeekTeamBySeekTeam(Long seekTeamId) {

        List<UserSeekTeamResponse> userSeekTeamResponseList = new ArrayList<>();
        List<UserSeekTeam> userSeekTeamList = userSeekTeamRepository.findAllBySeekTeamId(seekTeamId);
        userSeekTeamList.forEach(us -> userSeekTeamResponseList.add(us.toUserSeekTeamResponse()));
        return userSeekTeamResponseList;
    }

    // 게시글 번호와 신청자 번호로 해당 게시글에 신청한 팀장 내역 조회
    @Override
    public UserSeekTeamResponse getUserSeekTeam(Long seekTeamId, Long userId) {

        return userSeekTeamRepository.findBySeekTeamIdAndUserId(seekTeamId, userId).orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_REQUEST)).toUserSeekTeamResponse();
    }

    // 팀구해요 게시판 팀 신청 승인
    @Override
    public UserSeekTeamResponse acceptSeekTeam(Long seekTeamId, Long userId) {

        UserSeekTeam userSeekTeam = userSeekTeamRepository.findBySeekTeamIdAndUserId(seekTeamId, userId).orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_REQUEST));
        userSeekTeam.acceptSeekTeam();
        return userSeekTeam.toUserSeekTeamResponse();
    }

    // 팀구해요 게시판 팀 신청 거절
    @Override
    public Long rejectSeekTeam(Long seekTeamId, Long userId) {

        UserSeekTeam userSeekTeam = userSeekTeamRepository.findBySeekTeamIdAndUserId(seekTeamId, userId).orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_REQUEST));
        userSeekTeamRepository.deleteById(userSeekTeam.getId());
        return seekTeamId;
    }
}
