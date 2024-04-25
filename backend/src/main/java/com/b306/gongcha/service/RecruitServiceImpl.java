package com.b306.gongcha.service;

import com.b306.gongcha.dto.RecruitRequestDto;
import com.b306.gongcha.dto.RecruitResponseDto;
import com.b306.gongcha.entity.Recruit;
import com.b306.gongcha.repository.RecruitRepository;
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
        recruitRepository.save(recruit);
    }

    @Override
    public void updateRecruit(Long recruitId, RecruitRequestDto recruitRequestDto) {
        Recruit recruit = recruitRepository.findById(recruitId).orElse(null);
        if(recruit!=null) {
            Recruit updateRecruit = recruit.toBuilder()
                    .date(recruitRequestDto.getDate())
                    .address(recruitRequestDto.getAddress())
                    .field(recruitRequestDto.getField())
                    .info(recruitRequestDto.getInfo())
                    .gender(recruitRequestDto.getGender())
                    .indoor(recruitRequestDto.getIndoor())
                    .difficulty(recruitRequestDto.getDifficulty())
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


}
