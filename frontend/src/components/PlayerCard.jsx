function PlayerCard({ season, player }) {

    return (
        <>
            {player && 
            <div className="absolute left-1/2 transform -translate-x-1/2 w-[calc(13.0625rem)] h-[calc(20.365rem)] bg-gray-200 rounded-lg shadow-md mt-[calc(11.6875rem)]">
                <h2 className="text-lg font-bold text-center">{season}</h2>
                <img src={player.profileImage} alt={player.name} />
                <h3 className="flex justify-center mt-[calc(1rem)] font-pretendardBlack">{player.name}</h3>
            </div>
            }
        </>
    );
}

export default PlayerCard;
