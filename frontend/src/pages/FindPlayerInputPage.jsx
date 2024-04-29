import TimePicker from 'react-time-picker';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { TiArrowBackOutline } from 'react-icons/ti';

function FindPlayerInputPage() {
    const navigate = useNavigate();

    const [time, setTime] = useState('시간을 등록해 주세요');
    const [value, onChange] = useState('10:00');

    const [place, setPlace] = useState('');
    const [text, setText] = useState('');
    const [gender, setGender] = useState('');
    const [inOrOut, setInOrOut] = useState('');
    const [level, setLevel] = useState('');
    const [totalPeople, setTotalPeople] = useState('');
    const [currentPeople, setCurrentPeople] = useState('');
    const [writer, setWriter] = useState('');

    const handleGoBack = () => {
        navigate('/findplayer/board');
    };

    return (
        <div className="px-2 mt-4">
            <div className="flex flex-row">
                <TiArrowBackOutline size={'1.5rem'} onClick={handleGoBack} />
                &nbsp;&nbsp;&nbsp;
                <p className="text-2xl font-ygJalnan">선수 구해요 게시글 등록</p>
            </div>
            <Accordion type="single" collapsible className="w-full mt-4">
                {/* 시간 등록 */}
                <AccordionItem value="item-1">
                    <AccordionTrigger>
                        <span>약속 시간</span>
                        <span>{time}</span>
                    </AccordionTrigger>
                    <AccordionContent>
                        <TimePicker className="text-xl" onChange={onChange} value={value} />
                    </AccordionContent>
                </AccordionItem>
                {/* 장소 등록 */}
                <AccordionItem value="item-2">
                    <AccordionTrigger>Is it styled?</AccordionTrigger>
                    <AccordionContent>
                        Yes. It comes with default styles that matches the other components&apos; aesthetic.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger>Is it animated?</AccordionTrigger>
                    <AccordionContent>
                        Yes. It&apos;s animated by default, but you can disable it if you prefer.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
}
export default FindPlayerInputPage;
