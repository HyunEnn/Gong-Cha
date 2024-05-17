import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFindMatchBoardStore } from '@/stores/findMatchBoardStore';

import ManchesterCity from '@/assets/examples/manchester-city.svg';
import TottenhamHotspur from '@/assets/examples/tottenham-hotspur.svg';

import { getMatchingList } from '@/apis/api/match';

function FindMatchBoard() {
    const navigate = useNavigate();
    const { dummyFindMatchList } = useFindMatchBoardStore();

    // 데이터 목록과 로딩 상태를 관리합니다.
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [startIndex, setStartIndex] = useState(0); // 시작 인덱스를 관리하는 상태 추가
    // 마지막 요소를 추적하기 위한 ref 생성
    const observer = useRef();

    useEffect(() => {
        getMatchingList(
            (success) => {
                console.log('매칭 게시판 전체 조회 성공', success);
            },
            (fail) => {
                console.log('매칭 게시판 전체 조회 실패', fail);
            }
        );
    }, []);

    const lastItemRef = useCallback(
        (node) => {
            if (loading) return;
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    // 여기서 데이터를 더 불러오는 로직을 구현합니다.
                    console.log('마지막 요소가 보임');
                    fetchMoreItems();
                }
            });
            if (node) observer.current.observe(node);
        },
        [loading]
    );

    // 데이터를 불러오는 함수
    const fetchMoreItems = () => {
        if (startIndex >= dummyFindMatchList.length) return; // 모든 데이터를 이미 불러왔다면 더 이상 진행하지 않음
        setLoading(true);
        // 예시: 임의의 데이터를 더 불러온다고 가정합니다.
        setTimeout(() => {
            const nextItems = dummyFindMatchList.slice(startIndex, startIndex + 10);
            setItems((prevItems) => [...prevItems, ...nextItems]);
            setStartIndex((prevStartIndex) => prevStartIndex + 10);
            setLoading(false);
        }, 1000);
    };

    // 컴포넌트 마운트 시 초기 데이터 로드
    useEffect(() => {
        fetchMoreItems();
    }, []);

    const handleOpenFindMatchDetail = (value) => {
        // console.log(value);
        // updateFindPlayerBoardStore로 게시글 설정
        navigate(`/findmatch/detail/${value + 1}`);
    };

    const renderClubIcon = (iconName) => {
        switch (iconName) {
            case 'ManchesterCity':
                return <img src={ManchesterCity} className="w-14 h-14" />;
            case 'TottenhamHotspur':
                return <img src={TottenhamHotspur} className="w-14 h-14" />;
            default:
                return null;
        }
    };
    return (
        <>
            {/* dummy를 real로 변경 필요 */}
            {items.map((value, index) => (
                <div
                    key={index}
                    ref={index === items.length - 1 ? lastItemRef : null}
                    className="grid grid-cols-4 gap-4 p-2 mt-4 border border-solid rounded-lg"
                    onClick={() => handleOpenFindMatchDetail(index)}
                >
                    <div className="flex flex-row items-center justify-center pl-2 text-xl font-pretendardBold">
                        {renderClubIcon(value.clubIcon)}
                    </div>
                    <div className="flex flex-col justify-center col-span-2">
                        <div className=" font-pretendardBold">
                            {value.clubName}({value.averageStat})
                        </div>
                        <div className="text-xs font-pretendardRegular text-neutral-500">
                            •{value.place}&nbsp;&nbsp;•{value.level}&nbsp;&nbsp;•{value.headCount}
                        </div>
                    </div>
                    <div className="flex flex-col justify-center">
                        <div className="text-lg font-pretendardBold">{value.time}</div>
                    </div>
                </div>
            ))}
            {loading && <p className="mt-10 text-center font-gmarketSansBold">Loading...</p>}
        </>
    );
}

export default FindMatchBoard;
