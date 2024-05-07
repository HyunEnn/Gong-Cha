import { Link, useNavigate } from 'react-router-dom';
import Lottie from 'react-lottie';
import { CardForm, CardContent } from '@/components/CardForm';

import logo from '@/assets/icons/logo.svg';
import findPlayerIcon from '@/assets/icons/find-player.svg';
import findTeamIcon from '@/assets/icons/find-team.svg';
import findMatchIcon from '@/assets/icons/find-match.svg';
import rArrowIcon from '@/assets/icons/rArrow.svg';
import playerAnimation from '@/assets/lotties/playerAnimation';
import teamAnimation from '@/assets/lotties/teamAnimation';
import matchAnimation from '@/assets/lotties/matchAnimation';

function MainPage() {
    const navigate = useNavigate();
    const handleMoveFindPlayer = () => {
        navigate('/findplayer/board');
    };
    const handleMoveFindTeam = () => {
        navigate('/findteam/board');
    };
    const handleMoveFindMatch = () => {
        navigate('/findmatch/board');
    };
    return (
        <div className="px-2 mt-4">
            {/* 토스 UI 참고해서 메인페이지 디자인 */}
            <img src={logo} alt="서비스 로고" className="ml-4" />

            <div className="flex flex-col items-center">
                {/* 선수 구해요 */}
                <Lottie
                    options={{
                        loop: true,
                        autoplay: true,
                        animationData: playerAnimation,
                        rendererSettings: {
                            preserveAspectRatio: 'xMidYMid slice',
                        },
                    }}
                    width={150}
                    height={150}
                />
                <div
                    className=" flex justify-between w-[calc(19.75rem)] rounded transform transition duration-100 ease-in-out active:bg-gray-200 active:scale-90"
                    onClick={() => handleMoveFindPlayer()}
                >
                    <CardForm className="flex justify-center w-[calc(1.6875rem)] h-[calc(1.6875rem)] rounded-[7px] border-gray-50 bg-stone-50">
                        <CardContent className="p-[calc(0.125rem)] pl-[calc(0.15rem)]">
                            <img className="w-full h-full" src={findPlayerIcon} alt="선수 찾기" />
                        </CardContent>
                    </CardForm>
                    <span className="font-pretendardBlack">선수 구해요</span>
                    <img className="right-0 inline" src={rArrowIcon} alt="들어가기" />
                </div>
                {/* 팀 구해요 */}
                <Lottie
                    options={{
                        loop: true,
                        autoplay: true,
                        animationData: teamAnimation,
                        rendererSettings: {
                            preserveAspectRatio: 'xMidYMid slice',
                        },
                    }}
                    width={150}
                    height={150}
                />
                <div
                    className=" flex justify-between w-[calc(19.75rem)] rounded transform transition duration-100 ease-in-out active:bg-gray-200 active:scale-90"
                    onClick={() => handleMoveFindTeam()}
                >
                    <CardForm className="flex justify-center w-[calc(1.6875rem)] h-[calc(1.6875rem)] rounded-[7px] border-gray-50 bg-stone-50">
                        <CardContent className="p-[calc(0.125rem)] pl-[calc(0.15rem)]">
                            <img className="w-full h-full" src={findTeamIcon} alt="선수 찾기" />
                        </CardContent>
                    </CardForm>
                    <span className="font-pretendardBlack">팀 구해요</span>
                    <img className="right-0 inline" src={rArrowIcon} alt="들어가기" />
                </div>
                {/* 매칭 해요 */}
                <Lottie
                    options={{
                        loop: true,
                        autoplay: true,
                        animationData: matchAnimation,
                        rendererSettings: {
                            preserveAspectRatio: 'xMidYMid slice',
                        },
                    }}
                    width={150}
                    height={150}
                />
                <div
                    className=" flex justify-between w-[calc(19.75rem)] rounded transform transition duration-100 ease-in-out active:bg-gray-200 active:scale-90"
                    onClick={() => handleMoveFindMatch()}
                >
                    <CardForm className="flex justify-center w-[calc(1.6875rem)] h-[calc(1.6875rem)] rounded-[7px] border-gray-50 bg-stone-50">
                        <CardContent className="p-[calc(0.125rem)] pl-[calc(0.15rem)]">
                            <img className="w-full h-full" src={findMatchIcon} alt="선수 찾기" />
                        </CardContent>
                    </CardForm>
                    <span className="font-pretendardBlack">매칭해요</span>
                    <img className="right-0 inline" src={rArrowIcon} alt="들어가기" />
                </div>
                <Link to="/market/board">이적 시장</Link>
            </div>
        </div>
    );
}

export default MainPage;
