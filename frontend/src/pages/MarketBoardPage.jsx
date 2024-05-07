import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import MyTeamInfo from '@/components/MyTeamInfo';
import PlayerList from '@/components/PlayerList'; 

function MarketBoardPage() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('tab2');

    return (
        <>
            {/* page title */}
            <div className="page-title">이적 시장</div>
            {/* page tab */}
            <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center top-[calc(7.5rem)] p-0 w-[calc(20.25rem)] h-[calc(2.86rem)] bg-gray-100 rounded-sm text-[calc(0.8rem)]">
                <div className="flex items-center justify-center cursor-pointer mx-5 w-[calc(11rem)]" onClick={() => setActiveTab('tab1')}>
                    <span className={`font-pretendardBold ${activeTab === 'tab1' ? 'bg-white rounded-md px-[calc(1.55rem)] py-2' : ''}`}>
                        공차 선수 보기
                    </span>
                </div>
                <div className="flex items-center justify-center cursor-pointer mx-5 w-[calc(11rem)]" onClick={() => setActiveTab('tab2')}>
                    <span className={`font-pretendardBold ${activeTab === 'tab2' ? 'bg-white rounded-md px-[calc(1.89rem)] py-2' : ''}`}>
                        나의 팀 보기
                    </span>
                </div>
            </div>
            {/* Render component based on activeTab */}
            <div className="market-board-container"> {/* Main container */}
                <div className="tab-content"> {/* Content area for the tab */}
                    {activeTab === 'tab1' && <PlayerList />}
                    {activeTab === 'tab2' && <MyTeamInfo />}
                </div>
        </div>
        </>
    );
}

export default MarketBoardPage;
