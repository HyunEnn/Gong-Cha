import { useClubStore } from '@/stores/clubStore';

function ClubApplyListModal({ isOpen, onClose }) {
    const {} = useClubStore();
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
            <div className="relative flex flex-col overflow-x-hidden overflow-y-auto bg-white w-80 h-80 rounded-xl">
                <div className="flex justify-end mt-4 mr-6">
                    <button onClick={onClose}>⨉</button>
                </div>
                <div></div>
            </div>
        </div>
    );
}

export default ClubApplyListModal;
