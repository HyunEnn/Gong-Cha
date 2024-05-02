
import { useState } from 'react';
import alarmIcon from '@/assets/icons/alarm.svg';
import { useModalStore } from '@/store/useModalStore';
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
            <div key={alarm.id} className="flex justify-center items-center  text-center bg-transparent p-4 rounded-lg cursor-pointer" onClick={() => openModal(alarm.type, alarm)}>
                <span>{alarm.content}</span>
            </div>
        );
    };

    return (
        <div className="scrollbar-hide">
            <div className="pt-4 pl-4 flex flex-col items-start">
                <img src={alarmIcon} alt="Alarm" className="w-12 h-12" />
                <h2 className="text-2xl font-bold mt-2">알림</h2>
            </div>
            <div className="notification-bar">
                <div className="text-center my-4">받은 알림함</div>
            </div>
            <div className="alarm-list">
                {alarms.map(renderAlarmItem)}
            </div>
            <NotificationModal isOpen={isModalOpen} type={modalType} data={modalData} onClose={closeModal} />
        </div>
    );
}

export default AlarmPage;
