import React, { useState } from 'react';

const EvaluationModal = ({ onClose }) => {
    const handleSubmit = () => {
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-700 bg-opacity-50">
            <div className="bg-white rounded-lg p-8 w-[calc(30rem)] h-[calc(33rem)] flex flex-col justify-between">
                <div>
                    <h2 className="text-pretendardBlack text-lg font-bold mb-4">평가하기</h2>
                    <div className="flex flex-col mb-4">
                        <label className="inline-flex items-center">
                            <span className="ml-2">슈팅</span>
                        </label>
                        <label className="inline-flex items-center">
                            <span className="ml-2">패스</span>
                        </label>
                        <label className="inline-flex items-center">
                            <span className="ml-2">드리블</span>
                        </label>
                        <label className="inline-flex items-center">
                            <span className="ml-2">속도</span>
                        </label>
                        <label className="inline-flex items-center">
                            <span className="ml-2">매너</span>
                        </label>
                    </div>
                </div>
                <button
                    className="w-full bg-blue-500 text-white rounded-md font-bold"
                    onClick={handleSubmit}
                >
                    평가
                </button>
            </div>
        </div>
    );
};

export default EvaluationModal;
