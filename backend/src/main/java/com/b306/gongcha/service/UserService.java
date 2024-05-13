package com.b306.gongcha.service;

import com.b306.gongcha.dto.response.NoticeBoxResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface UserService {
    String updateProfile(MultipartFile file);
    List<NoticeBoxResponse> getNotices();
}
