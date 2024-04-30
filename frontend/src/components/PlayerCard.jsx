import dummySilverLeager from '@/data/dummyImages/dummySilverLeager.png';

function PlayerCard({ season, player }) {

    return (
        <>
            {player && 
            <div className="absolute left-1/2 transform -translate-x-1/2 w-[calc(13.0625rem)] h-[calc(20.365rem)] bg-gray-200 rounded-lg shadow-md mt-[calc(11.6875rem)]">
                    <img className="absolute rounded-t-lg" src={dummySilverLeager} alt="카드" />
                    {/* 텍스트를 포함하는 div */}
                    <div className="absolute top-[50%] left-[50%] transform translate-y-[-50%] translate-x-[-50%] z-10">
                        <h2 className="text-lg font-bold text-center">{season}</h2>
                        <img className="mx-auto ml-5" src={player.profileImage} alt={player.name} width={500} height={500}/>
                        <h3 className="text-center mb-8 font-pretendardBlack text-white">{player.name}</h3>
                    </div>
                </div>
            }
        </>
    );
}

export default PlayerCard;
