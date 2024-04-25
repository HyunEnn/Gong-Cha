package com.b306.gongcha.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {
    @Override
    // 클라이언트가 메시지를 구독할 endpoint 정의
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("ws/chat")  // ws://localhost:8080/chat 호출 시 웹 소켓 연결
                .setAllowedOriginPatterns("*")  // 모든 요청 허용
                .withSockJS();  // 웹 소켓을 지원하지 않는 브라우저도 사용할 수 있게 하기 위함
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.enableSimpleBroker("/sub");
        registry.setApplicationDestinationPrefixes("/pub");
    }
}
