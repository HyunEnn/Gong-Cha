package com.b306.gongcha.service;

import com.b306.gongcha.dto.request.RecruitRequest;
import com.b306.gongcha.dto.response.RecruitResponse;
import com.b306.gongcha.entity.Recruit;
import com.b306.gongcha.entity.User;
import com.b306.gongcha.entity.UserRecruit;
import com.b306.gongcha.exception.CustomException;
import com.b306.gongcha.exception.ErrorCode;
import com.b306.gongcha.repository.RecruitRepository;
import com.b306.gongcha.repository.UserRecruitRepository;
import com.b306.gongcha.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Transactional
@Service
@RequiredArgsConstructor
public class RecruitServiceImpl implements RecruitService {

    private final RecruitRepository recruitRepository;
    private final UserRecruitRepository userRecruitRepository;
    private final UserRepository userRepository;

    private final Logger log = LoggerFactory.getLogger(RecruitServiceImpl.class);

    @Override
    public List<RecruitResponse> getAllRecruits() {

        List<RecruitResponse> recruitResponseList = new ArrayList<>();
        List<Recruit> recruitList = recruitRepository.findAll();
        for(Recruit r : recruitList) {
            RecruitResponse recruitResponse = r.toRecruitResponse();
            recruitResponseList.add(recruitResponse);
        }
        return recruitResponseList;
    }

    @Override
    public RecruitResponse getRecruit(Long recruitId) {

        Recruit recruit = recruitRepository.findById(recruitId).orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_BOARD));
        return recruit.toRecruitResponse();
    }

    @Override
    public RecruitRequest createRecruit(RecruitRequest recruitRequest) {

        Recruit recruit = recruitRequest.toRecruit();
        Recruit savedRecruit = recruitRepository.save(recruit);
        User writer = userRepository.findById(recruitRequest.getWriterId()).orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_USER));
        // 비어있는 dummy user 사용 - id=-1인 dummy user(Auto Increment 사용 시 id=0으로 사용 X)
        User emptyUser = userRepository.findById(-1L).orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_USER));
        // Service에서 emptyUser 생성 시 연관관계 오류 발생 + 실제로는 프로그램 시작시에만 필요
        // 현재 방법: MySQL에서 id=-1인 비어있는 dummy user 생성
//        if(emptyUser == null) {
//            emptyUser = User.builder().id(-1L).build();
//            userRepository.save(emptyUser);
//        }
        UserRecruit userRecruit = UserRecruit.builder()
                .writerUser(writer)
                .user(emptyUser)
                .recruit_permit(false)
                .recruit(savedRecruit)
                .build();
        userRecruitRepository.save(userRecruit);

        return recruitRequest;
    }

    @Override
    public RecruitRequest updateRecruit(Long recruitId, RecruitRequest recruitRequest) {

        Recruit recruit = recruitRepository.findById(recruitId).orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_BOARD));
        recruit.updateRecruit(recruitRequest);
        return recruitRequest;
    }

    @Override
    public Long deleteRecruit(Long recruitId) {

        if(recruitRepository.findById(recruitId).isPresent()) {
            userRecruitRepository.deleteAllByRecruitId(recruitId);
            recruitRepository.deleteById(recruitId);
        }
        else {
            throw new CustomException(ErrorCode.NOT_FOUND_BOARD);
        }
        return recruitId;
    }

    @Override
    public UserRecruit requestRecruit(Long recruitId, Long userId) {

        Recruit recruit = recruitRepository.findById(recruitId).orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_BOARD));
        User user = userRepository.findById(userId).orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_USER));
        User writer = userRecruitRepository.findByRecruitIdAndUserId(recruitId, -1L)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_USER)).getWriterUser();
        if(user.getId().equals(writer.getId())) { // 작성자와 신청자가 동일한 경우
            throw new CustomException(ErrorCode.BOARD_REQUEST_FAIL);
        } else if (userRecruitRepository.findByRecruitIdAndUserId(recruitId, userId).isPresent()) { // 이미 동일 게시판에 신청한 경우
            throw new CustomException(ErrorCode.BOARD_REQUEST_DUPLICATE);
        }
        UserRecruit userRecruit = UserRecruit.builder()
                .writerUser(writer)
                .user(user)
                .recruit(recruit)
                .recruit_permit(false)
                .build();
        userRecruitRepository.save(userRecruit);
        return userRecruit;
    }

    @Override
    public List<UserRecruit> getUserRecruitByUser(Long userId) {

        return userRecruitRepository.findAllByUserId(userId);
    }
    @Override
    public List<UserRecruit> getUserRecruitByRecruit(Long recruitId) {

        return userRecruitRepository.findAllByRecruitId(recruitId);
    }
    @Override
    public UserRecruit getUserRecruit(Long recruitId, Long userId) {

        return userRecruitRepository.findByRecruitIdAndUserId(recruitId, userId).orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_REQUEST));
    }

    @Override
    public UserRecruit acceptRecruit(Long recruitId, Long userId) {

        UserRecruit userRecruit = userRecruitRepository.findByRecruitIdAndUserId(recruitId, userId).orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_REQUEST));
        userRecruit.acceptRecruit();
        return userRecruit;
    }

    @Override
    public Long rejectRecruit(Long recruitId, Long userId) {

        UserRecruit userRecruit = userRecruitRepository.findByRecruitIdAndUserId(recruitId, userId).orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_REQUEST));
        userRecruitRepository.deleteById(userRecruit.getId());
        return recruitId;
    }

}
