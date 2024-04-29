import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { getPlaySchedule } from '@/apis/api/playschedule';
import Modal from '@/components/Modal';
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
import emptyGhostIcon from '@/assets/icons/emptyGhost.svg';
import playGroundIcon from '@/assets/icons/playground.svg';
import { playScheduleDummyData } from '@/data/dummyData'; // dummy data

function PlaySchedulePage() {
    const navigate = useNavigate();
    const [playScheduleData, setPlayScheduleData] = useState([]);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [detailKey, setDetailKey] = useState({ state: '', key: '' });

    useEffect(() => {
        setPlayScheduleData(    // dummy data
            playScheduleDummyData,
        );
        /* axios for db connection
        getPlaySchedule(
            key,
            (success) => {
                setPlayScheduleData({
                    ...playScheduleData,
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
        } else if (state === "matching_inactive") {
            console.log("둔 " + key);
        } else if (state === "recruitment_active") {
            console.log("딕 " + key);
        } else {
            console.log("띡 " + key);
        }
        */
        setDetailKey({ state, key });
        setShowDetailModal(true);
    };

    const closeModal = () => {
        setShowDetailModal(false);
    };
    
    const handleOutsideClick = () => {
        closeModal();
    };

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
                            <CardForm key={index} className="absolute flex flex-col justify-center left-[calc(1.13125rem)] w-[calc(18.125rem)] h-[calc(4.375rem)] rounded-[15px]" style={{ top: `calc(${index * 6.4375}rem)`}} onClick={() => handlePlayScheduleClick(data.state, data.key)}>
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
                )}          
                {showDetailModal && (
                    <Modal show={showDetailModal} onClose={closeModal}>
                        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center" onClick={handleOutsideClick}>
                            <div
                                className="bg-stone-100 w-[calc(22.5rem)] h-[calc(31.25rem)] flex flex-col items-center justify-start relative overflow-y-auto p-4" 
                                onClick={e => e.stopPropagation()}
                            >
                                <button
                                    onClick={closeModal} 
                                    className="self-start mt-2 ml-2 w-5 h-5 bg-[#FF5F51] rounded-full shadow-sm font-bold text-white flex items-center justify-center"
                                >
                                    ×
                                </button>
                                <div className="w-full min-h-[300px] bg-red-700 my-4 p-4">
                                    {/* Red box content */}
                                    <p className="text-white text-center">빨간 박스 내용</p>
                                </div>
                                <div className="w-full flex flex-col items-center justify-center bg-blue-700 my-4 p-4 text-white">
                                    <p>장소: {playScheduleData[detailKey.key - 1].place}</p>
                                    <p>날짜: {playScheduleData[detailKey.key - 1].date} {playScheduleData[detailKey.key - 1].time}</p>
                                    {playScheduleData[detailKey.key - 1].tags.map((tag, index) => (
                                        <p key={index}>{tag}</p>
                                    ))}
                                    <p>글쓴이</p>
                                </div>
                                <img className="w-full mb-4" src={playGroundIcon} alt="경기장" />
                            </div>
                        </div>
                    </Modal>
                )}
            </>
        </>
    );
}

export default PlaySchedulePage;
