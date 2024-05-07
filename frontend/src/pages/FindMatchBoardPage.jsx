import { useNavigate } from 'react-router-dom';

import DatePicker from '@/components/DatePicker';
import { InputWithButton } from '@/components/InputWithButton';
import { Button } from '@/components/ui/button';
import SelectCollection from '@/components/SelectCollection';
import FindMatchBoard from '@/components/FindMatchBoard';

function FindMatchBoardPage() {
    const navigate = useNavigate();
    const handleOpenFindMatchInput = () => {
        navigate('/findmatch/input');
    };
    return (
        <div className="px-2 mt-4">
            {/* 제목 */}
            <p className="text-2xl font-ygJalnan">매칭해요</p>
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
