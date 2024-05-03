package com.b306.gongcha.seekteam;

import com.b306.gongcha.dto.request.SeekTeamRequest;
import com.b306.gongcha.dto.response.SeekTeamResponse;
import com.b306.gongcha.entity.Difficulty;
import com.b306.gongcha.entity.Gender;
import com.b306.gongcha.entity.Indoor;
import com.b306.gongcha.service.SeekTeamService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@Transactional
public class SeekTeamTest {

    @Autowired
    private SeekTeamService seekTeamService;

    @Test
    public void createSeekTeamTest() {

        SeekTeamRequest seekTeamRequest = SeekTeamRequest.builder()
                .date("2024-04-26 12:34")
                .address("대전 유성구")
                .title("잘하는 팀 구합니다.")
                .info("인원 모집합니다.")
                .gender(Gender.valueOf("남성"))
                .indoor(Indoor.valueOf("실내"))
                .difficulty(Difficulty.valueOf("초급"))
                .build();

        seekTeamService.createSeekTeam(seekTeamRequest);
        Long seekTeamId = 1L;
        SeekTeamResponse seekTeamResponse = seekTeamService.getSeekTeam(seekTeamId);
        assertThat(seekTeamResponse.getTitle()).isEqualTo(seekTeamRequest.getTitle());
    }

    @Test
    public void getSeekTeamListTest() {

        SeekTeamRequest seekTeamRequest = SeekTeamRequest.builder()
                .date("2024-04-26 12:34")
                .address("대전 유성구")
                .title("잘하는 팀 구합니다.")
                .info("인원 모집합니다.")
                .gender(Gender.valueOf("남성"))
                .indoor(Indoor.valueOf("실내"))
                .difficulty(Difficulty.valueOf("초급"))
                .build();
        seekTeamService.createSeekTeam(seekTeamRequest);

        List<SeekTeamResponse> seekTeamResponseList = seekTeamService.getAllSeekTeams();
        for (SeekTeamResponse s : seekTeamResponseList) {
            System.out.println("seekTeam 정보: " + s);
        }
    }

    @Test
    public void updateSeekTeamTest() {

        SeekTeamRequest seekTeamRequest = SeekTeamRequest.builder()
                .date("2024-04-26 12:34")
                .address("대전 유성구")
                .title("잘하는 팀 구합니다.")
                .info("인원 모집합니다.")
                .gender(Gender.valueOf("남성"))
                .indoor(Indoor.valueOf("실내"))
                .difficulty(Difficulty.valueOf("초급"))
                .build();
        seekTeamService.createSeekTeam(seekTeamRequest);

        SeekTeamRequest updateSeekTeamRequest = SeekTeamRequest.builder()
                .date("2024-04-26 12:34")
                .address("대전 유성구")
                .title("매너 좋은 팀 구합니다.")
                .info("인원 모집합니다.")
                .gender(Gender.valueOf("남성"))
                .indoor(Indoor.valueOf("실내"))
                .difficulty(Difficulty.valueOf("초급"))
                .build();
        Long seekTeamId = 1L;
        seekTeamService.updateSeekTeam(seekTeamId, updateSeekTeamRequest);
        SeekTeamResponse seekTeamResponse = seekTeamService.getSeekTeam(seekTeamId);

        assertThat(seekTeamService.getSeekTeam(seekTeamId).getTitle()).isNotEqualTo(seekTeamResponse.getTitle());
        assertThat(seekTeamService.getSeekTeam(seekTeamId).getTitle()).isEqualTo(updateSeekTeamRequest.getTitle());
    }

    @Test
    public void deleteSeekTeamTest() {

        SeekTeamRequest seekTeamRequest = SeekTeamRequest.builder()
                .date("2024-04-26 12:34")
                .address("대전 유성구")
                .title("잘하는 팀 구합니다.")
                .info("인원 모집합니다.")
                .gender(Gender.valueOf("남성"))
                .indoor(Indoor.valueOf("실내"))
                .difficulty(Difficulty.valueOf("초급"))
                .build();
        seekTeamService.createSeekTeam(seekTeamRequest);

        Long seekTeamId = 1L;
        seekTeamService.deleteSeekTeam(seekTeamId);
        assertThat(seekTeamService.getSeekTeam(seekTeamId)).isNull();

    }

}
