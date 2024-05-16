import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import imglyRemoveBackground from "@imgly/background-removal";
import { toast } from "sonner"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Toaster } from "sonner"
import Modal from '@/components/Modal';
import lArrowIcon from '@/assets/icons/lArrow.svg';
import rArrowIcon from '@/assets/icons/rArrow.svg';
import fileuploadIcon from '@/assets/icons/fileupload.svg';
import Lottie from 'lottie-react';
import pencilAnimation from '@/assets/lottie/pen';
import { playHistoryDummyData } from '@/data/dummyData'; // dummy data

function ProfilePage() {
    const navigate = useNavigate();
    const [showManualModal, setShowManualModal] = useState(false);
    const [showNicknameDrawer, setShowNicknameDrawer] = useState(false);
    const [showProfileImageDrawer, setShowProfileImageDrawer] = useState(false);
    const [newNickname, setNewNickname] = useState("");
    const [imageSrc, setImageSrc] = useState(null);
    const [resultSrc, setResultSrc] = useState(null);
    const [error, setError] = useState(null);
    const fileInputRef = useRef(null);

    // useEffect(() => {
    //     setPlayHistoryData(    // dummy data
    //         playHistoryDummyData,
    //     );
    // }, []);
    
    useEffect(() => {
        /* axios for db connection
        getPlayScheduleList(
            key,
            (success) => {
                setPlayScheduleList({
                    ...success,
                });
            },
            (fail) => {
                
            }
        );
        return () => {
            
        };
        */
    }, []);
  
    const removeBackground = () => {
      console.log("둔디기 시도");
      imglyRemoveBackground(imageSrc)
        .then((resultBlob) => {
          setResultSrc(URL.createObjectURL(resultBlob));
          /* [공사중] */
          console.log("둔디기 완료");
          console.log(URL.createObjectURL(resultBlob));
          setError(null);
        })
        .catch((err) => {
          setError(err.message || 'Error removing background');
          setResultSrc(null);
        });
    };

    const handleBackClick = () => {
        navigate(-1);
    };

    const handleManualClick = () => {
        setShowManualModal(true);
    };

    const closeModal = () => {
        setShowManualModal(false);
    };

    const handleOutsideClick = () => {
        closeModal();
    };
    
    const handleNicknameChange = (e) => {
        setNewNickname(e.target.value);
    };

    const handleSubmitNickname = () => {
        setShowNicknameDrawer(false);
        console.log("새로운 닉네임:", newNickname);
    };

    const handleSubmitProfileImage = () => {
        removeBackground();
        setShowProfileImageDrawer(false);
        toast("프로필 이미지가 업로드 되었어요!", {
            description: "이미지 반영까지는 대략 30초 소요됩니다",
            className: 'toaster',
            action: {
              label: "확인",
              onClick: () => console.log("이벤트 확인"),
            },
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                console.log("파일 읽기 완료:", e.target.result);
                setImageSrc(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    return (
        <div className="absolute flex flex-col items-center justify-center">
            <>
                <div onClick={handleBackClick} className="absolute top-[calc(2.0rem)] -ml-[calc(8rem)]">
                    <img src={lArrowIcon} alt="돌아가기" />
                </div>
                <div className="relative top-[calc(5.1875rem)] pl-[calc(1.5rem)]">
                    <Lottie className="-mt-5 -ml-[calc(1rem)] w-[calc(5rem)] h-[calc(5rem)]" animationData={pencilAnimation} loop={false} autoplay={true} />
                    <div className="w-[10rem]">
                        <span className="pl-[calc(0.5rem)] page-title">프로필 편집</span>
                    </div>
                </div>
                <div className='absolute ml-[calc(11rem)]'>
                    <div className="relative inset-x-0 flex items-center justify-center top-[calc(13rem)] text-sm" onClick={handleManualClick}>
                        <div className="absolute flex flex-col items-start justify-center w-[calc(19rem)] h-[calc(4.375rem)] rounded-xl bg-[#404040]">
                            <span className="absolute -mt-[calc(1rem)] ml-5 text-[calc(0.8rem)] text-[#FF8615]">이미지 변경 팁!</span>
                            <span className="absolute ml-5 mt-[calc(1.7rem)] text-white text-[calc(0.8rem)] text-[#]">선수 카드를 위한 이미지 변경 팁을 확인하세요</span>
                            <img className="absolute right-0 inline mr-[calc(1rem)]" src={rArrowIcon} alt="들어가기" />
                        </div>
                    </div>
                </div>
            </>
            <>
                {showManualModal && (
                    <Modal show={showManualModal} onClose={closeModal}>
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
                                    [공사중]
                                </div>
                                <div>
                                    프로필 변경 팁 안내
                                </div>
                            </div>
                        </div>
                    </Modal>
                )}
            </>
            <>
                <Drawer show={showNicknameDrawer} onClose={() => setShowNicknameDrawer(false)}>
                    <DrawerTrigger>
                        <div className="flex flex-col items-center justify-center">
                            <div className="absolute inset-x-0 flex justify-start ml-[calc(1.8rem)] top-[calc(20rem)] w-[calc(19rem)] h-[calc(7rem)] text-sm rounded-xl bg-gray-100">
                                <div className="absolute mt-[calc(1.5rem)] ml-3 transform transition duration-100 ease-in-out active:scale-95" 
                                    onClick={() => setShowNicknameDrawer(true)}
                                >
                                    <span className="pl-[calc(1.0rem)] font-pretendardBold">닉네임 바꾸기</span>
                                    <img className="absolute left-[calc(16.2rem)] inline" src={rArrowIcon} alt="들어가기" />
                                </div>
                            </div>
                        </div>
                    </DrawerTrigger>
                    <DrawerContent className="bg-[#ffffff]">
                        <DrawerHeader>
                            <DrawerTitle>닉네임 변경</DrawerTitle>
                            <DrawerDescription>새로운 닉네임을 입력하세요.</DrawerDescription>
                        </DrawerHeader>
                        <div className="flex justify-center px-2">
                            <input
                                type="text"
                                value={newNickname}
                                onChange={handleNicknameChange}
                                placeholder="새로운 닉네임"
                                className="w-[calc(18rem)] border border-gray-300 rounded-lg mb-5"
                            />
                        </div>
                        <DrawerFooter className="flex items-center">
                            <DrawerClose asChild>
                                <button 
                                    className="rounded-xl bg-[#A6E672] w-[calc(18rem)] h-[calc(2.3rem)]"
                                    onClick={handleSubmitNickname}
                                >
                                    변경하기
                                </button>
                            </DrawerClose>
                        </DrawerFooter>
                    </DrawerContent>
                </Drawer>
                
                <Drawer show={showProfileImageDrawer} onClose={() => setShowProfileImageDrawer(false)}>
                    <DrawerTrigger>
                        <div className="absolute inset-x-0 flex justify-start ml-[calc(1.8rem)] top-[calc(20rem)] text-sm rounded-xl">
                            <div className="absolute mt-[calc(4.5rem)] w-[calc(10rem)] h-[calc(2.1rem)] transform transition duration-100 ease-in-out active:scale-95" 
                                onClick={() => setShowProfileImageDrawer(true)}
                            >
                                <span className="pl-[calc(1.0rem)] font-pretendardBold">프로필 이미지 바꾸기</span>
                                <img className="absolute left-[calc(17rem)] inline" src={rArrowIcon} alt="들어가기" />
                            </div>
                        </div>
                    </DrawerTrigger>
                    <DrawerContent className="bg-[#ffffff]">
                        <DrawerHeader>
                            <DrawerTitle>프로필 이미지 변경</DrawerTitle>
                            <DrawerDescription>새로운 프로필 이미지를 선택하세요.</DrawerDescription>
                        </DrawerHeader>
                        <div className="p-4">
                            <div className="flex items-center justify-center w-full h-[calc(10rem)] border border-gray-300 rounded-md p-2 mb-4">
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    style={{ display: 'none' }}
                                    accept="image/*"
                                />
                                <button onClick={triggerFileInput} className="file-upload-button">
                                    <img src={fileuploadIcon} alt="Upload Icon" width={30} height={30}/>
                                </button>
                            </div>
                        </div>
                        <DrawerFooter className="flex items-center">
                            <DrawerClose asChild>
                                <button 
                                    className="rounded-xl bg-[#A6E672] w-[calc(18rem)] h-[calc(2.3rem)]"
                                    onClick={handleSubmitProfileImage}
                                >
                                    변경하기
                                </button>
                            </DrawerClose>
                        </DrawerFooter>
                    </DrawerContent>
                </Drawer>
            </>
        </div>
    );
}

export default ProfilePage;
