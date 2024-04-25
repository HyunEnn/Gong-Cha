import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import {
    CardForm,
    CardContent,
    CardDescription,
    CardFooter,
    CardTitle,
} from "@/components/CardForm"
import pencilIcon from '@/assets/icons/pencil.svg';
import rArrowIcon from '@/assets/icons/rArrow.svg';
import playScheduleIcon from '@/assets/icons/playSchedule.svg';
import playHistoryIcon from '@/assets/icons/playHistory.svg';
import playerCardIcon from '@/assets/icons/playerCard.svg';
import alarmIcon from '@/assets/icons/alarm.svg';
import myPageData from '@/data/dummyData'; // dummy data

function MyPage() {
    const [isActive, setIsActive] = useState(false);
    const navigate = useNavigate();
    const { title, name, profileImage } = myPageData; // dummy data
    const handleNagivate = (page) => {
        setIsActive(true);
        setTimeout(() => {
            setIsActive(false);
            navigate(page);
        }, 180);
    };
    const handleProfileClick = () => {
        handleNagivate(0);
    };
    const handlePlayScheduleClick = () => {
        handleNagivate('playschedule');
    };
    const handlePlayHistoryClick = () => {
        handleNagivate(0);
    };
    const handlePlayerCardClick = () => {
        handleNagivate('playercard');
    };
    const handleAlarmClick = () => {
        handleNagivate(0);
    };

    return (
        <>
            <>
                <div className="page-title">마이페이지</div>
            </>
            <>
                <CardForm className="absolute flex flex-col justify-center h-full left-[calc(1.13125rem)] top-[calc(7.625rem)] w-[calc(19.875rem)] h-[calc(4.375rem)] rounded-[15px]" onClick={() => handleProfileClick()}>
                    <CardContent className="flex items-center left-[calc(5.875rem)] pt-[calc(1.5rem)] p-0">
                        <img className="relative left-[calc(0.875rem)]" src={profileImage} alt="프로필 사진" width={30} height={30}/>
                        <CardTitle className="relative left-[calc(1.875rem)] text-[calc(1.0rem)]">{name}</CardTitle>
                    </CardContent>
                    <CardFooter className="absolute bottom-0 right-0 justify-end items-end p-2 pr-3">
                        <CardDescription className="flex text-[0.625rem]">
                            <img className="mr-1 inline" src={pencilIcon} alt="프로필 편집" width={10} height={10}/>
                            <span>프로필 편집</span>
                        </CardDescription>
                    </CardFooter>
                </CardForm>
            </>
            <>
                <div className="absolute flex left-[calc(1.13125rem)] top-[calc(14.5rem)] w-[calc(19.75rem)] rounded transform transition duration-100 ease-in-out active:bg-gray-200 active:scale-92" onClick={() => handlePlayScheduleClick()}>
                    <CardForm className="flex justify-center h-full w-[calc(1.6875rem)] h-[calc(1.6875rem)] rounded-[7px] bg-stone-100">
                        <CardContent className="p-0 pt-[calc(0.05rem)]">
                            <img src={playScheduleIcon} alt="현재 진행중인 경기" />
                        </CardContent>
                    </CardForm>
                    <span className="relative left-[calc(0.8125rem)] pt-[calc(0.1rem)] font-pretendardBlack">현재 진행중인 경기</span>
                    <img className="absolute right-0 inline" src={rArrowIcon} alt="들어가기" />
                </div>
                <div className="absolute flex left-[calc(1.13125rem)] top-[calc(17.3125rem)] w-[calc(19.75rem)] rounded transform transition duration-100 ease-in-out active:bg-gray-200 active:scale-90" onClick={() => handlePlayHistoryClick()}>
                    <CardForm className="flex justify-center h-full w-[calc(1.6875rem)] h-[calc(1.6875rem)] rounded-[7px] bg-stone-100">
                        <CardContent className="p-0 pt-[calc(0.125rem)] pl-[calc(0.05rem)]">
                            <img src={playHistoryIcon} alt="경기내역" />
                        </CardContent>
                    </CardForm>
                    <span className="relative left-[calc(0.8125rem)] pt-[calc(0.1rem)] font-pretendardBlack">경기내역</span>
                    <img className="absolute right-0 inline" src={rArrowIcon} alt="들어가기" />
                </div>
                <div className="absolute flex left-[calc(1.13125rem)] top-[calc(20.125rem)] w-[calc(19.75rem)] rounded transform transition duration-100 ease-in-out active:bg-gray-200 active:scale-90" onClick={() => handlePlayerCardClick()}>
                    <CardForm className="flex justify-center h-full w-[calc(1.6875rem)] h-[calc(1.6875rem)] rounded-[7px] bg-stone-100">
                        <CardContent className="p-0 pt-[calc(0.125rem)]">
                            <img src={playerCardIcon} alt="내 선수카드" />
                        </CardContent>
                    </CardForm>
                    <span className="relative left-[calc(0.8125rem)] pt-[calc(0.1rem)] font-pretendardBlack">내 선수카드</span>
                    <img className="absolute right-0 inline" src={rArrowIcon} alt="들어가기" />
                </div>
                <div className="absolute flex left-[calc(1.13125rem)] top-[calc(22.9375rem)] w-[calc(19.75rem)] rounded transform transition duration-100 ease-in-out active:bg-gray-200 active:scale-90" onClick={() => handleAlarmClick()}>
                    <CardForm className="flex justify-center h-full w-[calc(1.6875rem)] h-[calc(1.6875rem)] rounded-[7px] bg-stone-100">
                        <CardContent className="p-0 pt-[calc(0.125rem)]">
                            <img src={alarmIcon} alt="알림함" />
                        </CardContent>
                    </CardForm>
                    <span className="relative left-[calc(0.8125rem)] pt-[calc(0.1rem)] font-pretendardBlack">알림함</span>
                    <img className="absolute right-0 inline" src={rArrowIcon} alt="들어가기" />
                </div>
            </>
        </>
    );
}

export default MyPage;
