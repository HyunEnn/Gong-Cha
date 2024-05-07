import { create } from 'zustand';

export const useFindMatchBoardStore = create((set) => ({
    dummyFindMatchList: [
        {
            clubIcon: 'ManchesterCity',
            clubName: '맨 시티',
            averageStat: '400',
            place: '서울 관악구',
            level: '초급',
            headCount: '5vs5',
            time: '10:00',
        },
        {
            clubIcon: 'TottenhamHotspur',
            clubName: '토트넘 홋스퍼',
            averageStat: '480',
            place: '대전 유성구',
            level: '중급',
            headCount: '5vs5',
            time: '10:00',
        },
    ],
}));
