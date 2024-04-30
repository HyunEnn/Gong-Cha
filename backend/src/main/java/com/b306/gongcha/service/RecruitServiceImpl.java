package com.b306.gongcha.service;

import com.b306.gongcha.dto.RecruitRequestDto;
import com.b306.gongcha.dto.RecruitResponseDto;
import com.b306.gongcha.entity.Recruit;
import com.b306.gongcha.entity.User;
import com.b306.gongcha.entity.UserRecruit;
import com.b306.gongcha.repository.RecruitRepository;
import com.b306.gongcha.repository.UserRecruitRepository;
import com.b306.gongcha.repository.UserRepository;
import lombok.RequiredArgsConstructor;
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

    @Override
    public List<RecruitResponseDto> getAllRecruits() {
        List<RecruitResponseDto> recruitResponseDtoList = new ArrayList<>();
        List<Recruit> recruitList = recruitRepository.findAll();
        for(Recruit r : recruitList) {
            RecruitResponseDto recruitResponseDto = r.toRecruitResponseDto();
            recruitResponseDtoList.add(recruitResponseDto);
        }
        return recruitResponseDtoList;
    }

    @Override
    public RecruitResponseDto getRecruit(Long recruitId) {
        Recruit recruit = recruitRepository.findById(recruitId).orElse(null);
        if(recruit==null) {
            return null;
        }
        RecruitResponseDto recruitResponseDto = recruit.toRecruitResponseDto();
        return recruitResponseDto;
    }

    @Override
    public void createRecruit(RecruitRequestDto recruitRequestDto) {
        Recruit recruit = recruitRequestDto.toRecruit();
        Recruit savedRecruit = recruitRepository.save(recruit); // 저장된 게시글 id 조회
        User writer = userRepository.findById(recruitRequestDto.getWriterId()).orElse(null); // 작성자 id 조회
        // 신청자가 null인 상태로 신청
        UserRecruit userRecruit = UserRecruit.builder()
                .writerUser(writer)
                .recruit_permit(false)
                .recruit(savedRecruit)
                .build();
        userRecruitRepository.save(userRecruit);
//        requestRecruit(savedRecruit.getId(), recruitRequestDto.getWriterId());

    }

    @Override
    public void updateRecruit(Long recruitId, RecruitRequestDto recruitRequestDto) {
        Recruit recruit = recruitRepository.findById(recruitId).orElse(null);
        if(recruit != null) {
            Recruit updateRecruit = recruit.toBuilder()
                    .date(recruitRequestDto.getDate())
                    .address(recruitRequestDto.getAddress())
                    .field(recruitRequestDto.getField())
                    .info(recruitRequestDto.getInfo())
                    .gender(recruitRequestDto.getGender())
                    .indoor(recruitRequestDto.getIndoor())
                    .difficulty(recruitRequestDto.getDifficulty())
                    .status(recruitRequestDto.getStatus())
                    .currentPlayers(recruitRequestDto.getCurrentPlayers())
                    .allPlayers(recruitRequestDto.getAllPlayers())
                    .build();
            recruitRepository.save(updateRecruit);
        }
    }

    @Override
    public void deleteRecruit(Long recruitId) {
        if(recruitRepository.findById(recruitId).isPresent()) {
            recruitRepository.deleteById(recruitId);
        }
    }

    @Override
    @Transactional
    public void requestRecruit(Long recruitId, Long userId) {
        Recruit recruit = recruitRepository.findById(recruitId).orElse(null);
        User user = userRepository.findById(userId).orElse(null);
        User writer = userRecruitRepository.findByRecruitIdAndUserId(recruitId, null).orElse(null).getWriterUser();
        if(recruit != null && user != null) {
            UserRecruit userRecruit = UserRecruit.builder()
                    .writerUser(writer)
                    .user(user)
                    .recruit(recruit)
                    .recruit_permit(false)
                    .build();
            userRecruitRepository.save(userRecruit);
        }
    }

    @Override
    public List<UserRecruit> getUserRecruitByUser(Long userId) {
        List<UserRecruit> userRecruitList = userRecruitRepository.findAllByUserId(userId);
        return userRecruitList;
    }
    @Override
    public List<UserRecruit> getUserRecruitByRecruit(Long recruitId) {
        List<UserRecruit> userRecruitList = userRecruitRepository.findAllByRecruitId(recruitId);
        return userRecruitList;
    }
    @Override
    public UserRecruit getUserRecruit(Long recruitId, Long userId) {
        UserRecruit userRecruit = userRecruitRepository.findByRecruitIdAndUserId(recruitId, userId).orElse(null);
        return userRecruit;
    }

    @Override
    public void acceptRecruit(Long recruitId, Long userId) {
        UserRecruit userRecruit = userRecruitRepository.findByRecruitIdAndUserId(recruitId, userId).orElse(null);
        if(userRecruit != null) {
            UserRecruit updateRecruit = userRecruit.toBuilder()
                    .recruit_permit(true)
                    .build();
            userRecruitRepository.save(updateRecruit);
        }
    }

    @Override
    public void rejectRecruit(Long recruitId, Long userId) {
        UserRecruit userRecruit = userRecruitRepository.findByRecruitIdAndUserId(recruitId, userId).orElse(null);
        if(userRecruit != null) {
            userRecruitRepository.deleteById(userRecruit.getId());
        }
    }

}
