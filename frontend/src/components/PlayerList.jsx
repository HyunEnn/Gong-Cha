import React, { useState, useMemo } from 'react';
import { useModalStore } from '@/store/useModalStore';
import dummyPlayer from '@/data/dummyplayer';
import defaultplayer from '@/assets/icons/defaultplayer.svg';
import PlayerModal from '@/components/modals/PlayerModal';
import {
    CardForm,
    CardContent,
    CardDescription,
    CardFooter,
    CardTitle,
    CardHeader,
} from "@/components/CardForm"

function PlayerList() {
    const [players, setPlayers] = useState(dummyPlayer); 
    const [filter, setFilter] = useState("");
    const { openModal, closeModal, isModalOpen, modalType, modalData } = useModalStore();

    // Memoized filter to reduce unnecessary recalculations
    const filteredPlayers = useMemo(() => {
        return players.filter(player => {
            const totalStats = player.data.pass + player.data.shooting + player.data.dribble + player.data.speed;
            const averageStats = totalStats / 4;
            return player.data.user_id.toLowerCase().includes(filter.toLowerCase()) || averageStats.toFixed(0) === filter;
        });
    }, [players, filter]);

    const renderPlayerItem = (player) => {
        const totalStats = player.data.pass + player.data.shooting + player.data.dribble + player.data.speed;
        const averageStats = totalStats / 4;
        return (
            <div key={player.id} className="player-item" onClick={() => openModal(player.type, player)}>
                <div className="text-sm">{averageStats.toFixed(0)}</div>
                <img  className='w-16 h-16' src={defaultplayer} alt="기본 선수 사진" />
                <span className="mr-4">{player.data.user_id}</span>
            </div>
        );
    };

    return (
        
        <div className="player-list-container flex-col items-center absolute left-1/2 transform -translate-x-1/2 top-[30%] w-[85%] h-[calc(100rem)] border-">

        <div className="flex-end">
            <input 
                type="text" 
                placeholder="아이디를 입력하세요" 
                value={filter} 
                onChange={e => setFilter(e.target.value)} 
                className="narrow-input"
            />
        </div>
            {filteredPlayers.map(renderPlayerItem)}
            <PlayerModal isOpen={isModalOpen} type={modalType} data={modalData} onClose={closeModal} />
        </div>
    );
}

export default PlayerList;