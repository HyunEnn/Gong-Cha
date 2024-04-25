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
public class ChatRoom {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String lastMessage;  // 마지막 메세지

    @CreationTimestamp
    private LocalDateTime createAt;
}
