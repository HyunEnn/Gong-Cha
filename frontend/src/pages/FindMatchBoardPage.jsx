import { useNavigate } from 'react-router-dom';

import lArrowIcon from '@/assets/icons/lArrow.svg';
import DatePicker from '@/components/DatePicker';
import { InputWithButton } from '@/components/InputWithButton';
import { Button } from '@/components/ui/button';
import SelectCollection from '@/components/SelectCollection';
import FindMatchBoard from '@/components/FindMatchBoard';

function FindMatchBoardPage() {
    const navigate = useNavigate();
    const handleBackClick = () => {
        navigate('/main');
    };
    const handleOpenFindMatchInput = () => {
        navigate('/findmatch/input');
    };
    return (
        <div className="px-2 mt-4">
            <div
                onClick={handleBackClick}
                className="absolute left-[calc(.7rem)] top-[calc(2.0rem)] w-[calc(1.5625rem)] h-[calc(1.875rem)] cursor-pointer"
            >
                <img src={lArrowIcon} alt="돌아가기" />
            </div>
            {/* 제목 */}
            <div className="mt-16 ml-4 text-xl font-ygJalnan">매칭해요</div>
            {/* 검색창 */}
            <div className="flex justify-end mt-4">
                <InputWithButton />
            </div>
            <div className="mt-4" /> {/* 공백 */}
            {/* 날짜 슬라이더 */}
            <DatePicker />
            <div className="mt-4" /> {/* 공백 */}
            {/* 선택 탭들 */}
            <SelectCollection />
            {/* 게시글 작성 버튼 */}
            <div className="flex justify-end mt-4">
                <Button className="h-8" onClick={() => handleOpenFindMatchInput()}>
                    게시글 작성하기
                </Button>
            </div>
            {/* 게시판 출력 */}
            <FindMatchBoard />
        </div>
    );
}
export default FindMatchBoardPage;
