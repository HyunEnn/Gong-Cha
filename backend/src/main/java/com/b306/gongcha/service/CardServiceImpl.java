package com.b306.gongcha.service;

import com.b306.gongcha.dto.request.UserRatingRequest;
import com.b306.gongcha.dto.response.CardResponse;
import com.b306.gongcha.entity.Card;
import com.b306.gongcha.exception.CustomException;
import com.b306.gongcha.exception.ErrorCode;
import com.b306.gongcha.repository.CardRepository;
import com.b306.gongcha.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class CardServiceImpl implements CardService{
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

    @Override
    @Transactional
    public void userRating(UserRatingRequest cardRequest) {

        updateUserCard(cardRequest.getShooting(), "shooting");
        updateUserCard(cardRequest.getPass(), "pass");
        updateUserCard(cardRequest.getDribble(), "dribble");
        updateUserCard(cardRequest.getSpeed(), "speed");
    }

    public void updateUserCard(Long userId, String option){

        Card card = cardRepository.findByUserId(userId).orElseThrow(()-> new CustomException(ErrorCode.NOT_FOUND_USER));
        if (Objects.equals(option, "shooting")){
            card.updateShooting(card.getShooting() + 3);
        }
        else if (Objects.equals(option, "pass")){
            card.updatePass(card.getPass() + 3);
        }
        else if (Objects.equals(option, "dribble")){
            card.updateDribble(card.getDribble() + 3);
        }
        else {
            card.updateSpeed(card.getSpeed() + 3);
        }

        cardRepository.save(card);
    }
}
