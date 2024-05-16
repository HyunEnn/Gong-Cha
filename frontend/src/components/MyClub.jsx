import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ClubApplyListModal from '@/components/ClubApplyListModal';
import { useClubStore } from '@/stores/clubStore';

import crown from '@/assets/images/crown.png';
import ManchesterCity from '@/assets/examples/manchester-city.svg';
import HoverPlayerCard from '@/components/HoverPlayerCard';

function MyClub() {
    const { dummyClubList, myClubInfoReadResponse, myClubListReadResponse } = useClubStore();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCardVisible, setIsCardVisible] = useState(false);
    const [activeCardIndex, setActiveCardIndex] = useState(null); // 추가된 상태
    // 위치 정보 상태 추가
    const [cardPosition, setCardPosition] = useState({ top: 0, left: 0 });

    const positionDivRefs = useRef([]);

    useEffect(() => {
        // 참조 배열에 대해 반복하여 각 원소의 위치 정보를 출력
        positionDivRefs.current.forEach((ref, index) => {
            if (ref) {
                const rect = ref.getBoundingClientRect();
                //console.log(`Element ${index} - Top: ${rect.top}, Left: ${rect.left}`);
            }
        });

        // 내 클럽 정보 조회 axios
    }, []); // 의존성 배열이 빈 배열이므로 컴포넌트 마운트 시에만 실행됩니다.

    const handleOpenApplyList = () => {
        setIsModalOpen(true);
    };

    const handleCloseApplyList = () => {
        setIsModalOpen(false);
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
        <div className="px-2 mt-4">
            {isModalOpen && <ClubApplyListModal isOpen={isModalOpen} onClose={() => handleCloseApplyList()} />}
            {/* 나의 클럽 정보 */}
            <div className="flex flex-col items-start p-4 mx-auto mt-4 border border-solid rounded-lg">
                <div>{renderClubIcon(dummyClubList[0].clubIcon)}</div>
                <p className="font-gmarketSansRegular">
                    <span className="font-gmarketSansBold">클럽명 :</span> {dummyClubList[0].clubName}
                </p>
                <p className="font-gmarketSansRegular">
                    <span className="font-gmarketSansBold">클럽 평균 능력치 : </span>
                    {dummyClubList[0].averageStat}
                </p>
                <p className="font-gmarketSansRegular">
                    <span className="font-gmarketSansBold">클럽 경기 수준 : </span>
                    {dummyClubList[0].level}
                </p>
                <p className="font-gmarketSansRegular">
                    <span className="font-gmarketSansBold">현재 소속 인원 : </span>
                    {dummyClubList[0].peopleCnt}명
                </p>
                <p className="font-gmarketSansRegular">
                    <span className="font-gmarketSansBold">활동 지역 : </span>
                    {dummyClubList[0].region}&nbsp;
                    {dummyClubList[0].districts}
                </p>
                <p className="font-gmarketSansRegular">
                    <span className="font-gmarketSansBold">활동 시간 : </span>
                    {dummyClubList[0].timeStart}~{dummyClubList[0].timeEnd}
                </p>
                <p className="font-gmarketSansRegular">
                    <span className="font-gmarketSansBold">클럽 소개 : </span>
                    {dummyClubList[0].introduce}
                </p>
            </div>
            {/* 버튼과 검색창 */}
            <div className="flex flex-row justify-between mt-4">
                <Button size="sm" onClick={() => handleOpenApplyList()}>
                    가입 신청 목록
                </Button>
                <div className="flex flex-row">
                    <Input type="text" className="py-2 pl-3 pr-8 w-36 h-9" placeholder="선수명으로 검색" />
                    &nbsp;&nbsp;
                    <Button size="sm">검색</Button>
                </div>
            </div>
            {/* 나의 클럽 리스트 */}
            {/* 호버 시 선수카드가 보임 */}
            <div>
                {isCardVisible && (
                    <HoverPlayerCard
                        cardInfo={myClubListReadResponse[activeCardIndex]}
                        index={activeCardIndex}
                        position={cardPosition}
                    />
                )}
                {myClubListReadResponse.map((value, index) => (
                    <div
                        key={index}
                        ref={(el) => (positionDivRefs.current[index] = el)}
                        className={`p-1 mt-4 border border-solid rounded-lg ${
                            activeCardIndex === index ? 'bg-gray-200' : ''
                        }`}
                        onTouchStart={() => {
                            setIsCardVisible(true);
                            setActiveCardIndex(index);
                            // 선택된 카드의 위치 정보를 설정
                            const rect = positionDivRefs.current[index].getBoundingClientRect();
                            setCardPosition({ top: rect.top, left: rect.left });
                        }}
                        onTouchEnd={() => {
                            setIsCardVisible(false);
                            setActiveCardIndex(-1); // 활성 카드 인덱스를 초기화
                        }}
                    >
                        <div className="grid grid-cols-3">
                            <div className="flex items-center justify-center">
                                <img
                                    src={value.playerImg}
                                    alt="선수 이미지"
                                    style={{ width: '4rem', height: '4rem', objectFit: 'contain' }}
                                />
                            </div>
                            <div className="flex flex-col items-start justify-center">
                                <p className="text-lg font-gmarketSansBold">{value.userId}</p>
                                <p className="text-xs font-gmarketSansRegular">{value.phoneNumber}</p>
                            </div>
                            <div className="flex flex-col items-center justify-around text-center">
                                <div>
                                    <img
                                        src={crown}
                                        alt="클럽장"
                                        style={{
                                            width: '1rem',
                                            height: '1rem',
                                            visibility: value.isMaster ? 'visible' : 'hidden',
                                        }}
                                    />
                                </div>

                                <div>
                                    <p className="text-[calc(0.5rem)] text-gray-500 font-pretendardRegular">
                                        선수 가치
                                    </p>
                                    <p className="text-[calc(0.7rem)] font-gmarketSansBold">{value.averageStat}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MyClub;
