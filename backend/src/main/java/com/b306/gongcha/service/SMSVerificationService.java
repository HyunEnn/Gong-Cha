package com.b306.gongcha.service;

import com.b306.gongcha.dto.request.PhoneRequest;
import com.b306.gongcha.dto.request.VerifyCodeRequest;
import com.b306.gongcha.entity.SmsInfo;
import com.b306.gongcha.entity.User;
import com.b306.gongcha.exception.CustomException;
import com.b306.gongcha.exception.ErrorCode;
import com.b306.gongcha.repository.SmsInfoRepository;
import com.b306.gongcha.repository.UserRepository;
import com.b306.gongcha.util.SmsUtil;
import com.b306.gongcha.util.ValidationUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SMSVerificationService {

    private final UserRepository userRepository;
    private final SmsInfoRepository smsInfoRepository;
    private final SmsUtil smsUtil;

    public void sendSmsToUser(PhoneRequest request) {

        String name = request.getName();

        // 휴대폰 번호에 '-' 제거
        String phoneNum = request.getNumber().replaceAll("-", "");

        // 유저 이름 조회
        userRepository.findByName(name)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_ID));

        // 6자리 인증 번호 생성
        String verificationCode = ValidationUtil.createCode();

        smsUtil.sendOne(phoneNum, verificationCode);

        // entity 컨버전
        SmsInfo smsInfo = SmsInfo.from(phoneNum, verificationCode);

        // redis 에 저장
        smsInfoRepository.save(smsInfo);

    }

    public boolean verifyCode(VerifyCodeRequest request) {

        String verifyCode = request.getVerifyCode();
        String phoneNumber = request.getPhone();
        // Redis에서 저장된 인증 코드 조회
        SmsInfo savedSmsInfo = smsInfoRepository.findByPhoneNumber(phoneNumber)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_NUMBER));

        // 사용자가 입력한 코드와 저장된 코드 비교
        return savedSmsInfo.getVerificationCode().equals(verifyCode);
    }

    public void savePhoneNum(VerifyCodeRequest request) {

        String name = request.getName();
        String phone = request.getPhone();

        User user = userRepository.findByName(name)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_ID));

        user.changePhone(phone);
    }


}
