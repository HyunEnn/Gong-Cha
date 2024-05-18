import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import emptyGhostIcon from '@/assets/icons/emptyGhost.svg';
import Modal from '@/components/Modal';
import TeamInfo from '@/components/TeamInfo';
import { myTeamInfoDummyData } from '@/data/dummyData'; // dummy data

const regions = [
    { id: 1, region: '서울', districts: ['강남구', '송파구', '강서구', '마포구', '종로구', '중구', '용산구', '성동구', '광진구', '동대문구', '중랑구', '성북구', '강북구', '도봉구', '노원구', '은평구', '서대문구', '구로구', '금천구', '영등포구', '동작구', '관악구', '서초구', '강동구'] },
    { id: 2, region: '부산', districts: ['해운대구', '수영구', '남구', '북구', '동래구', '금정구', '부산진구', '연제구', '사하구', '강서구', '사상구', '기장군'] },
    { id: 3, region: '대구', districts: ['수성구', '달서구', '북구', '동구', '서구', '남구', '달성군'] },
    { id: 4, region: '인천', districts: ['연수구', '남동구', '서구', '부평구', '계양구', '미추홀구', '동구', '중구', '강화군', '옹진군'] },
    { id: 5, region: '광주', districts: ['서구', '북구', '광산구', '남구', '동구'] },
    { id: 6, region: '대전', districts: ['서구', '유성구', '대덕구', '중구', '동구'] },
    { id: 7, region: '울산', districts: ['울주군', '남구', '북구', '동구', '중구'] },
    { id: 8, region: '세종', districts: ['세종특별자치시'] },
    { id: 9, region: '경기', districts: ['수원시', '성남시', '고양시', '용인시', '부천시', '안산시', '안양시', '남양주시', '화성시', '평택시', '의정부시', '시흥시', '파주시', '김포시', '광명시', '광주시', '군포시', '이천시', '양주시', '오산시', '구리시', '안성시', '포천시', '의왕시', '하남시', '여주시', '양평군', '동두천시', '가평군', '과천시'] },
    { id: 10, region: '강원', districts: ['춘천시', '원주시', '강릉시', '동해시', '태백시', '속초시', '삼척시'] },
    { id: 11, region: '충북', districts: ['청주시', '충주시', '제천시'] },
    { id: 12, region: '충남', districts: ['천안시', '공주시', '보령시', '아산시', '서산시', '논산시', '계룡시', '당진시'] },
    { id: 13, region: '전남', districts: ['목포시', '여수시', '순천시', '나주시', '광양시'] },
    { id: 14, region: '전북', districts: ['전주시', '군산시', '익산시', '정읍시', '남원시', '김제시'] },
    { id: 15, region: '경남', districts: ['창원시', '진주시', '통영시', '사천시', '김해시', '밀양시', '거제시', '양산시'] },
    { id: 16, region: '경북', districts: ['포항시', '경주시', '김천시', '안동시', '구미시', '영주시', '영천시', '상주시', '문경시', '경산시'] },
    { id: 17, region: '제주', districts: ['제주시', '서귀포시'] },
];

