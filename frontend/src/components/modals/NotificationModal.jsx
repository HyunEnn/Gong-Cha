function NotificationModal({ isOpen, onClose }) {
    if (!isOpen) return null;
  
    // Functions to handle Accept (수락하기) and Reject (거절하기) actions
    const handleAccept = () => {
      console.log("Accepted");
      onClose();
    };
  
    const handleReject = () => {
      console.log("Rejected");
      onClose();
    };
  
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto outline-none focus:outline-none">
        <div className="relative w-auto max-w-3xl mx-auto my-6">
          {/* Overlay */}
          <div className="fixed inset-0 z-0 bg-black opacity-50"></div>
  
          {/* Modal content */}
          <div className="relative z-50 w-full bg-white rounded-lg shadow-lg outline-none focus:outline-none">
            
  
            {/* Modal body */}
            <div className="relative p-6 flex-auto">
              <p className="my-4 text-gray-600 text-lg leading-relaxed">
                선수수락/팀수락/매칭수락 내용
              </p>
            </div>
  
            {/* Modal footer */}
            <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
              {/* Accept button */}
              <button
                className="text-white bg-gray-300 font-bold uppercase text-sm px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={handleAccept}
              >
                수락하기
              </button>
              {/* Reject button */}
              <button
                className="text-white bg-gray-300 border border-solid hover:bg-gray-500 hover:text-white active:bg-gray-600 font-bold uppercase text-sm px-6 py-2 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={handleReject}
              >
                거절하기
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default NotificationModal;
  