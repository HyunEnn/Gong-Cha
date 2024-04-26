
import { useState } from 'react';
import alarmIcon from '@/assets/icons/alarm.svg';
import useModalStore from '@/store/useModalStore';
import NotificationModal from '@/components/modals/NotificationModal';
// import MatchModal from '@/components/modals/MatchModal';
// import PlayerModal from '@/components/modals/PlayerModal';
// import TeamModal from '@/components/modals/TeamModal';
import dummyAlarms from '@/data/dummyAlarms';

function AlarmPage() {
    const [alarms] = useState(dummyAlarms);
    const { openModal, closeModal, isModalOpen, modalType, modalData } = useModalStore();

    const renderAlarmItem = (alarm) => {
        return (
            <div key={alarm.id} className="flex justify-between items-center  bg-transparent p-4 rounded-lg cursor-pointer" onClick={() => openModal(alarm.type, alarm)}>
                <span>{alarm.content}</span>
            </div>
        );
    };

    return (
        <div className="flex flex-col items-start min-h-screen overflow-y-scroll scrollbar-hide">
            <div className="w-full">
                <div className="flex items-center p-4">
                    <img src={alarmIcon} alt="Alarm" className="w-12 h-12" />
                    <h2 className="text-2xl font-bold pl-4">알림</h2>
                </div>
                <div className="px-4">
                    {alarms.map(renderAlarmItem)}
                </div>
            </div>
            <NotificationModal isOpen={isModalOpen} type={modalType} data={modalData} onClose={closeModal} />
        </div>
    );
}

export default AlarmPage;