function MyTeamInfo() {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [myTeamInfoData, setMyTeamInfoData] = useState([]);
    const [selectedRegion, setSelectedRegion] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [teamInfo, setTeamInfo] = useState({});

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

    const handleCreateButton = () => {
        setShowModal(true);
    };

    const handleLeftButton = () => {
        // axios whatdagotta
        
        navigate(0);
    };

    const handleCreateSubmit = () => {
        setShowModal(false);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const handleOutsideClick = () => {
        closeModal();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTeamInfo(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setTeamInfo(prevState => ({
            ...prevState,
            [name]: checked
        }));
    };

    const handleDayChange = (e, day) => {
        const { checked } = e.target;
        if (checked) {
            setTeamInfo(prevState => ({
                ...prevState,
                day: [...prevState.day, day]
            }));
        } else {
            setTeamInfo(prevState => ({
                ...prevState,
                day: prevState.day.filter(d => d !== day)
            }));
        }
    };

    const handleRegionChange = (e) => {
        setSelectedRegion(e.target.value);
        setSelectedDistrict('');
        setTeamInfo(prevState => ({
            ...prevState,
            location: e.target.value
        }));
    };

    const handleDistrictChange = (e) => {
        setSelectedDistrict(e.target.value);
        setTeamInfo(prevState => ({
            ...prevState,
            location: `${selectedRegion} ${e.target.value}`
        }));
    };

    return (
        <div className="absolute flex justify-center">
            {/* create team button */}
            <div className="absolute flex flex-col">
                <div className="absolute flex items-center justify-center top-[calc(11.5rem)] w-[calc(22.25rem)]">
                    {myTeamInfoData.length === 0 ? (
                            <button
                                className="relative left-[calc(8rem)] w-[calc(4rem)] h-[calc(2rem)] text-gray-700 rounded-full border-[calc(.1rem)] border-gray-100 font-bold text-[calc(.6rem)]"
                                onClick={handleCreateButton}
                            >
                                팀 생성하기
                            </button>
                    ) : (
                        <button
                        className="relative left-[calc(8rem)] w-[calc(4rem)] h-[calc(2rem)] text-gray-700 rounded-full border-[calc(.1rem)] border-gray-100 font-bold text-[calc(.6rem)]"
                        onClick={handleLeftButton}
                        >
                            팀 나가기
                        </button>
                        )}
                </div>
            </div>
            <>
                {/* team info */}
                <div className="relative w-full left-[calc(1.13125rem)]">
                    <div className="absolute left-1/2 top-[calc(15rem)] w-[calc(20.25rem)] rounded bg-slate-50">
                        {myTeamInfoData.length === 0 ? (
                            <div className="absolute flex justify-center top-[calc(10rem)] transform -translate-x-1/2 p-0 w-[calc(6rem)] h-[calc(6rem)]">
                                <img src={emptyGhostIcon} alt="나의 팀이 없습니다" />
                                <p className="absolute top-[calc(7rem)] font-pretendardBlack text-[calc(0.4rem)] text-gray-500">나의 팀이 없어요</p>
                            </div>
                        ) : (
                            <TeamInfo></TeamInfo>
                        )}
                        <div className="mb-[calc(10rem)]"></div>
                    </div>
                </div>
            </>
            {/* create team modal */}
            {showModal && (
                <Modal show={showModal} onClose={closeModal}>
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

                            {/* create submit */}
                            <form className="flex flex-col items-start justify-start w-full p-4">
                                <label>
                                    친선전 여부
                                    <input
                                        type="checkbox"
                                        name="isFriendly"
                                        checked={teamInfo.isFriendly}
                                        onChange={handleCheckboxChange}
                                    />
                                </label>
                                <label>
                                    시:
                                    <select
                                        name="location"
                                        value={selectedRegion}
                                        onChange={handleRegionChange}
                                        className="w-full"
                                    >
                                        <option value="">시 선택</option>
                                        {regions.map(region => (
                                            <option key={region.id} value={region.region}>
                                                {region.region}
                                            </option>
                                        ))}
                                    </select>
                                </label>
                                <label>
                                    군/구:
                                    <select
                                        name="district"
                                        value={selectedDistrict}
                                        onChange={handleDistrictChange}
                                        className="w-full"
                                    >
                                        <option value="">군/구 선택</option>
                                        {regions.find(region => region.region === selectedRegion)?.districts.map(district => (
                                            <option key={district} value={district}>
                                                {district}
                                            </option>
                                        ))}
                                    </select>
                                </label>
                                <label>
                                    시간:
                                    <span>{teamInfo.time}시</span>
                                </label>
                                <label>
                                    요일:
                                    <div className="flex flex-wrap">
                                        {['월', '화', '수', '목', '금', '토', '일'].map((day) => (
                                            <label key={day} className="mr-4">
                                                <input
                                                    type="checkbox"
                                                    name="day"
                                                    value={day}
                                                    checked={teamInfo.day.includes(day)}
                                                    onChange={(e) => handleDayChange(e, day)}
                                                />
                                                {day}
                                            </label>
                                        ))}
                                    </div>
                                </label>
                                <label>
                                    경기 난이도:
                                    <select
                                        name="difficulty"
                                        value={teamInfo.difficulty}
                                        onChange={handleChange}
                                        className="w-full"
                                    >
                                        <option value="Beginner">초급</option>
                                        <option value="Intermediate">중급</option>
                                        <option value="Advanced">상급</option>
                                    </select>
                                </label>
                                <label>
                                    클럽원 리스트:
                                    <input
                                        type="text"
                                        name="clubMembers"
                                        value={teamInfo.clubMembers.join(', ')}
                                        onChange={handleChange}
                                    />
                                </label>
                                <button
                                    className="w-full mt-[calc(14rem)] bg-green-500 text-white py-2 rounded-md font-bold"
                                    onClick={handleCreateSubmit}
                                >
                                    생성하기
                                </button>
                            </form>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
}

export default MyTeamInfo;
