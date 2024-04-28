package com.b306.gongcha.repository;

import com.b306.gongcha.entity.ChatRoom;
import com.b306.gongcha.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Long> {
    List<Message> findByChatRoom(ChatRoom chatRoom);
}

