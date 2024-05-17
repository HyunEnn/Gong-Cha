import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import lArrowIcon from '@/assets/icons/lArrow.svg';
import PlayerCard from '@/components/PlayerCard';
import { getMyCard } from '@/apis/api/mypage';
import { myPageDummyData } from '@/data/dummyData'; // dummy data

function PlayerCardPage() {
    const key = 2;
    const navigate = useNavigate();
    const [profileData, setProfileData] = useState({

    });
    // const [profileData, setProfileData] = useState({
    //     userId: 0,
    //     name: '정준수',
    //     profileUrl: profileImage,
    //     playNum: 5,
    //     shooting: 95,
    //     pass: 90,
    //     dribble: 97,
    //     speed: 98,
    //     manner: 90,
    // });

    useEffect(() => {
        setProfileData(    // dummy data
            myPageDummyData,
        );
        // axios for db connection
        // getMyCard(
        //     key,
        //     (success) => {
        //         setProfileData({
        //             ...profileData,
        //         });
        //     },
        //     (fail) => {
                
        //     }
        // );
        // return () => {
            
        // };
    }, []);

    const handleBackClick = () => {
        navigate(-1);
    };
    const renderPlayerCard = (Player) => {
        if (!Player) return null;
    
        return (
            <PlayerCard player={Player}/>
        );
    }

    return (
        <div className="absolute flex items-center justify-center">
            <div onClick={handleBackClick} className="absolute left-[calc(.7rem)] top-[calc(2.0rem)] w-[calc(1.5625rem)] h-[calc(1.875rem)] cursor-pointer">
                <img src={lArrowIcon} alt="돌아가기" />
            </div>
            <div className="page-title w-[calc(10rem)]">내 선수카드</div>
            <div className="relative top-[calc(8.9375rem)]">
                <div className="absolute flex flex-col items-center justify-center left-1/2 w-[calc(22.5rem)]">
                    <span className="font-pretendardBold">
                        선수카드
                    </span>
                </div>
            </div>
            <div className="absolute left-0 top-[calc(10.6875rem)] border-[calc(.01875rem)] w-[calc(22.5rem)] z-0"></div>
            <div className="absolute flex justify-center items-center top-0 left-[11.25rem] mt-[calc(11.6875rem)]">
                {/* PlayerCard */}
                {renderPlayerCard(profileData)}
            </div>
        </div>
    );
}

export default PlayerCardPage;
