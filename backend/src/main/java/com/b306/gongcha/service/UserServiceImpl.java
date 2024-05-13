package com.b306.gongcha.service;

import com.b306.gongcha.dto.response.NoticeBoxResponse;
import com.b306.gongcha.entity.User;
import com.b306.gongcha.exception.CustomException;
import com.b306.gongcha.exception.ErrorCode;
import com.b306.gongcha.global.GetCurrentUserId;
import com.b306.gongcha.repository.UserRepository;
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
    @Override
    @Transactional
    public String updateProfile(MultipartFile file) {

        Long userId = GetCurrentUserId.currentUserId();

        User user = userRepository.findById(userId).orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_USER));
        if(!(user.getProfile() == null || user.getProfile().isEmpty())) {
            fileUploadService.delete(user.getProfile());
        }

        String profileURL = fileUploadService.save("user/", file);
        user.updateProfile(profileURL);

        return profileURL;
    }

    @Override
    public List<NoticeBoxResponse> getNotices() {
        Long userId = GetCurrentUserId.currentUserId();

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_USER));
        return NoticeBoxResponse.fromEntity(user);
    }
}
