package com.b306.gongcha.dto.request;

import com.b306.gongcha.entity.Card;
import lombok.*;

@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class CardRequest {
    private int shooting;
    private int pass;
    private int dribble;
    private int speed;

    public Card toCard(){
        Card card = Card.builder()
                .shooting(shooting)
                .pass(pass)
                .dribble(dribble)
                .speed(speed)
                .build();
        return card;
    }
}
