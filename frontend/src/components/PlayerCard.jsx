import dummySilverLeager from '@/data/dummyImages/dummySilverLeager.png';

function PlayerCard({ player }) {
    const value = parseInt((player.SHO + player.PAS + player.DRI + player.PAC + player.MAN) / 5);

    return (
        <>
            {player && 
                <div className="absolute left-1/2 transform -translate-x-1/2 top-[50%] w-[15.625rem] h-[24.360rem]">
                    <img className="absolute rounded-t-lg" src={dummySilverLeager} alt="카드" />
                    <div className="absolute flex flex-col justify-center items-center w-full h-full">
                        <img className="absolute left-20 bottom-[9rem] mx-auto max-w-[10rem] max-h-[10rem]" src={player.profileImage} alt={player.name} />
                        <h3 className="absolute mt-20 text-center font-pretendardBlack text-white">{player.name}</h3>

                        <div className="absolute flex flex-col justify-center top-[63%]">
                            <div className="flex">
                                <p className="text-center font-pretendardBlack text-white">{player.SHO} SHO</p>
                                <p className="ml-4 text-center font-pretendardBlack text-white">{player.PAS} PAS</p>
                            </div>
                            <div className="flex">
                                <p className="text-center font-pretendardBlack text-white">{player.DRI} DRI</p>
                                <p className="ml-auto text-center font-pretendardBlack text-white">{player.PAC} PAC</p>
                            </div>
                        </div>

                        <p className="absolute left-8 top-16 font-pretendardBlack text-white text-3xl">{value}</p>
                        <p className="absolute left-8 top-26 font-pretendardBlack text-white">{player.MAN}<br></br> MAN</p>
                    </div>
                </div>
            }
        </>
    );
}

export default PlayerCard;
