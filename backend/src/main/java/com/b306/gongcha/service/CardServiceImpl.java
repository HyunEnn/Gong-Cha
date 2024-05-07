package com.b306.gongcha.service;

import com.b306.gongcha.dto.response.CardResponse;
import com.b306.gongcha.entity.Card;
import com.b306.gongcha.entity.User;
import com.b306.gongcha.exception.CustomException;
import com.b306.gongcha.exception.ErrorCode;
import com.b306.gongcha.repository.CardRepository;
import com.b306.gongcha.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CardServiceImpl implements CardService{
    private final UserRepository userRepository;
    private final CardRepository cardRepository;
    @Override
    public CardResponse getCard(Long userId) {

        Card card = cardRepository.findByUserId(userId).orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_USER));
        return CardResponse.builder()
                .pass(card.getPass())
                .speed(card.getSpeed())
                .shooting(card.getShooting())
                .dribble(card.getDribble())
                .build();
    }
}
