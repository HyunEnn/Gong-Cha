import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import emptyGhostIcon from '@/assets/icons/emptyGhost.svg';
import rArrowIcon from '@/assets/icons/rArrow.svg';
import { TeamListDummyData } from '@/data/dummyData'; // dummy data

function TeamList() {
    const [teamListData, setTeamListData] = useState([]);

    useEffect(() => {
        setTeamListData(    // dummy data
            TeamListDummyData,
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

    return (
        <>
            {teamListData.length === 0 ? (
                <div className="absolute flex justify-center left-1/2 top-[calc(15rem)] transform -translate-x-1/2 p-0 w-[calc(6rem)] h-[calc(6rem)]">
                    <img src={emptyGhostIcon} alt="팀 목록이 없습니다" />
                    <p className="absolute top-[calc(7rem)] font-pretendardBlack text-[calc(0.4rem)] text-gray-500">팀 목록이 없어요</p>
                </div>
                ) : (
                    <>
                        <div className="absolute flex flex-col justify-center left-[calc(1.13125rem)] top-[calc(10.5rem)] w-[calc(20.2rem)] h-[calc(4.375rem)] bg-red-600">
                            <div className="absolute ml-2 -mt-5 text-[calc(.6rem)] text-black/50 font-pretendardBold">필터</div>
                        </div>
                        <div className="absolute flex flex-col justify-start left-[calc(1.13125rem)] top-[calc(15.5rem)] w-[calc(20.2rem)] bg-blue-700">
                            {teamListData.map((data) => (
                                    <div key={uuidv4()} className="border-b-[calc(0.05rem)]">
                                        <div className="mt-3 ml-1">
                                            <p>{data.writer.name} FC</p>
                                            <p>{data.location} | {data.time} | {data.tags.map(tag => Array.isArray(tag) ? tag.join(', ') : tag).join(', ')} | {data.currentPlayers} 명</p>
                                            <img className="absolute -mt-[calc(2.5rem)] right-1 inline" src={rArrowIcon} alt="들어가기" />
                                        </div>
                                    </div>
                                )
                            )}
                        </div>
                    </>
                )
            }
        </>
    );
}

export default TeamList;
