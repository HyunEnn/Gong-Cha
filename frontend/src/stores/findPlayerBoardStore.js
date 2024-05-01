import { create } from 'zustand';

export const useFindPlayerBoardStore = create((set) => ({
    dummyFindPlayerList: [
        {
            time: '10:00',
            place: '서울 은평 롯데몰 B구장',
            text: '포지션 상관없이 같이 풋살 즐겨요',
            gender: '남녀무관',
            inOrOut: '실내',
            level: '초급',
            totalPeople: '5',
            currentPeople: '3',
            writer: '홍길동',
        },
        {
            time: '10:00',
            place: '서울 은평 롯데몰 B구장',
            text: '포지션 상관없이 같이 풋살 즐겨요',
            gender: '남녀무관',
            inOrOut: '실내',
            level: '초급',
            totalPeople: '5',
            currentPeople: '3',
            writer: '홍길동',
        },
        {
            time: '10:00',
            place: '서울 은평 롯데몰 B구장',
            text: '포지션 상관없이 같이 풋살 즐겨요',
            gender: '남녀무관',
            inOrOut: '실내',
            level: '초급',
            totalPeople: '5',
            currentPeople: '3',
            writer: '홍길동',
        },
    ],
    findPlayerList: [], // read
    createFindPlayerBoard: (time, place, text, gender, inOrOut, level, totalPeople, currentPeople, writer) =>
        set((prev) => [
            ...prev.findPlayerList,
            {
                time: time,
                place: place,
                text: text,
                gender: gender,
                inOrOut: inOrOut,
                level: level,
                totalPeople: totalPeople,
                currentPeople: currentPeople,
                writer: writer,
            },
        ]),
    updateFindPlayerBoard: (time, place, text, gender, inOrOut, level, totalPeople, currentPeople, writer) =>
        set((prev) => [
            ...prev.findPlayerList,
            {
                time: time,
                place: place,
                text: text,
                gender: gender,
                inOrOut: inOrOut,
                level: level,
                totalPeople: totalPeople,
                currentPeople: currentPeople,
                writer: writer,
            },
        ]),
    removeFindPlayerBoard: (writer) =>
        set((prev) => ({ findPlayerList: prev.findPlayerList.filter((e) => e.writer !== writer) })),
}));
