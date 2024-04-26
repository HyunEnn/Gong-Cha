import { useState } from 'react';
import alarmIcon from '@/assets/icons/alarm.svg';
import useModalStore from '@/store/AlarmList';
import NotificationModal from '@/components/modals/NotificationModal'; // Import your modal component
import dummyAlarms from '@/data/dummyAlarms';

function AlarmPage() {
    const [alarms, setAlarms] = useState(dummyAlarms);
    const { isModalOpen, openModal, closeModal } = useModalStore(); // Use the Zustand store

    const renderAlarmItem = (alarm, index) => {
        // Each alarm item now also has an onClick event to open the modal.
        return (
            <div key={index} className="bg-gray-200 p-4 rounded-lg mb-2 cursor-pointer" onClick={openModal}>
                {alarm.content}
            </div>
        );
    };

    return (
        <>
            <img src={alarmIcon} alt="Alarm" className="mx-auto w-12 h-12" />
            <div className="text-xl font-bold text-center mt-4">알림함</div>
            <div className="text-center text-gray-600 mt-2">받은 알림함</div>
            <div className="p-4">
                {alarms.length > 0 ? (
                    alarms.map(renderAlarmItem)
                ) : (
                    <p>알림이 없습니다.</p>
                )}
            </div>

            <button onClick={openModal} className="...">Show Notification</button>
            <NotificationModal isOpen={isModalOpen} onClose={closeModal} />
        </>
    );
}

export default AlarmPage;
