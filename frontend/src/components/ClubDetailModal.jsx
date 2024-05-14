import { useClubStore } from '@/stores/clubStore';

// 이미지는 S3에서 이미지를 바로 가져다 쓰는 형식이라서 많이 바뀔 예정
import ManchesterCity from '@/assets/examples/manchester-city.svg';
import TottenhamHotspur from '@/assets/examples/tottenham-hotspur.svg';

function ClubDetailModal({ isOpen, onClose, clubDetail }) {
    const { dummyClubList } = useClubStore();
    if (!isOpen) return null;

    const renderClubIcon = (iconName) => {
        switch (iconName) {
            case 'ManchesterCity':
                return <img src={ManchesterCity} className="w-20 h-20" />;
            case 'TottenhamHotspur':
                return <img src={TottenhamHotspur} className="w-20 h-20" />;
            default:
                return null;
        }
    };
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
            <div className="relative flex flex-col overflow-x-hidden overflow-y-auto bg-white w-80 h-80 rounded-xl">
                <div className="flex justify-end mt-4 mr-6">
                    <button onClick={onClose}>⨉</button>
                </div>
                <div className="flex justify-center">{renderClubIcon(clubDetail.clubIcon)}</div>
                <div className="flex flex-col items-start mx-auto mt-4">
                    <p className="font-gmarketSansRegular">
                        <span className="font-gmarketSansBold">클럽명 :</span> {clubDetail.clubName}
                    </p>
                    <p className="font-gmarketSansRegular">
                        <span className="font-gmarketSansBold">클럽 평균 능력치 : </span>
                        {clubDetail.averageStat}
                    </p>
                    <p className="font-gmarketSansRegular">
                        <span className="font-gmarketSansBold">클럽 경기 수준 : </span>
                        {clubDetail.level}
                    </p>
                    <p className="font-gmarketSansRegular">
                        <span className="font-gmarketSansBold">현재 소속 인원 : </span>
                        {clubDetail.peopleCnt}명
                    </p>
                    <p className="font-gmarketSansRegular">
                        <span className="font-gmarketSansBold">활동 지역 : </span>
                        {clubDetail.region}&nbsp;
                        {clubDetail.districts}
                    </p>
                    <p className="font-gmarketSansRegular">
                        <span className="font-gmarketSansBold">활동 시간 : </span>
                        {clubDetail.timeStart}~{clubDetail.timeEnd}
                    </p>
                    <p className="font-gmarketSansRegular">
                        <span className="font-gmarketSansBold">클럽 소개 : </span>
                        {clubDetail.introduce}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ClubDetailModal;
