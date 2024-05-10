package com.b306.gongcha.service;

import org.springframework.web.multipart.MultipartFile;

public interface UserService {
    String updateProfile(MultipartFile file);
}
