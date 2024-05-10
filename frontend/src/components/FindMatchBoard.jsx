import { useNavigate } from 'react-router-dom';
import { useFindMatchBoardStore } from '@/stores/findMatchBoardStore';

import ManchesterCity from '@/assets/examples/manchester-city.svg';
import TottenhamHotspur from '@/assets/examples/tottenham-hotspur.svg';

function FindMatchBoard() {
    const navigate = useNavigate();
    const { dummyFindMatchList } = useFindMatchBoardStore();

    const handleOpenFindMatchDetail = (value) => {
        // console.log(value);
        // updateFindPlayerBoardStore로 게시글 설정
        navigate(`/findmatch/detail/${value + 1}`);
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
        <>
            {/* dummy를 real로 변경 필요 */}
            {dummyFindMatchList.map((value, index) => (
                <div
                    key={index}
                    className="grid grid-cols-4 gap-4 p-2 mt-4 border border-solid rounded-lg"
                    onClick={() => handleOpenFindMatchDetail(index)}
                >
                    <div className="flex flex-row items-center justify-center pl-2 text-xl font-pretendardBold">
                        {renderClubIcon(value.clubIcon)}
                    </div>
                    <div className="flex flex-col justify-center col-span-2">
                        <div className=" font-pretendardBold">
                            {value.clubName}({value.averageStat})
                        </div>
                        <div className="text-xs font-pretendardRegular text-neutral-500">
                            •{value.place}&nbsp;&nbsp;•{value.level}&nbsp;&nbsp;•{value.headCount}
                        </div>
                    </div>
                    <div className="flex flex-col justify-center">
                        <div className="text-lg font-pretendardBold">{value.time}</div>
                    </div>
                </div>
            ))}
        </>
    );
}

export default FindMatchBoard;
