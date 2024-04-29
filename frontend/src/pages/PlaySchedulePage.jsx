import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { getPlayScheduleList } from '@/apis/api/mypage';
import Modal from '@/components/Modal';
import PlayerCard from '@/components/PlayerCard';
import {
    CardForm,
    CardContent,
    CardDescription,
    CardFooter,
    CardTitle,
    CardHeader,
} from "@/components/CardForm"
import defaultFieldImage from '@/assets/images/defaultField.png';
import lArrowIcon from '@/assets/icons/lArrow.svg';
import rArrowIcon from '@/assets/icons/rArrow.svg';
import condition0Icon from '@/assets/icons/gender.svg';
import condition1Icon from '@/assets/icons/level.svg';
import condition2Icon from '@/assets/icons/inoutside.svg';
import condition3Icon from '@/assets/icons/people.svg';
import emptyGhostIcon from '@/assets/icons/emptyGhost.svg';
import playGroundIcon from '@/assets/icons/playground.svg';
import { playScheduleDummyData } from '@/data/dummyData'; // dummy data

function PlaySchedulePage() {
    const navigate = useNavigate();
    const [playScheduleList, setPlayScheduleList] = useState([]);
    const [playScheduleData, setPlayScheduleData] = useState([]);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [detailKey, setDetailKey] = useState({ state: '', key: '' });
    const [slideIndex, setSlideIndex] = useState(0);
    const conditionIcons = [condition0Icon, condition1Icon, condition2Icon, condition3Icon];
    const [selectedPlayer, setSelectedPlayer] = useState(null);

    useEffect(() => {
        setPlayScheduleData(    // dummy data
            playScheduleDummyData,
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
        setDetailKey({ state, key });
        setShowDetailModal(true);
        setSlideIndex(0);
    };

    const closeModal = () => {
        setShowDetailModal(false);
    };

    const handleOutsideClick = () => {
        closeModal();
    };

    const handlePlayerClick = (userId) => {
        const player = playScheduleData[detailKey.key].players.find(p => p.userId === userId);
        if (player) {
            setSelectedPlayer(player);
            setShowDetailModal(true);
        }
    };

    const handleClosePlayerCard = () => {
        setSelectedPlayer(null);
    };

    const handleMap = () => {
        window.alert("엄");
    };

    // condition value
    const hasMultipleImages = detailKey.key !== null && playScheduleData[detailKey.key] && playScheduleData[detailKey.key].images.length > 1;

    const settings = {
        dots: hasMultipleImages,
        infinite: hasMultipleImages,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        beforeChange: (current, next) => setSlideIndex(next),
        autoplay: hasMultipleImages,
        autoplaySpeed: 2000,
        pauseOnHover: true
    };

    // PlayerCard modal rendering
    const renderPlayerCardModal = () => {
        if (!selectedPlayer) return null;

        return (
            <Modal show={!!selectedPlayer} onClose={handleClosePlayerCard}>
                <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center" onClick={handleClosePlayerCard}>
                    <div className="absolute top-3 bg-white rounded-lg shadow-lg max-w-md mx-auto" onClick={e => e.stopPropagation()}>
                        <PlayerCard player={selectedPlayer} onClose={handleClosePlayerCard} />
                    </div>
                    <button onClick={handleClosePlayerCard} className="absolute top-3 right-3 text-xl font-bold text-white">&times;</button>
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

    return (
        <>
            <>
                <div onClick={handleBackClick} className="absolute left-[calc(.7rem)] top-[calc(2.0rem)] w-[calc(1.5625rem)] h-[calc(1.875rem)] cursor-pointer">
                    <img src={lArrowIcon} alt="돌아가기" />
                </div>
                <div className="page-title">현재 진행중인 경기</div>
                <div className="relative top-[calc(8.9375rem)] p-0 w-[calc(11.0625rem)] h-[calc(1.125rem)] text-sm">
                    <div className="flex flex-col items-center justify-center">
                        <span className="font-pretendardBold">
                            진행중인 경기
                        </span>
                    </div>
                </div>
                <div className="absolute left-0 top-[calc(10.6875rem)] border-[calc(.01875rem)] w-full z-0"></div>
            </>
            <>
                {playScheduleData.length === 0 ? (
                    <div className="absolute flex justify-center left-1/2 top-[calc(15rem)] transform -translate-x-1/2 p-0 w-[calc(6rem)] h-[calc(6rem)]">
                        <img src={emptyGhostIcon} alt="진행중인 경기가 없습니다" />
                        <p className="absolute top-[calc(7rem)] font-pretendardBlack text-[calc(0.4rem)] text-gray-500">현재 진행중인 경기가 없어요</p>
                    </div>
                    ) : (
                    <div className="absolute flex flex-col justify-center left-[calc(1.13125rem)] top-[calc(13.5rem)] w-[calc(18.125rem)] h-[calc(4.375rem)]">
                        {playScheduleData.map((data, index) => (
                            <CardForm key={index} className="absolute flex flex-col justify-center left-[calc(1.13125rem)] w-[calc(18.125rem)] h-[calc(4.375rem)] rounded-[15px] border-stone-70" style={{ top: `calc(${index * 6.4375}rem)`}} onClick={() => handlePlayScheduleClick(data.state, data.key)}>
                                <CardHeader className="absolute flex items-center left-1/2 transform -translate-x-1/2 p-0 top-[calc(0.1875rem)] w-[calc(4.9375rem)] text-[calc(0.625rem)] text-gray-400">
                                    {data.date}
                                </CardHeader>
                                <CardContent className="flex items-center p-0">
                                    <div className="absolute flex justify-center items-center left-[calc(0.3875rem)] w-[calc(3rem)] h-[calc(3rem)]">
                                        {(() => {
                                            var t = '';
                                            
                                            if (data.state === "matching_active") {
                                                t = '매칭중';
                                            } else if (data.state === "matching_inactive") {
                                                t = (<>매칭<br></br>완료</>);
                                            } else if (data.state === "recruitment_active") {
                                                t = '모집중';
                                            } else {
                                                t = (<>모집<br></br>완료</>);
                                            }
                                            return (
                                                <p className="flex justify-center items-center w-[calc(2.5rem)] h-[calc(2.5rem)] font-pretendardBlack text-[calc(0.525rem)] border-4 rounded-full" style={{ 'borderColor': /중$/.test(t) ? '#F24E1E' : '#A6E672' }}>
                                                    {t}
                                                </p>
                                            );})()
                                        }
                                    </div>
                                    <div className="absolute left-[calc(3.4375rem)] w-[calc(3.0625rem)] font-pretendardBold text-lg">{data.time}</div>
                                    <CardTitle className="absolute left-[calc(7.0rem)] top-[calc(1.4rem)] text-[calc(1.0rem)] text-sm">{data.place}</CardTitle>
                                </CardContent>
                                <CardFooter className="absolute left-[calc(6.5rem)] bottom-2.5 justify-end items-end p-0">
                                    <CardDescription className="flex text-[0.625rem]">
                                        {data.tags.map((tag, index) => (
                                            <span key={index} className="mx-2 font-pretendardBold text-[calc(.5rem)] text-gray-400">{tag}</span>
                                        ))}
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
                                    className="self-start mt-2 mb-2 ml-2 w-5 h-5 bg-[#FF5F51] rounded-full shadow-sm font-bold text-white flex items-center justify-center"
                                >
                                    &times;
                                </button>
                                {/* image content */}
                                <div className="w-full min-h-[11.25rem] bg-white">
                                    {playScheduleData[detailKey.key].images.length === 0 ? (
                                        <>
                                            <img className="inline w-full h-[calc(9.875rem)]" src={defaultFieldImage} alt={`기본 이미지`}/>
                                            <div className="absolute flex right-5 items-center justify-center h-[calc(1.5rem)] top-40 text-white/50 text-[calc(0.5rem)]">
                                                <strong>기본 제공되는 이미지 입니다</strong>
                                            </div>
                                        </>
                                        ) : (
                                        <>
                                            <Slider {...settings}>
                                                {playScheduleData[detailKey.key].images.map((image, index) => (
                                                    <div key={index} className="w-full h-[calc(9.375rem)]">
                                                        <img className="inline w-full h-auto" src={image} alt={`구장사진${index}`}/>
                                                    </div>
                                                ))}
                                            </Slider>
                                            <div className="absolute flex right-5 items-center justify-center w-[calc(4.03rem)] h-[calc(1.5rem)] top-40 rounded-full bg-black/30 text-white text-sm">
                                                <strong>{`${slideIndex + 1}`}</strong>
                                                &nbsp;|&nbsp;
                                                <p className="text-gray-200">{`${playScheduleData[detailKey.key].images.length}`}</p>
                                            </div>
                                        </>
                                        )
                                    }
                                </div>
                                {/* detail content */}
                                <div className="flex flex-col w-full min-h-[22.5rem] p-4 bg-white text-black">
                                    {/* place and time content */}
                                    <div className="border-b-[calc(0.05rem)] mb-5">
                                        <p className="font-pretendardBold text-base">{formatScheduleDateTime(playScheduleData[detailKey.key].date)} {playScheduleData[detailKey.key].time}</p>
                                        <p className="text-[calc(1.65625rem)]">{playScheduleData[detailKey.key].place}</p>
                                        <div className="text-[calc(.75rem)] mb-5">
                                            {playScheduleData[detailKey.key].location}
                                            &nbsp;
                                            <span className="text-gray-600 text-[calc(0.5rem)] underline" onClick={() => handleMap()}>지도로 보기➚</span>
                                        </div>
                                        
                                    </div>
                                    {/* required content */}
                                    <div className="grid grid-cols-2 gap-4 border-b-[calc(0.05rem)] mb-5">
                                        <h3 className="col-span-2 text-lg font-pretendardBold mb-2">모집조건</h3>
                                        {playScheduleData[detailKey.key].tags.map((tag, index) => (
                                            <div key={index} className="flex items-center">
                                                <img src={conditionIcons[index]} alt={`condition${index}`} width={20} height={20}/>
                                                <p className="ml-3 text-[#282B33]">{tag}</p>
                                            </div>
                                        ))}
                                        <div className="col-span-2 mb-5"></div>
                                    </div>
                                    {/* writer content */}
                                    <div className="flex flex-col items-start">
                                        <div className="flex items-center">
                                            <img src={playScheduleData[detailKey.key].writer.profileImage} alt="프로필 사진" width={20} height={20}/>
                                            <p className="ml-2 text-[calc(.8rem)]">{playScheduleData[detailKey.key].writer.name} 작성자가 진행해요</p>
                                        </div>
                                    </div>
                                </div>
                                {/* team info content */}
                                <div className="flex flex-col items-start justify-center mt-4 bg-white relative">
                                    <img className="w-full mb-4" src={playGroundIcon} alt="경기장 배경" />
                                    <div className="flex justify-center w-full absolute bottom-1.5/2">
                                        {
                                            playScheduleData[detailKey.key].players.map((player, index) => (
                                                <div key={index} className="flex flex-col items-center mx-2" onClick={() => handlePlayerClick(player.userId)}>
                                                    <img className="rounded-full border-[calc(0.15rem)] border-stone-10 border-b-blue-300 object-cover object-center" src={player.profileImage} alt="프로필 사진" width={50} height={50}/>
                                                    <p className="font-pretendardBold text-white text-[calc(0.7rem)]">{player.name}</p>
                                                </div>
                                            ))
                                        }
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

export default PlaySchedulePage;
