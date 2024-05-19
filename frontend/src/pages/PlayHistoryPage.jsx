import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import Modal from '@/components/Modal';
import ReportModal from '@/components/ReportModal';
import EvaluationModal from '@/components/EvaluationModal';
import PlayerCard from '@/components/PlayerCard';
import {
    CardForm,
    CardContent,
    CardDescription,
    CardFooter,
    CardTitle,
    CardHeader,
} from "@/components/CardForm"
import lArrowIcon from '@/assets/icons/lArrow.svg';
import rArrowIcon from '@/assets/icons/rArrow.svg';
import reportIcon from '@/assets/icons/report.svg';
import emptyGhostIcon from '@/assets/icons/emptyGhost.svg';
import playGroundIcon from '@/assets/images/FieldBackground2.png';
import evaluationIcon from '@/assets/images/evaluation.png';
import { getMatchingList } from '@/apis/api/matching2';
import { getTeamInfo } from '@/apis/api/team';
import { playHistoryDummyData } from '@/data/dummyData'; // dummy data

function PlayHistoryPage() {
    const navigate = useNavigate();
    const [playHistoryData, setPlayHistoryData] = useState([]);
    const [playHistory, setPlayHistory] = useState([]);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [detailKey, setDetailKey] = useState({ key: '' });
    const [selectedPlayer, setSelectedPlayer] = useState(null);
    const [startY, setStartY] = useState(0);
    const [dragging, setDragging] = useState(false);
    const [translateY, setTranslateY] = useState(0);
    const [showReportModal, setShowReportModal] = useState(false);
    const [showEvaluationModal, setShowEvaluationModal] = useState(false);

    useEffect(() => {
        setPlayHistoryData(    // dummy data
            playHistoryDummyData,
        );
    }, []);
    
    useEffect(() => {
        // axios for db connection<TeamInfo teamId={detailKey}></TeamInfo>
        getMatchingList(
            (success) => {
                const dataArray = success.data.data;
                dataArray.forEach((data, index) => {
                    getTeamInfo(
                        data.matchingTeamId,
                        (success) => {
                            dataArray[index] = {
                                ...dataArray[index],
                                matchingTeam: success.data.data,
                            };
                        },
                        (fail) => {
                            console.log(fail);
                        }
                    );
                    getTeamInfo(
                        data.versusTeamId,
                        (success) => {
                            dataArray[index] = {
                                ...dataArray[index],
                                versusTeam: success.data.data,
                            };
                        },
                        (fail) => {
                            console.log(fail);
                        }
                    );
                    setPlayHistory((prevData) => ({
                        ...prevData,
                        ...dataArray,
                    }));
                });
            }
        );
        return () => {
            
        };
    }, []);

    useEffect(() => {
        console.log(playHistory);
    }, [playHistory]);

    const handleBackClick = () => {
        navigate(-1);
    };

    const handlePlayScheduleClick = (state, key) => {
        setDetailKey({ key });
        setShowDetailModal(true);
    };

    const closeModal = () => {
        setShowDetailModal(false);
    };

    const handleOutsideClick = () => {
        closeModal();
    };

    const handlePlayerClick = (clickedPlayer) => {
        const player = clickedPlayer;
        
        if (player) {
            setSelectedPlayer(player);
            setShowDetailModal(true);
            setTranslateY(0);
        }
    };

    const handleClosePlayerCard = () => {
        setSelectedPlayer(null);
    };

    const handleTouchStart = (e) => {
        setStartY(e.touches[0].clientY);
        setDragging(true);
    };

    const handleTouchMove = (e) => {
        if (!dragging) return;
        const currentY = e.touches[0].clientY;
        const moveY = currentY - startY;
        setTranslateY(moveY);

        if (moveY > 200) {
            handleClosePlayerCard();
        }
    };

    const handleTouchEnd = () => {
        setDragging(false);
        setTranslateY(0);
    };

    const openReportModal = () => {
        setShowReportModal(true);
    };

    const closeReportModal = () => {
        setShowReportModal(false);
    };

    const openEvaluationModal = () => {
        setShowEvaluationModal(true);
    };

    const closeEvaluationModal = () => {
        setShowEvaluationModal(false);
    };

    // PlayerCard modal rendering
    const renderPlayerCardModal = () => {
        if (!selectedPlayer) return null;
    
        return (
            <Modal show={!!selectedPlayer} onClose={handleClosePlayerCard}>
                <div className="fixed inset-0 flex items-center justify-center" onClick={handleClosePlayerCard}>
                    <div className="absolute top-0 bg-white rounded-lg shadow-lg max-w-md mx-auto mt-[calc(4.0rem)]" onClick={e => e.stopPropagation()}
                            onTouchStart={handleTouchStart}
                            onTouchMove={handleTouchMove}
                            onTouchEnd={handleTouchEnd}
                            style={{ transform: `translateY(${translateY}px)` }}>
                        {/* 닫기 바 */}
                        <div className="absolute w-full h-4 cursor-pointer">
                            <div className="expand-animation absolute transform -translate-x-1/2 -translate-y-1/2 w-24 h-1 bg-gray-500 rounded"></div>
                        </div>
                        {/* PlayerCard */}
                        <PlayerCard player={selectedPlayer} className={'flip-enter'}/>
                    </div>
                </div>
            </Modal>
        );
    };

    return (
        <div className="absolute flex flex-col items-center justify-center">
            <div>
                <div onClick={handleBackClick} className="absolute left-[calc(.7rem)] top-[calc(2.0rem)] w-[calc(1.5625rem)] h-[calc(1.875rem)] cursor-pointer">
                    <img src={lArrowIcon} alt="돌아가기" />
                </div>
                <div className="page-title w-[calc(10rem)]">경기내역</div>
                <div className="relative top-[calc(8.9375rem)]">
                    <div className="absolute flex flex-col items-center justify-center left-1/2 w-[calc(22.5rem)]">
                        <span className="font-pretendardBold">
                            지난 경기 내역
                        </span>
                    </div>
                </div>
                <div className="absolute left-0 top-[calc(10.6875rem)] border-[calc(.01875rem)] w-[calc(22.5rem)] z-0"></div>
            </div>
            <div className="absolute flex flex-col items-center justify-center">
                {playHistoryData.length === 0 ? (
                    <div className="absolute flex justify-center left-1/2 top-[calc(15rem)] transform -translate-x-1/2 p-0 w-[calc(6rem)] h-[calc(6rem)]">
                        <img src={emptyGhostIcon} alt="지난 경기 내역이 없습니다" />
                        <p className="absolute top-[calc(7rem)] font-pretendardBlack text-[calc(0.4rem)] text-gray-500">지난 경기 내역이 없어요</p>
                    </div>
                    ) : (
                    <div className="absolute flex flex-col justify-center left-[calc(1.13125rem)] top-[calc(13.5rem)] w-[calc(18.125rem)] h-[calc(4.375rem)]">
                        {playHistoryData.map((data, index) => (
                            <CardForm key={uuidv4()} className="absolute flex flex-col justify-center left-[calc(1.13125rem)] w-[calc(18.125rem)] h-[calc(4.375rem)] rounded-[15px] border-stone-70" style={{ top: `calc(${index * 6.4375}rem)`}} onClick={() => handlePlayScheduleClick(data.state, data.key)}>
                                <CardHeader className="absolute flex items-center left-1/2 transform -translate-x-1/2 p-0 top-[calc(0.1875rem)] w-[calc(4.9375rem)] text-[calc(0.625rem)] text-gray-400">
                                    {data[0].date}
                                </CardHeader>
                                <CardContent key={uuidv4()} className="flex items-center p-0">
                                    <div className="absolute left-[calc(1.8125rem)] w-[calc(3.0625rem)] font-pretendardBold text-lg">{data[0].time}</div>
                                    <div className="absolute flex items-center left-[calc(7.0rem)] top-[calc(1.4rem)]">
                                        <CardTitle className="text-[calc(1.0rem)] text-sm">{data[0].writer.name} FC</CardTitle>
                                        <span className="mx-1 font-pretendardRegular text-base">VS</span>
                                        <CardTitle className="text-[calc(1.0rem)] text-sm">{data[1].writer.name} FC</CardTitle>
                                    </div>
                                </CardContent>
                                <CardFooter key={uuidv4()} className="absolute flex items-center left-1/2 transform -translate-x-1/2 bottom-2.5 p-0">
                                    <CardDescription className="flex text-[0.625rem] ml-0">
                                        <span className="font-pretendardBold text-[calc(.5rem)] text-gray-400">{data[0].place}</span>
                                        <span className="ml-2 font-pretendardBold text-[calc(.5rem)] text-gray-400">{data[0].allPlayer}vs{data[0].allPlayer}</span>
                                    </CardDescription>
                                </CardFooter>
                                <img className="absolute right-1 inline" src={rArrowIcon} alt="들어가기" />
                            </CardForm>
                            )
                        )}
                    </div>
                    )
                }
                
            </div>
        </div>
    );
}

export default PlayHistoryPage;
