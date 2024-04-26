import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { useDateStore } from '@/stores/dateStore';

function DatePicker() {
    const { dateList } = useDateStore();

    const handleCardContent = (event) => {
        console.log('클릭', event.target);
    };
    return (
        <>
            <Carousel
                opts={{
                    align: 'start',
                }}
                className="w-full max-w-xs mx-auto "
            >
                <CarouselContent>
                    {dateList.map((value, index) => (
                        <CarouselItem key={index} className="basis-1/4">
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
            </Carousel>
        </>
    );
}

export default DatePicker;
