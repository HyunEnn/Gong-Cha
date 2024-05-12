package com.b306.gongcha.service;

import com.b306.gongcha.dto.request.NotificationRequest;
import com.b306.gongcha.entity.User;
import com.b306.gongcha.exception.CustomException;
import com.b306.gongcha.exception.ErrorCode;
import com.b306.gongcha.global.GetCurrentUserId;
import com.b306.gongcha.repository.UserRepository;
import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.FirebaseMessagingException;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.Notification;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class NotificationService {

    private final FirebaseMessaging firebaseMessaging;
    private final UserRepository userRepository;

    public void sendNotification(NotificationRequest request){

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_USER));

        if(user.getFirebaseToken() != null){
            Notification notification = Notification.builder()
                    .setTitle(request.getTitle())
                    .setBody(request.getBody())
                    .build();
            Message message = Message.builder()
                    .setToken(user.getFirebaseToken())
                    .setNotification(notification)
                    .build();

            try {
                firebaseMessaging.send(message);
                System.out.println("알림 전송 성공");
            } catch (FirebaseMessagingException e) {
                System.out.println("알림 전송 실패");
            }
        }
        else {
            throw new CustomException(ErrorCode.NOT_FOUND_FIREBASE_TOKEN);
        }
    }

    public void saveDeviceToken(String token){

        Long userId = GetCurrentUserId.currentUserId();
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_USER));
    }
}
