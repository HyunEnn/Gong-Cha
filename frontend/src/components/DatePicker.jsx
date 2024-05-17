import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { useDateStore } from '@/stores/dateStore';

function DatePicker() {
    const { dateList } = useDateStore();

    const handleCardContent = (event) => {
        // 클릭된 요소의 innerHTML을 가져옵니다.
        let htmlContent = event.target.innerHTML;

        // innerHTML에서 HTML 태그를 제거하고 줄바꿈을 공백으로 치환합니다.
        let textContent = htmlContent.replace(/<br\s*\/?>/gi, ' ').replace(/<\/?[^>]+(>|$)/g, '');

        console.log('클릭', textContent.trim());
        // console.log('클릭', event.target);
    };
    return (
        <div className="flex justify-center">
            <Carousel
                opts={{
                    align: 'start',
                }}
                className="w-64 max-w-xs mx-auto "
            >
                <CarouselContent>
                    {dateList.map((value, index) => (
                        <CarouselItem key={index} className="basis-1/3">
                            <div className="p-1">
                                <Card>
                                    <CardContent
                                        className="flex flex-col items-center justify-center p-6 aspect-square"
                                        onClick={handleCardContent}
                                    >
                                        <span
                                            className={`text-lg font-pretendardBold text-center ${
                                                value.weekday === '토' ? 'text-blue-500' : ''
                                            } ${value.weekday === '일' ? 'text-red-500' : ''}`}
                                        >
                                            {value.day}
                                            <br />
                                            {value.weekday}
                                        </span>
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
    );
}

export default DatePicker;
