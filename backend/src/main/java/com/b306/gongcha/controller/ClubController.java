package com.b306.gongcha.controller;

import com.b306.gongcha.dto.request.ClubMakeRequest;
import com.b306.gongcha.dto.response.CommonResponse;
import com.b306.gongcha.dto.response.CustomOAuth2User;
import com.b306.gongcha.service.ClubService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@Tag(name = "Club", description = "Club 관련 API")
@RestController
@RequiredArgsConstructor
@RequestMapping("/club")
public class ClubController {

    private final ClubService clubService;

    @Operation(
            summary = "클럽 생성",
            description = "유저가 클럽을 생성함."
    )
    @ApiResponse(
        responseCode = "200",
        description = "클럽이 정상적으로 생성되었습니다."
    )
    @PostMapping("/create")
    public ResponseEntity<CommonResponse> createClub(@RequestBody ClubMakeRequest request) {

        Long userId = currentUserId();
        clubService.createClub(userId, request);
        return new ResponseEntity<>(CommonResponse.builder()
                .message("클럽 생성 완료")
                .build(), HttpStatus.OK);
    }


    @Operation(
            summary = "클럽 전체 조회",
            description = "클럽에 대한 값들을 페이지네이션으로 조회"
    )
    @ApiResponse(
            responseCode = "200",
            description = "클럽 조회가 정상적으로 조회되었습니다."
    )
    @GetMapping("/clubs")
    public ResponseEntity<CommonResponse> getAllClubs(
            @PageableDefault(sort = "createdAt", direction = Sort.Direction.DESC, size = 10) Pageable pageable) {

        return new ResponseEntity<>(CommonResponse.builder()
                .message("클럽 전체 조회 완료")
                .data(clubService.getAllClubs(pageable))
                .build(), HttpStatus.OK);
    }

    @Operation(
            summary = "클럽 삭제",
            description = "클럽 마스터가 클럽을 삭제"
    )
    @ApiResponse(
            responseCode = "200",
            description = "클럽 삭제가 정상 처리되었습니다."
    )
    @DeleteMapping("/delete/{clubId}")
    public ResponseEntity<CommonResponse> deleteClub(@PathVariable Long clubId) {

        Long userId = currentUserId();
        clubService.deleteClub(userId, clubId);

        return new ResponseEntity<>(CommonResponse.builder()
                .message("삭제가 처리되었습니다.")
                .build(), HttpStatus.OK);
    }

    @Operation(
            summary = "클럽 상세 조회",
            description = "클럽에 대한 세부 내용 조회"
    )
    @ApiResponse(
            responseCode = "200",
            description = "클럽 상세 조회가 완료되었습니다."
    )
    @GetMapping("/{clubId}")
    public ResponseEntity<CommonResponse> getClubDetail(@PathVariable Long clubId) {

        return new ResponseEntity<>(CommonResponse.builder()
                .message("클럽 상세 조회 성공")
                .data(clubService.clubDetail(clubId))
                .build(), HttpStatus.OK);

    }


    private static Long currentUserId() {
        // SecurityContext에서 Authentication 객체 가져오기
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Long userId = null;

        // 사용자의 아이디 번호 가져오기
        if (authentication != null && authentication.isAuthenticated()) {
            CustomOAuth2User userDetails = (CustomOAuth2User) authentication.getPrincipal();
            userId = userDetails.getUserId();
            System.out.println("userId = " + userId);
        }
        return userId;
    }

}
