package com.b306.gongcha.service;

import com.b306.gongcha.dto.response.NoticeBoxResponse;
import com.b306.gongcha.entity.Notice;
import com.b306.gongcha.entity.User;
import com.b306.gongcha.exception.CustomException;
import com.b306.gongcha.exception.ErrorCode;
import com.b306.gongcha.global.GetCurrentUserId;
import com.b306.gongcha.repository.NoticeRepository;
import com.b306.gongcha.repository.UserRepository;
import com.b306.gongcha.util.JWTUtil;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{

    private final UserRepository userRepository;
    private final FileUploadService fileUploadService;
    private final NoticeRepository noticeRepository;
    private final JWTUtil jwtUtil;
    @Override
    @Transactional
    public String updateProfile(MultipartFile file, HttpServletRequest request) {

        User user = jwtUtil.getUserFromAccessToken(request);
        if(!(user.getProfile() == null || user.getProfile().isEmpty())) {
            fileUploadService.delete(user.getProfile());
        }

        String profileURL = fileUploadService.save("user/", file);
        user.updateProfile(profileURL);

        return profileURL;
    }

    @Override
    @Transactional(readOnly = true)
    public List<NoticeBoxResponse> getNotices(HttpServletRequest request) {

        User user = jwtUtil.getUserFromAccessToken(request);
        List<Notice> notice = noticeRepository.findAllByFromUserId(user.getId());
        return NoticeBoxResponse.fromEntity(notice);
    }
}
