package com.b306.gongcha.service;

import com.b306.gongcha.dto.request.UserRatingRequest;
import com.b306.gongcha.dto.response.CardResponse;

public interface CardService {
    CardResponse getCard(Long userId);

    void userRating(UserRatingRequest cardRequest);
}
