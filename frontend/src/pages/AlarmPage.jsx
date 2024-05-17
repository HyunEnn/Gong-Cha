import { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { FaRegTrashCan } from "react-icons/fa6";
import Lottie from 'lottie-react';
import Modal from '@/components/Modal';
import alarmIcon from '@/assets/lottie/alarm';
import congratulationIcon from '@/assets/lottie/congratulation';
import versusIcon from '@/assets/lottie/versus';
import lArrowIcon from '@/assets/icons/lArrow.svg';
import { getNotice } from '@/apis/api/mypage';

function AlarmPage() {
  const key = 2;
  const [alarmList, setAlarmList] = useState([]);
  const [alarmDetail, setAlarmDetail] = useState({
    content: '',
    fromUser: '',
    toUser: '',
    read: false,
    push: false,
  });
  const [showManualModal1, setShowManualModal1] = useState(false);
  const [showManualModal2, setShowManualModal2] = useState(false);
  const [showManualModal3, setShowManualModal3] = useState(false);
  const [dragged, setDragged] = useState(null);
  const [isTouch, setIsTouch] = useState(false);
  const dropzoneRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // api
    getNotice(
      key,
      (success) => {
        setAlarmList((prevData) => ({
            ...prevData,
            ...success.data.data,
        }));
      },
      (fail) => {
          console.log(fail);
      }
    );
  }, []);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleManualClick = (state, key) => {
    console.log('state: ' + state + ' key: ' + key);
    if (state === 1) {
      setShowManualModal1(true);
    } else if (state === 2) {
      setShowManualModal2(true);
    } else {
      setShowManualModal3(true);
    }
  };

  const closeModal = () => {
    setShowManualModal1(false);
    setShowManualModal2(false);
    setShowManualModal3(false);
  };

  const handleOutsideClick = () => {
    closeModal();
  };

  const handleDragStart = (event) => {
    setDragged(event.target);
    event.target.classList.add('dragging');
    setIsTouch(false); // Reset touch state
  };

  const handleTouchStart = (event) => {
    setDragged(event.target);
    event.target.classList.add('dragging');
    setIsTouch(true);
  };

  const handleDragEnd = (event) => {
    event.target.classList.remove('dragging');
  };

  const handleTouchEnd = (event) => {
    if (dragged) {
      const touch = event.changedTouches[0];
      const target = document.elementFromPoint(touch.clientX, touch.clientY);

      if (target && target.classList.contains('dropzone')) {
        console.log('엄');
        target.classList.remove('dragover');
      }

      dragged.classList.remove('dragging');
      setDragged(null);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleTouchMove = (event) => {
    if (isTouch && dragged) {
      const touch = event.touches[0];
      const target = document.elementFromPoint(touch.clientX, touch.clientY);

      if (target && target.classList.contains('dropzone')) {
        target.classList.add('dragover');
      }
    }
  };

  const handleDragEnter = (event) => {
    if (event.target.classList.contains('dropzone')) {
      event.target.classList.add('dragover');
    }
  };

  const handleDragLeave = (event) => {
    if (event.target.classList.contains('dropzone')) {
      event.target.classList.remove('dragover');
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    if (event.target.classList.contains('dropzone')) {
      event.target.classList.remove('dragover');
      if (dragged) {
        dragged.parentNode.removeChild(dragged);
        event.target.appendChild(dragged);
      }
    }
  };

  const handleTouchDrop = (event) => {
    if (isTouch && dragged) {
      const touch = event.changedTouches[0];
      const target = document.elementFromPoint(touch.clientX, touch.clientY);

      if (target && target.classList.contains('dropzone')) {
        target.classList.remove('dragover');
        dragged.parentNode.removeChild(dragged);
        target.appendChild(dragged);
      }
      setDragged(null);
    }
  };

  return (
    <div className="absolute flex flex-col items-center justify-center">
      <>
        <div onClick={handleBackClick} className="absolute top-[calc(2.0rem)] -ml-[calc(8rem)]">
          <img src={lArrowIcon} alt="돌아가기" />
        </div>
        <div className="relative top-[calc(5.1875rem)] pl-[calc(1.5rem)]">
          <Lottie className="-mt-5 -ml-[calc(1rem)] w-[calc(5rem)] h-[calc(5rem)]" animationData={alarmIcon} loop={false} autoplay={true} />
          <div className="w-[10rem]">
            <span className="pl-[calc(0.5rem)] page-title">알림</span>
          </div>
        </div>
        <div className="absolute left-0 flex flex-col items-center justify-center top-[calc(13.5rem)] w-[calc(22.5rem)]">
          <span className="left-1/2 font-pretendardBold text-sm text-center">
            나의 알림함
          </span>
        </div>
        <div className="absolute left-0 top-[calc(15rem)] border-[calc(.01875rem)] w-[calc(22.5rem)] z-0"></div>
      </>
      <>
        <div className="absolute border-b-2 flex flex-col items-center justify-center left-0 top-[calc(18rem)] w-[calc(22.5rem)] h-[calc(2rem)] text-center bg-slate-100"
          onClick={() => handleManualClick(1, 0)}
        >
          <div className="absolute left-[calc(.3rem)] rounded-full w-[calc(0.5rem)] h-[calc(0.5rem)] bg-yellow-500"></div>
          <span className="font-pretendardBold transform transition duration-100 ease-in-out active:scale-95">가나다 님이 라마바 님에게 매칭 신청을 하였습니다!</span>
        </div>
        <div className="absolute border-b-2 flex flex-col items-center justify-center left-0 top-[calc(21rem)] w-[calc(22.5rem)] h-[calc(2rem)] text-center bg-slate-100"
          onClick={() => handleManualClick(2, 0)}
        >
          <div className="absolute left-[calc(.3rem)] rounded-full w-[calc(0.5rem)] h-[calc(0.5rem)] bg-yellow-500"></div>
          <span className="font-pretendardBold transform transition duration-100 ease-in-out active:scale-95">가나다 FC에서 합류 요청이 왔습니다!</span>
        </div>
        <div className="absolute border-b-2 flex flex-col items-center justify-center left-0 top-[calc(24rem)] w-[calc(22.5rem)] h-[calc(2rem)] text-center bg-slate-100"
          onClick={() => handleManualClick(3, 0)}
        >
          <div className="absolute left-[calc(.3rem)] rounded-full w-[calc(0.5rem)] h-[calc(0.5rem)] bg-yellow-500"></div>
          <span className="font-pretendardBold transform transition duration-100 ease-in-out active:scale-95">가나다 님이 당신의 팀에 합류 요청을 하였습니다!</span>
        </div>
      </>
      <>
        {/* 매칭 */}
        {showManualModal1 && (
          <Modal show={showManualModal1} onClose={closeModal}>
            {/* Modal content */}
            <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-10" onClick={handleOutsideClick}>
              <div
                className="animate-scale-in relative flex flex-col items-center justify-start bg-stone-100 w-[calc(20.5rem)] h-[calc(31.25rem)] rounded-xl overflow-x-hidden overflow-y-auto"
                onClick={e => e.stopPropagation()}
              >
                {/* close button */}
                <button
                  onClick={closeModal}
                  className="self-start mt-2 mb-2 ml-2 w-5 h-5 bg-[#FF5F51] rounded-full shadow-sm font-bold text-white flex items-center justify-center"
                >
                  &times;
                </button>
                <div>
                  {/* content */}
                  <span className="text-[calc(.9rem)] text-gray-500">{'정준수'} FC에서 매칭을 신청했어요!</span>
                </div>
                <div className="absolute left-3 top-[calc(10rem)] w-[10rem] h-[15.590rem] bg-red-500 clip-trapezoid-left leftappear">
                </div>
                <div className="absolute flex flex-col items-center justify-start top-[calc(15rem)] z-10">
                  <Lottie className="animate-zoom-in-out w-[5rem] h-[5rem]" animationData={versusIcon} loop={false} autoplay={true} />
                </div>
                <div className="absolute right-3 top-[calc(10rem)] w-[10rem] h-[15.590rem] bg-blue-500 clip-trapezoid-right rightappear">
                </div>
              </div>
            </div>
          </Modal>
        )}
        {/* 팀 -> 개인 */}
        {showManualModal2 && (
          <Modal show={showManualModal2} onClose={closeModal}>
            {/* Modal content */}
            <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-10" onClick={handleOutsideClick}>
              <div
                className="animate-scale-in relative flex flex-col items-center justify-start bg-stone-100 w-[calc(20.5rem)] h-[calc(31.25rem)] rounded-xl overflow-x-hidden overflow-y-auto"
                onClick={e => e.stopPropagation()}
              >
                {/* close button */}
                <button
                  onClick={closeModal}
                  className="self-start mt-2 mb-2 ml-2 w-5 h-5 bg-[#FF5F51] rounded-full shadow-sm font-bold text-white flex items-center justify-center"
                >
                  &times;
                </button>
                <div>
                  {/* content */}
                  <span className="text-[calc(.9rem)] text-gray-500">{'정준수'} FC에서 당신을 원합니다!</span>
                </div>
                <div>
                  네
                </div>
              </div>
            </div>
          </Modal>
        )}
        {/* 개인 -> 팀 */}
        {showManualModal3 && (
          <Modal show={showManualModal3} onClose={closeModal}>
            {/* Modal content */}
            <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-10" onClick={handleOutsideClick}>
              <div
                className="animate-scale-in relative flex flex-col items-center justify-start bg-stone-100 w-[calc(20.5rem)] h-[calc(31.25rem)] rounded-xl overflow-x-hidden overflow-y-auto"
                onClick={e => e.stopPropagation()}
              >
                {/* close button */}
                <button
                  onClick={closeModal}
                  className="self-start mt-2 mb-2 ml-2 w-5 h-5 bg-[#FF5F51] rounded-full shadow-sm font-bold text-white flex items-center justify-center"
                >
                  &times;
                </button>
                <div>
                  {/* content */}
                  <span className="text-[calc(.9rem)] text-gray-500">{'정준수'} 님이 팀에 합류하고 싶어해요!</span>
                </div>
                <div className="absolute left-3 top-[calc(10rem)] w-[8rem] h-[15.590rem] bg-red-500 
                  draggable"
                  draggable="true"
                  onDragStart={handleDragStart}
                  onDragEnd={handleDragEnd}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                >
                </div>
                <div className="absolute flex flex-col items-center justify-start top-[calc(15rem)] z-10">
                  <MdKeyboardDoubleArrowRight className="leftbounc w-[5rem] h-[5rem]" />
                </div>
                <div className="absolute right-3 top-[calc(10rem)] w-[8rem] h-[15.590rem] bg-blue-500
                  dropzone"
                  ref={dropzoneRef}
                  onDragOver={handleDragOver}
                  onDragEnter={handleDragEnter}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onTouchEnd={handleTouchDrop}
                >
                  <Lottie className="-mt-5 -ml-[calc(1rem)] w-[calc(15rem)] h-[calc(15rem)]" animationData={congratulationIcon} loop={true} autoplay={true} />
                </div>
                <div className="absolute flex items-center justify-center rounded-sm bottom-0 mb-5 w-[calc(15rem)] h-[calc(3rem)] bg-black/20">
                  <FaRegTrashCan className="w-[calc(1.5rem)] h-[calc(1.5rem)] opacity-50" />
                </div>
              </div>
            </div>
          </Modal>
        )}
      </>
    </div>
  );
}

export default AlarmPage;
