package com.b306.gongcha.service;

import com.b306.gongcha.dto.response.NoticeBoxResponse;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface UserService {
    String updateProfile(MultipartFile file, HttpServletRequest request);
    List<NoticeBoxResponse> getNotices(HttpServletRequest request);
}
