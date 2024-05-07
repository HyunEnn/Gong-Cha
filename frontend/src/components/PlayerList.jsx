import React, { useState } from 'react';
import {useModalStore} from '@/store/useModalStore';
import NotificationModal from '@/components/modals/NotificationModal';
import dummyPlayer from '@/data/dummyplayer';
import defaultplayer from '@/assets/icons/defaultplayer.svg';
import {
    CardForm,
    CardContent,
    CardDescription,
    CardFooter,
    CardTitle,
    CardHeader,
} from "@/components/CardForm"

function PlayerList() {
    const [alarms] = useState(dummyPlayer);
    const { openModal, closeModal, isModalOpen, modalType, modalData } = useModalStore();

    const renderAlarmItem = (alarm) => {
        const totalStats = alarm.data.pass + alarm.data.shooting + alarm.data.dribble + alarm.data.speed;
        const averageStats = totalStats / 4;
        return (
            <CardForm key={alarm.id} className="flex justify-between items-center text-center bg-transparent p-4 rounded-lg" onClick={() => openModal(alarm.type, alarm)}>
                <img  className='w-16 h-16' src={defaultplayer} alt="기본 선수 사진" />
                <span className="mr-4">{alarm.data.user_id}</span>
                <div className="text-sm">{averageStats.toFixed(0)}</div>
            </CardForm>
        );
    };

    return (
        <div className="player-list-container flex-col items-center absolute left-1/2 transform -translate-x-1/2 top-[30%] w-[85%] h-[calc(100rem)]">
            {/* <div className="pt-4 pl-4 flex flex-col items-center "> */}
            {alarms.map(renderAlarmItem)}
            {/* </div> */}

            <NotificationModal isOpen={isModalOpen} type={modalType} data={modalData} onClose={closeModal} />
        </div>
    );
}

export default PlayerList;