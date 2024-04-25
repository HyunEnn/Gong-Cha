function PlayerCard({ season }) {
    // 너비를 늘리고 중앙 정렬을 위해 left 값을 조정합니다.
    return (
        <div className="absolute left-1/2 transform -translate-x-1/2 w-[calc(13.0625rem)] h-[calc(20.365rem)] bg-gray-200 rounded-lg shadow-md mt-[calc(11.6875rem)]">
            <h2 className="text-lg font-bold text-center">{season}</h2>
        </div>
    );
}

export default PlayerCard;
