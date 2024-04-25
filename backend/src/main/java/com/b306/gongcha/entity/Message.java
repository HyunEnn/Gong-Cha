package com.b306.gongcha.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String context;  // 메세지 내용
    private String sender;  // 보내는 사람

    @CreationTimestamp
    private LocalDateTime createAt;  // 생성 날짜
}
