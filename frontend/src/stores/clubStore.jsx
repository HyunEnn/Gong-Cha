import { create } from 'zustand';

import playerImg1 from '@/data/dummyImages/dummyProfileImage2.png';
import playerImg2 from '@/data/dummyImages/dummyProfileImage3.png';

export const useClubStore = create((set) => ({
    dummyClubList: [
        {
            region: '대전',
            districts: '서구',
            timeStart: '10:00',
            timeEnd: '14:00',
            clubName: '풋살전사',
            clubIcon: 'ManchesterCity',
            averageStat: '350',
            level: '초급',
            introduce: '우리 클럽에 들어오실?',
            peopleCnt: '5',
        },
        {
            region: '대전',
            districts: '유성구',
            timeStart: '09:00',
            timeEnd: '21:00',
            clubName: '흥민풋살',
            clubIcon: 'TottenhamHotspur',
            averageStat: '380',
            level: '중급',
            introduce: '가입 신청 문의 1588-1588',
            peopleCnt: '6',
        },
    ],
    clubCreateRequest: {
        clubName: '',
        description: '',
        activityStartTime: {
            hour: '',
            minute: '',
            second: 0,
            nano: 0,
        },
        activityEndTime: {
            hour: '',
            minute: '',
            second: 0,
            nano: 0,
        },
        skillLevel: '',
        region: '',
        districts: '',
    },
    myClubInfoReadResponse: {
        clubName: '흥민풋살',
        description: '가입 신청 문의 1588-1588',
        activityStartTime: '09:00',
        activityEndTime: '21:00',
        skillLevel: '중급',
        region: '대전',
        districts: '유성구',
    },
    myClubListReadResponse: [
        {
            playerImg: playerImg1,
            userId: '김싸피',
            averageStat: '90',
            phoneNumber: '010-1234-5678',
            isMaster: true,
        },
        {
            playerImg: playerImg2,
            userId: '이싸피',
            averageStat: '87',
            phoneNumber: '010-1357-2468',
            isMaster: false,
        },
    ],
}));
