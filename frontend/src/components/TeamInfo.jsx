import React, { useState, useEffect } from 'react';
import Modal from '@/components/Modal';
import PlayerCard from '@/components/PlayerCard';
import teamBackground from '@/assets/images/FieldBackground.png';
import squareIcon from '@/assets/images/squareIcon.png';
import hexagonIcon from '@/assets/images/hexagonIcon.png';
import { myTeamInfoDummyData } from '@/data/dummyData'; // dummy data

function TeamInfo() {
    const [myTeamInfoData, setMyTeamInfoData] = useState([]);
    const [teamInfo, setTeamInfo] = useState({});
    const [selectedPlayer, setSelectedPlayer] = useState(null);
    const [startY, setStartY] = useState(0);
    const [dragging, setDragging] = useState(false);
    const [translateY, setTranslateY] = useState(0);

    useEffect(() => {
        const bars = document.querySelectorAll('.progress-bar');
        bars.forEach(bar => {
            let targetWidth = bar.dataset.width;
            bar.style.width = '0%';
            setTimeout(() => {
                bar.style.transition = 'width 0.5s ease-out';
                bar.style.width = targetWidth;
            }, 100);
        });
    }, [myTeamInfoData]);

    useEffect(() => {
        setMyTeamInfoData(    // dummy data
            myTeamInfoDummyData,
        );
    }, []);

    useEffect(() => {
        /* axios for db connection
        getMyTeamInfo(
            key,
            (success) => {
                setMyTeamInfoData({
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

    const getBackgroundColor = (arr) => {
        const MAX = Math.max(arr[0], arr[1], arr[2], arr[3]);
        const size = arr.length;
        for (let index = 0; index < size; index++) {
            const element = arr[index];

            if (element === MAX) {
                if (index === 0) {
                    return 'bg-blue-500';
                } else if (index === 1) {
                    return 'bg-green-500';
                } else if (index === 2) {
                    return 'bg-red-500';
                } else {
                    return 'bg-yellow-500';
                }
            }
        }
    };
    
    const handlePlayerClick = (clickedPlayer) => {
        const player = clickedPlayer;
        
        if (player) {
            setSelectedPlayer(player);
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

    const handleFinishButton = () => {
        
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
        <>
            {myTeamInfoData.length === 0 ? (
                <div></div>
            ) : (
                <>
                    {/* team name */}
                    <div className="mt-4 px-4 absolute top-0">
                        <p>{myTeamInfoData.writer.name} FC</p>
                    </div>
                    {/* team tags */}
                    <div className="mt-4 px-4 text-[calc(.5rem)] absolute top-[calc(1.5rem)]">
                        <p>{myTeamInfoData.location} | {myTeamInfoData.time} | {myTeamInfoData.tags.map(tag => Array.isArray(tag) ? tag.join(', ') : tag).join(', ')}</p>
                    </div>
                    <div className="absolute mt-0 right-0 px-3 text-[calc(.5rem)] top-[calc(1.5rem)]">
                        <button className="rounded w-[calc(4rem)] h-5 text-[calc(.5rem)] bg-green-500" onClick={handleFinishButton}>모집 완료하기</button>
                    </div>
                    {/* team analysis */}
                    <div>
                        {/* overall */}
                        <div className="flex mt-20 ml-4 space-x-0">
                            <div className="h-full w-1/6 font-pretendardBlack">
                                종합
                            </div>
                        </div>
                        <div className="mt-5 ml-4 space-x-0 bg-gray-400 w-[72%] h-5 flex text-[calc(.5rem)]">
                            <div className="progress-bar bg-blue-500 h-full" data-width="16.666%">
                                <p className="absolute ml-[calc(.1rem)] mt-[calc(.1rem)] text-white font-pretendardBold text-[calc(.7rem)]">40</p>
                                <p className="absolute -mt-[calc(.6rem)] font-pretendardBlack text-blue-500">SHO</p>
                            </div>
                            <div className="progress-bar bg-green-500 h-full" data-width="33.333%">
                                <p className="absolute ml-[calc(.1rem)] mt-[calc(.1rem)] text-white font-pretendardBold text-[calc(.7rem)]">90</p>
                                <p className="absolute -mt-[calc(.6rem)] font-pretendardBlack text-green-500">PAS</p>
                            </div>
                            <div className="progress-bar bg-red-500 h-full" data-width="20%">
                                <p className="absolute ml-[calc(.1rem)] mt-[calc(.1rem)] text-white font-pretendardBold text-[calc(.7rem)]">50</p>
                                <p className="absolute -mt-[calc(.6rem)] font-pretendardBlack text-red-500">DRI</p>
                            </div>
                            <div className="progress-bar bg-yellow-500 h-full" data-width="16.666%">
                                <p className="absolute ml-[calc(.1rem)] mt-[calc(.1rem)] text-white font-pretendardBold text-[calc(.7rem)]">50</p>
                                <p className="absolute -mt-[calc(.6rem)] font-pretendardBlack text-yellow-500">SPD</p>
                            </div>
                            <div className="">
                                <p className="absolute ml-[calc(.7rem)] mt-[calc(.4rem)] font-pretendardBold text-white">max</p>
                            </div>
                            <p className="absolute mt-[calc(.1rem)] right-[calc(2.3rem)] font-pretendardBlack text-[calc(.7rem)] text-[#72BBA8]">230</p>
                            <p className="absolute mt-[calc(.1rem)] right-[calc(.5rem)] font-pretendardBlack text-[calc(.7rem)] text-gray-500">/400</p>
                        </div>
                        <div className="absolute mt-[calc(3rem)]">
                            <img className="relative w-full rounded-sm shadow-background animate-grow-in" 
                                src={teamBackground} 
                                alt="배경 필드 사진" 
                            />
                            <div className="flex flex-wrap items-center justify-center p-4 absolute inset-0">
                                {myTeamInfoData.players.map((player, playerIndex) => 
                                    player.stateus && (
                                        <div key={playerIndex} className="fade-in relative flex flex-col items-center justify-center m-2"
                                            style={{
                                                width: 'calc(20% - 1.5rem)',
                                                animationDelay: `${playerIndex * 0.1}s`
                                            }}
                                            onClick={() => handlePlayerClick(player)}>
                                            <img className="rounded-full border-[calc(0.15rem)] border-stone-1 object-cover object-center mb-1" 
                                                src={player.profileImage} 
                                                alt="프로필 사진"
                                                style={{ width: '2rem', height: '2rem', objectFit: 'contain' }} />
                                            <p className="font-pretendardBold text-white text-[calc(0.7rem)]" style={{ alignSelf: 'flex-start' }}>{player.name}</p>
                                        </div>
                                    )
                                )}
                                {renderPlayerCardModal()}
                            </div>
                        </div>
                    </div>
                    {/* player info */}
                    <div className="mt-[calc(18.5rem)] space-x-0">
                        <div className="ml-4 h-full w-1/6 font-pretendardBlack">
                            전력
                        </div>
                        <div className="relative left-10 w-[87%]">
                            {myTeamInfoData.players.map((player, playerIndex) => (
                                <div key={playerIndex} className={"" + (player.stateus ? "" : " opacity-20")}>
                                    <div className="relative flex justify-start border-b-[calc(0.05rem)] w-[calc(16rem)]">
                                    <div className="absolute -left-6 mt-5">
                                        <div className={`absolute w-1 h-5 ${getBackgroundColor([player.SHO, player.PAS, player.DRI, player.PAC])}`}></div>
                                            <p className="ml-2 -mt-[calc(.15rem)] font-pretendardBlack">
                                                {Math.max(player.SHO, player.PAS, player.DRI, player.PAC)}
                                            </p>
                                        </div>
                                        <img className="border-stone-1 object-cover object-center mb-1"
                                            src={player.profileImage} 
                                            alt="프로필 사진"
                                            style={{ width: '4rem', height: '4rem', objectFit: 'contain' }} />
                                        <p className="relative mt-4 ml-2 font-pretendardBlack text-black text-[calc(0.8rem)]">{player.name}</p>
                                        <p className="absolute mt-[calc(2.5rem)] ml-[calc(4.5rem)] font-pretendardRegular text-gray-500 text-[calc(0.5rem)]">경기수</p>
                                        <div className="absolute hexagon mt-[calc(3.2rem)] ml-[calc(4.85rem)] text-gray-500 text-[calc(0.5rem)]">
                                            <div className="absolute flex flex-col items-center justify-center -mt-[calc(.07rem)] w-4 h-4 -ml-[calc(.18rem)]">
                                                <img className={"absolute opacity-50" + (player.playNum > 4 ? "" : " h-3")}
                                                    src={(player.playNum > 4 ? hexagonIcon : squareIcon)}
                                                    alt="경기수 아이콘"
                                                />
                                                <p className="absolute font-pretendardBlack text-center">
                                                    {player.playNum}
                                                </p>
                                            </div>
                                        </div>
                                        <p className="absolute mt-[calc(2.5rem)] ml-[calc(6.2rem)] font-pretendardRegular text-gray-500 text-[calc(0.5rem)]">매너점수</p>
                                        <div className={"absolute flex flex-col items-center mt-[calc(3.3rem)] ml-[calc(6.5rem)] w-4 h-3" + (player.MAN > 59 ? " bg-[#D6D6DA]" : " bg-[#CF946E]") + (player.MAN > 79 ? " bg-[#d6b534]" : "")}>
                                            <p className="absolute font-pretendardBlack text-gray-500 text-[calc(0.5rem)]">{player.MAN}</p>
                                        </div>
                                        <p className="absolute mt-[calc(2.5rem)] ml-[calc(13.2rem)] font-pretendardRegular text-gray-500 text-[calc(0.5rem)]">선수 가치</p>
                                        <p className="absolute mt-[calc(3.1rem)] ml-[calc(13.8rem)] font-pretendardBlack text-black text-[calc(0.7rem)]">{parseInt((player.SHO + player.PAS + player.DRI + player.PAC) / 4)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </>
    );
}

export default TeamInfo;
