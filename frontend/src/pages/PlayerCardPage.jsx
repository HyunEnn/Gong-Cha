import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import lArrowIcon from '@/assets/icons/lArrow.svg';
import PlayerCard from '@/components/PlayerCard';
import { myPageDummyData } from '@/data/dummyData'; // dummy data

function PlayerCardPage() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('currentSeason');
    const [profileData, setProfileData] = useState({});

    useEffect(() => {
        setProfileData({    // dummy data
            ...myPageDummyData
        });
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

    return (
        <>
            <div onClick={handleBackClick} className="absolute left-[calc(.7rem)] top-[calc(2.0rem)] w-[calc(1.5625rem)] h-[calc(1.875rem)] cursor-pointer">
                <img src={lArrowIcon} alt="돌아가기" />
            </div>
            <div className="page-title">내 선수카드</div>
            <div className="absolute inset-x-0 flex items-center justify-center top-[calc(8.9375rem)] p-0 h-[calc(0.86rem)] text-xl">
                {['currentSeason', 'lastSeason'].map(season => (
                    <div key={season} className="flex flex-col items-center justify-center cursor-pointer ml-2"
                         onClick={() => setActiveTab(season)}>
                        <span className={`font-pretendardBold ${activeTab === season ? 'text-gray-700' : 'text-gray-500'}`}>
                            {season === 'currentSeason' ? '이번 시즌' : '지난 시즌'}
                        </span>
                        {activeTab === season && (
                            <div className="relative rounded w-full h-[calc(.125rem)] bg-gray-700 top-2 z-10"></div>  // 여백 조절
                        )}
                    </div>
                ))}
            </div>
            <div className="absolute left-0 top-[calc(10.6875rem)] border-[calc(.01875rem)] w-full z-0"></div>
            {/* test */}
            <div className="absolute inset-x-0 flex items-center justify-center top-[calc(10.9375rem)] text-gray-500">
                {activeTab === 'currentSeason' ? <span>SN: currentSeason</span> : <span>SN: lastSeason</span>}
            </div>
            <div className="absolute left-1/2 top-0 mt-[calc(11.6875rem)]">
                {/* PlayerCard */}
                <PlayerCard player={profileData}/>
            </div>
        </>
    );
}

export default PlayerCardPage;
