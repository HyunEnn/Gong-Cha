// PlayerAcceptModal.jsx
function PlayerModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const handleAccept = () => {
    // Handle player accept
    onClose();
  };

  const handleReject = () => {
    // Handle player reject
    onClose();
  };

  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      {/* ...modal structure */}
      <div className="flex justify-between p-4">
        <button onClick={handleAccept} className="btn-accept">수락하기</button>
        <button onClick={handleReject} className="btn-reject">거절하기</button>
      </div>
    </div>
  );
}

export default PlayerModal;
