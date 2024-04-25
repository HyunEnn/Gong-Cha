import { useNavigate } from "react-router-dom";
import lArrowIcon from '@/assets/icons/lArrow.svg';

function PlayerCardPage() {
    const navigate = useNavigate();
    const handleBackClick = () => {
        navigate(-1);
    };

    return (
        <>
            <>
                <div className="" onClick={() => handleBackClick()}>
                    <img className="absolute left-[calc(0.7rem)] top-[calc(2.0rem)] p-0 inline w-[calc(1.5625rem)] h-[calc(1.875rem)]" src={lArrowIcon} alt="돌아가기" />
                </div>
            </>
            <>
                <div className="page-title">내 선수카드</div>
            </>
        </>
    );
}

export default PlayerCardPage;