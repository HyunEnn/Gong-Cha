import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

import { TiArrowBackOutline } from 'react-icons/ti';
import { useFindMatchBoardStore } from '@/stores/findMatchBoardStore';

import ManchesterCity from '@/assets/examples/manchester-city.svg';
import TottenhamHotspur from '@/assets/examples/tottenham-hotspur.svg';
import cardBackground from '@/assets/images/teamBackground.png';

function FindMatchDetailPage() {
    const params = useParams();
    const navigate = useNavigate();
    const { dummyFindMatchList } = useFindMatchBoardStore();
    const detailBoard = dummyFindMatchList[params.id - 1];

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
                <p className="mt-4 font-ygJalnan">
                    {detailBoard.clubName}({detailBoard.averageStat})
                </p>
            </div>
            {/* 선수 카드 */}
            <div className="relative flex items-center justify-center mt-4 h-60">
                <img
                    src={cardBackground}
                    alt="선수 카드 배경화면"
                    className="absolute top-0 left-0 z-0 object-cover w-full h-full px-2"
                />
                <Carousel className="absolute z-10 w-40 max-w-xs" style={{ top: '50%', transform: 'translateY(-50%)' }}>
                    <CarouselContent>
                        {Array.from({ length: 5 }).map((_, index) => (
                            <CarouselItem key={index}>
                                <div className="p-1">
                                    <Card>
                                        <CardContent className="flex items-center justify-center p-6 aspect-square">
                                            <span className="text-4xl font-semibold">{index + 1}</span>
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

            {/* 매칭 정보 */}
            <div className="px-2">ㅇㅇ</div>
            {/* 매칭 버튼 */}
        </div>
    );
}
export default FindMatchDetailPage;
