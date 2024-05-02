import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import Modal from '@/components/Modal';
import ReportModal from '@/components/ReportModal';
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
import playGroundIcon from '@/assets/icons/playground.svg';
import { playHistoryDummyData } from '@/data/dummyData'; // dummy data

function PlayHistoryPage() {
    const navigate = useNavigate();
    const [playHistoryData, setPlayHistoryData] = useState([]);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [detailKey, setDetailKey] = useState({ key: '' });
    const [selectedPlayer, setSelectedPlayer] = useState(null);
    const [startY, setStartY] = useState(0);
    const [dragging, setDragging] = useState(false);
    const [translateY, setTranslateY] = useState(0);

    useEffect(() => {
        setPlayHistoryData(    // dummy data
            playHistoryDummyData,
        );
    }, []);
    
    useEffect(() => {
        /* axios for db connection
        getPlayScheduleList(
            key,
            (success) => {
                setPlayScheduleList({
                    ...success,
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

    const handlePlayScheduleClick = (state, key) => {
        /*
        if (state === "matching_active") {
            console.log("엄 " + key);
            getFunc1(
                key,
                (success) => {
                    playScheduleData({
                        ...success,
                    });
                },
                (fail) => {
            });
        } else if (state === "matching_inactive") {
            getFunc2(
                key,
                (success) => {
                    playScheduleData({
                        ...success,
                    });
                },
                (fail) => {
            });
        } else if (state === "recruitment_active") {
            getFunc3(
                key,
                (success) => {
                    playScheduleData({
                        ...success,
                    });
                },
                (fail) => {
            });
        } else {
            getFunc4(
                key,
                (success) => {
                    playScheduleData({
                        ...success,
                    });
                },
                (fail) => {
            });
        }
        */
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

    // PlayerCard modal rendering
    const renderPlayerCardModal = () => {
        if (!selectedPlayer) return null;
    
        return (
            <Modal show={!!selectedPlayer} onClose={handleClosePlayerCard}>
                <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center" onClick={handleClosePlayerCard}>
                    <div className="absolute top-0 bg-white rounded-lg shadow-lg max-w-md mx-auto mt-[calc(11.6875rem)]" onClick={e => e.stopPropagation()}
                         onTouchStart={handleTouchStart}
                         onTouchMove={handleTouchMove}
                         onTouchEnd={handleTouchEnd}
                         style={{ transform: `translateY(${translateY}px)` }}>
                        {/* 닫기 바 */}
                        <div className="absolute w-full h-4 cursor-pointer">
                            <div className="absolute transform -translate-x-1/2 -translate-y-1/2 w-24 h-1 bg-gray-500 rounded"></div>
                        </div>
                        {/* PlayerCard */}
                        <PlayerCard player={selectedPlayer}/>
                    </div>
                </div>
            </Modal>
        );
    };

    function formatScheduleDateTime(dateStr) {
        const [datePart, dayOfWeek] = dateStr.split(' ');
    
        const [year, month, day] = datePart.split('.').map(num => parseInt(num, 10));
        const date = new Date(year, month - 1, day);
    
        const localeDate = date.toLocaleDateString('ko-KR', {
            month: 'long',
            day: 'numeric'
        });
    
        const daysOfWeek = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
        const dayOfWeekFull = daysOfWeek[date.getDay()];
    
        return `${localeDate} ${dayOfWeekFull}`;
    }
    const [showReportModal, setShowReportModal] = useState(false); // 신고 모달 표시 상태

    // ReportModal 열기 함수
    const openReportModal = () => {
        setShowReportModal(true);
    };

    // ReportModal 닫기 함수
    const closeReportModal = () => {
        setShowReportModal(false);
    };
    return (
        <>
            <>
                <div onClick={handleBackClick} className="absolute left-[calc(.7rem)] top-[calc(2.0rem)] w-[calc(1.5625rem)] h-[calc(1.875rem)] cursor-pointer">
                    <img src={lArrowIcon} alt="돌아가기" />
                </div>
                <div className="page-title">경기내역</div>
                <div className="absolute inset-x-0 flex items-center justify-center top-[calc(8.9375rem)] text-sm">
                    <div className="flex flex-col items-center justify-center">
                        <span className="font-pretendardBold">
                            지난 경기 내역
                        </span>
                    </div>
                </div>
                <div className="absolute left-0 top-[calc(10.6875rem)] border-[calc(.01875rem)] w-full z-0"></div>
            </>
            <>
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
                                    <div className="absolute left-[calc(0.8125rem)] w-[calc(3.0625rem)] font-pretendardBold text-lg">{data[0].time}</div>
                                    <div className="absolute flex items-center left-[calc(7.0rem)] top-[calc(1.4rem)]">
                                        <CardTitle className="text-[calc(1.0rem)] text-sm">{data[0].writer.name} FC</CardTitle>
                                        <span className="mx-1 font-pretendardRegular text-base">VS</span>
                                        <CardTitle className="text-[calc(1.0rem)] text-sm">{data[1].writer.name} FC</CardTitle>
                                    </div>
                                </CardContent>
                                <CardFooter key={uuidv4()} className="absolute flex items-center left-1/2 transform -translate-x-1/2 bottom-2.5 p-0">
                                    <CardDescription className="flex text-[0.625rem] ml-8">
                                        <span className="font-pretendardBold text-[calc(.5rem)] text-gray-400">{data[0].place}</span>
                                        <span className="mx-2 font-pretendardBold text-[calc(.5rem)] text-gray-400">{data[0].allPlayer}vs{data[0].allPlayer}</span>
                                    </CardDescription>
                                </CardFooter>
                                <img className="absolute right-1 inline" src={rArrowIcon} alt="들어가기" />
                            </CardForm>
                            )
                        )}
                    </div>
                    )
                }
                {showDetailModal && (
                    <Modal show={showDetailModal} onClose={closeModal}>
                        {/* Modal content */}
                        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center " onClick={handleOutsideClick}>
                            <div
                                className="relative flex flex-col items-center justify-start bg-stone-100 w-[calc(20.5rem)] h-[calc(31.25rem)] rounded-xl overflow-x-hidden overflow-y-auto" 
                                onClick={e => e.stopPropagation()}
                            >
                                {/* close button */}
                                <button
                                    onClick={closeModal} 
                                    className="self-start mt-2 mb-0 ml-2 w-5 h-5 bg-[#FF5F51] rounded-full shadow-sm font-bold text-white flex items-center justify-center"
                                >
                                    &times;
                                </button>
                                {/* team info content */}
                                <div className="flex flex-col items-start justify-center mt-0 bg-stone-100 relative">
                                    <div className="mb-0 w-[calc(30rem)]">
                                        <img className="w-full h-full transform rotate-90" src={playGroundIcon} alt="경기장 배경" />
                                    </div>
                                    <div className="flex justify-center w-full absolute bottom-1.5/2">
                                        {playHistoryData.map((teamList, index) => (
                                            <div key={uuidv4()} className="flex flex-col items-center mx-4">
                                                <div className="flex flex-wrap items-center justify-center">
                                                    {teamList.map((team, teamIndex) => (
                                                        <React.Fragment key={team.key}>
                                                            {teamIndex !== 0 && (
                                                                <div className="w-full mb-4 flex items-center justify-center">
                                                                    <span className="font-pretendardRegular text-2xl mx-2">VS</span>
                                                                </div>
                                                            )}
                                                            {team.players.map((player, playerIndex) => (
                                                                <div key={playerIndex} className="flex flex-col items-center justify-center mx-2 relative" onClick={() => handlePlayerClick(player)}>
                                                                    <img className="rounded-full border-[calc(0.15rem)] border-stone-10 border-b-blue-300 object-cover object-center mb-1" src={player.profileImage} alt="프로필 사진" width={30} height={30}/>
                                                                    <p className="font-pretendardBold text-white text-[calc(0.7rem)]" style={{ alignSelf: 'flex-start' }}>{player.name}</p>
                                                                    <img className="absolute top-0 right-0 mt-1 mr-1" src={reportIcon} alt="리포트 아이콘" width={10} height={10} style={{ top: '-8px', right: '-10px' }} onClick={openReportModal}/>
                                                                </div>
                                                            ))}
                                                            {showReportModal && (
                                                                <ReportModal onClose={closeReportModal} />
                                                            )}
                                                            {/* <div className="flex flex-col items-center justify-center mx-2 font-pretendardBold text-gray-800 text-lg">
                                                                {team.writer.name} FC
                                                            </div> */}
                                                        </React.Fragment>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    {/* test */}
                                    {renderPlayerCardModal()}
                                </div>
                            </div>
                        </div>
                    </Modal>
                )}
            </>
        </>
    );
}

export default PlayHistoryPage;
