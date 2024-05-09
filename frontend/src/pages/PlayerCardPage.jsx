import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import lArrowIcon from '@/assets/icons/lArrow.svg';
import PlayerCard from '@/components/PlayerCard';
import { myPageDummyData } from '@/data/dummyData'; // dummy data

function PlayerCardPage() {
    const navigate = useNavigate();
    const [profileData, setProfileData] = useState({});

    useEffect(() => {
        setProfileData(    // dummy data
            myPageDummyData,
        );
    }, []);

    useEffect(() => {
        /* axios for db connection
        getProfileInfo(
            key,
            (success) => {
                setProfileData({
                    ...profileData,
                });
            },
            (fail) => {
                
            }
        );
        return () => {
            
        };
        */
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
        <>
            <div onClick={handleBackClick} className="absolute left-[calc(.7rem)] top-[calc(2.0rem)] w-[calc(1.5625rem)] h-[calc(1.875rem)] cursor-pointer">
                <img src={lArrowIcon} alt="돌아가기" />
            </div>
            <div className="page-title">내 선수카드</div>
            <div className="absolute inset-x-0 flex items-center justify-center top-[calc(8.9375rem)] text-sm">
                    <div className="flex flex-col items-center justify-center">
                        <span className="font-pretendardBold">
                            선수 카드
                        </span>
                    </div>
                </div>
            <div className="absolute left-0 top-[calc(10.6875rem)] border-[calc(.01875rem)] w-full z-0"></div>
            <div className="absolute left-1/2 top-0 mt-[calc(11.6875rem)]">
                {/* PlayerCard */}
                {renderPlayerCard(profileData)}
            </div>
        </>
    );
}

export default PlayerCardPage;
