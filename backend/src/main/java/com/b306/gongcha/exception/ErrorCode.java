package com.b306.gongcha.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@RequiredArgsConstructor
@Getter
public enum ErrorCode {

    NOT_FOUND_ID(HttpStatus.NOT_FOUND, "해당 아이디를 찾을 수 없습니다."),
    NOT_FOUND_AUTHENTICATION(HttpStatus.UNAUTHORIZED, "인증 정보가 없습니다."),
    NOT_FOUND_CARD(HttpStatus.NOT_FOUND, "해당 선수카드를 찾을 수 없습니다."),
    NOT_EXIST_REFRESH_TOKEN(HttpStatus.UNAUTHORIZED, "존재하지 않는 리프레시 토큰입니다."),
    BLANK_TOKEN_HEADER(HttpStatus.UNAUTHORIZED, "헤더에 토큰이 없습니다."),
    NOT_FOUND_TOKEN(HttpStatus.NOT_FOUND, "존재하지 않는 토큰입니다."),
    INVALID_TOKEN(HttpStatus.UNAUTHORIZED, "유효하지 않은 토큰입니다."),
    NO_AUTHORITY(HttpStatus.BAD_REQUEST, "해당 요청에 대한 권한이 없습니다."),
    INVALID_RESOURCE(HttpStatus.NOT_FOUND, "유효하지 않은 리소스입니다."),
    RENEW_TOKEN_FAIL(HttpStatus.BAD_REQUEST, "토큰 갱신에 실패하였습니다."),
    NOT_EXPIRED(HttpStatus.BAD_REQUEST, "만료되지 않은 토큰입니다."),
    EXPIRED_TOKEN(HttpStatus.UNAUTHORIZED, "만료된 토큰입니다."),

    FILE_UPLOAD_FAIL(HttpStatus.BAD_REQUEST, "파일 업로드에 실패했습니다."),
    FILE_DELETE_FAIL(HttpStatus.BAD_REQUEST, "파일 삭제에 실패했습니다."),
    EMPTY_FILE(HttpStatus.BAD_REQUEST, "파일이 없습니다."),
    NOT_VALID_EXTENSION(HttpStatus.BAD_REQUEST, "유효하지 않은 확장자입니다."),
    FILE_INPUT_FAIL(HttpStatus.BAD_REQUEST, "파일 입력에 실패했습니다."),
    JSON_PARSING_FAIL(HttpStatus.BAD_REQUEST, "JSON 파싱에 실패했습니다."),

    ALREADY_EXIST_USER_IN_CLUB(HttpStatus.BAD_REQUEST, "이미 클럽에 들어가 있는 유저입니다."),
    NOT_FOUND_USER(HttpStatus.NOT_FOUND, "해당 유저를 찾을 수 없습니다."),
    ALREADY_EXIST_USER(HttpStatus.BAD_REQUEST, "이미 존재하는 유저입니다."),
    NOT_FOUND_BOARD(HttpStatus.NOT_FOUND, "해당 게시글을 찾을 수 없습니다."),
    NOT_FOUND_REQUEST(HttpStatus.NOT_FOUND, "해당 신청 내역을 찾을 수 없습니다."),
    BOARD_REQUEST_FAIL(HttpStatus.BAD_REQUEST, "신청에 실패하였습니다."),
    BOARD_REQUEST_DUPLICATE(HttpStatus.BAD_REQUEST, "이미 신청이 완료되었습니다."),

    NOT_FOUND_CLUB(HttpStatus.BAD_REQUEST, "존재하지 않는 클럽입니다.");

    private final HttpStatus httpStatus;
    private final String detail;

}