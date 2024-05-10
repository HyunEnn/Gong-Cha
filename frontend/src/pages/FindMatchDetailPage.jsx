import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';

import { TiArrowBackOutline } from 'react-icons/ti';
import { useFindMatchBoardStore } from '@/stores/findMatchBoardStore';
import { useCardStore } from '@/stores/cardStore';

import PlayerCardCarousel from '@/components/PlayerCardCarousel';
import ManchesterCity from '@/assets/examples/manchester-city.svg';
import TottenhamHotspur from '@/assets/examples/tottenham-hotspur.svg';
import cardBackground from '@/assets/images/teamBackground.png';
import levelIcon from '@/assets/icons/level.svg';
import peopleIcon from '@/assets/icons/people.svg';
import wordIntroduceIcon from '@/assets/icons/wordIntroduce.svg';
import calendarIcon from '@/assets/icons/calendar.svg';
import infoIcon from '@/assets/icons/info.svg';

function FindMatchDetailPage() {
    const params = useParams();
    const navigate = useNavigate();
    const { dummyFindMatchList } = useFindMatchBoardStore();
    const { myCardData } = useCardStore();
    const detailBoard = dummyFindMatchList[params.id - 1];

    const [profileData, setProfileData] = useState({});

    useEffect(() => {
        if (myCardData) {
            console.log('헬스');
            setProfileData(myCardData);
        }
    }, [myCardData]);

    useEffect(() => {
        /* axios for db connection
        getProfileInfo(
            key,
            (success) => {
                setProfileData({
                    ...profileData,
                });
            },
            (fail) => {
                
            }
        );
        return () => {
            
        };
        */
    }, []);

    useEffect(() => {
        console.log(detailBoard);
    }, []);

    const handleGoBack = () => {
        navigate('/findmatch/board');
    };

    const renderClubIcon = (iconName) => {
        // 클럽 아이콘 크기 커스텀은 여기서 합니다.
        switch (iconName) {
            case 'ManchesterCity':
                return <img src={ManchesterCity} className="w-28 h-28" />;
            case 'TottenhamHotspur':
                return <img src={TottenhamHotspur} className="w-28 h-28" />;
            default:
                return null;
        }
    };

    return (
        <div className="px-2 mt-4">
            {/* 클럽 도입부 */}
            <div className="mt-4">
                <TiArrowBackOutline size={'1.5rem'} onClick={handleGoBack} />
            </div>
            <div className="flex flex-col items-center justify-center">
                {renderClubIcon(detailBoard.clubIcon)}
                <p className="mt-4 text-xl font-ygJalnan">
                    {detailBoard.clubName}({detailBoard.averageStat})
                </p>
                <p className="text-sm text-gray-500 font-pretendardRegular">{detailBoard.place}</p>
            </div>
            {/* 선수 카드 */}
            <div className="relative flex items-center justify-center mt-2 h-60">
                <img
                    src={cardBackground}
                    alt="선수 카드 배경화면"
                    className="absolute top-0 left-0 z-0 object-cover w-full h-full px-2 rounded-md"
                />
                <Carousel className="absolute z-10 w-40 max-w-xs" style={{ top: '50%', transform: 'translateY(-50%)' }}>
                    <CarouselContent>
                        {Array.from({ length: 5 }).map((_, index) => (
                            <CarouselItem key={index}>
                                <div className="p-1">
                                    <Card className="bg-transparent border-none">
                                        <CardContent className="relative w-40 h-48 p-6 aspect-square">
                                            {/* <span className="text-4xl font-semibold">{index + 1}</span> */}
                                            <PlayerCardCarousel player={profileData} />
                                        </CardContent>
                                    </Card>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>
            {/* Carousel 내부 카드 디자인 확인 용도 */}
            {/* <div className="relative">
                <PlayerCardCarousel player={profileData} />
            </div> */}
            {/* 매칭 정보 */}
            <div className="flex flex-col w-full px-2 mt-4 ">
                <div>
                    <div className="flex flex-row text-base font-gmarketSansBold w-full border-b-[calc(0.05rem)]">
                        <img src={wordIntroduceIcon} alt="모집 아이콘" className="w-5 h-5 mr-2" />
                        모집 한마디
                    </div>
                    <span className="mt-2 text-sm font-pretendardRegular">{detailBoard.introduce}</span>
                    {/* ---------------------------------------------- */}
                    <div className="flex flex-row mt-2 text-base font-gmarketSansBold w-full border-b-[calc(0.05rem)]">
                        <img src={infoIcon} alt="정보 아이콘" className="w-5 h-5 mr-2" />
                        매칭 정보
                    </div>
                    <div className="flex flex-row mt-2">
                        <img src={calendarIcon} alt="달력" className="w-4 h-4 mr-2" />

                        <span className="text-xs font-gmarketSansRegular">
                            {detailBoard.date}&nbsp;{detailBoard.time}
                        </span>
                    </div>

                    <div className="flex flex-row mt-2">
                        <img src={levelIcon} alt="경기 수준" className="w-5 h-5 mr-2" />

                        <span className="mr-24 text-sm font-pretendardRegular">{detailBoard.level}</span>

                        <img src={peopleIcon} alt="경기 인원 수" className="w-5 h-5 mr-2" />

                        <span className="text-sm font-pretendardRegular">{detailBoard.headCount}</span>
                    </div>
                </div>
            </div>
            <div className="px-2 mt-4"> </div>
            {/* 매칭 버튼 */}
            <div className="flex flex-row justify-around ">
                <Button size="sm">수정하기</Button>
                <Button size="sm" className="bg-lime-500 hover:bg-lime-500/80">
                    매칭 지원하기
                </Button>
                <Button size="sm" variant="destructive">
                    삭제하기
                </Button>
            </div>
        </div>
    );
}
export default FindMatchDetailPage;
