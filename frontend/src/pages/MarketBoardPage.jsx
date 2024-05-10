import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import MyTeamInfo from '@/components/MyTeamInfo';
import TeamList from '@/components/TeamList';

function MarketBoardPage() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('tab2');

    return (
        <>
            {/* page title */}
            <div className="page-title">이적 시장</div>
            {/* page tab */}
            <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center top-[calc(7.5rem)] p-0 w-[calc(20.25rem)] h-[calc(2.86rem)] bg-gray-100 rounded-sm text-[calc(0.8rem)]">
                <div className="flex items-center justify-center cursor-pointer mx-5 w-[calc(12rem)]" onClick={() => setActiveTab('tab1')}>
                    <span className={`absolute font-pretendardBold ${activeTab === 'tab1' ? 'bg-white rounded-md px-[calc(.8rem)] py-2' : ''}`}>
                        공차 선수 보기
                    </span>
                </div>
                <div className="flex items-center justify-center cursor-pointer mx-5 w-[calc(12rem)]" onClick={() => setActiveTab('tab2')}>
                    <span className={`absolute font-pretendardBold ${activeTab === 'tab2' ? 'bg-white rounded-md px-[calc(1.0rem)] py-2' : ''}`}>
                        나의 팀 보기
                    </span>
                </div>
                <div className="flex items-center justify-center cursor-pointer mx-5 w-[calc(11rem)]" onClick={() => setActiveTab('tab3')}>
                    <span className={`absolute font-pretendardBold ${activeTab === 'tab3' ? 'bg-white rounded-md px-[calc(.8rem)] py-2' : ''}`}>
                        팀 목록 보기
                    </span>
                </div>
            </div>
            {/* Render component based on activeTab */}
            {activeTab === 'tab2' && <MyTeamInfo />}
            {activeTab === 'tab3' && <TeamList />}
        </>
    );
}

export default MarketBoardPage;
