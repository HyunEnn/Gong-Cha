import { serverAxios } from '@/apis/util/commons';

const server = serverAxios();

const url = '/api/matching';

// 매칭 생성
const postMatchingCreate = async (content) => {
    return await server
        .post(`${url}/create`, content)
        .then((response) => response.data)
        .catch((error) => {
            throw new Error(`API request failed: ${error}`);
        });
};

// 매칭 목록 조회
const getMatchingList = async () => {
    return await server
        .get(`${url}`)
        .then((response) => response.data)
        .catch((error) => {
            throw new Error(`API request failed: ${error}`);
        });
};

// 매칭 상세 조회
const getMatchingDetail = async (matchingId) => {
    return await server
        .get(`${url}/${matchingId}`)
        .then((response) => response.data)
        .catch((error) => {
            throw new Error(`API request failed: ${error}`);
        });
};

// 매칭 정보 수정
const patchMatching = async (matchingId, data) => {
    return await server
        .patch(`${url}/${matchingId}`, data)
        .then((response) => response.data)
        .catch((error) => {
            throw new Error(`API request failed: ${error}`);
        });
};

// 상대팀 팀원 정보 조회
const getOpponentInfo = async (matchingId) => {
    return await server
        .get(`${url}/${matchingId}/versus/teammates`)
        .then((response) => response.data)
        .catch((error) => {
            throw new Error(`API request failed: ${error}`);
        });
};

// 상대팀 팀원 카드 정보 조회
const getOpponentCardInfo = async (matchingId) => {
    return await server
        .get(`${url}/${matchingId}/versus/teammates/cards`)
        .then((response) => response.data)
        .catch((error) => {
            throw new Error(`API request failed: ${error}`);
        });
};

// 팀 매칭 경기 종료
const patchTeamMatchClose = async (matchingId) => {
    return await server
        .patch(`${url}/${matchingId}/close`)
        .then((response) => response.data)
        .catch((error) => {
            throw new Error(`API request failed: ${error}`);
        });
};

export {
    postMatchingCreate,
    getMatchingList,
    getMatchingDetail,
    patchMatching,
    getOpponentInfo,
    getOpponentCardInfo,
    patchTeamMatchClose,
};
