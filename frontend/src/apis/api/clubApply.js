import { serverAxios } from '@/apis/util/commons';

const server = serverAxios();

const url = '/api/club/applies';

const getClubApplies = async (clubId) => {
    return await server
        .get(`${url}/${clubId}`)
        .then((response) => response.data)
        .catch((error) => {
            throw new Error(`API request failed: ${error}`);
        });
};

const postClubApply = async (clubId, content) => {
    return await server
        .post(`${url}/${clubId}`, content)
        .then((response) => response.data)
        .catch((error) => {
            throw new Error(`API request failed: ${error}`);
        });
};

const postClubApplyPermit = async (clubId, applyId) => {
    return await server
        .post(`${url}/${clubId}/${applyId}/permit`)
        .then((response) => response.data)
        .catch((error) => {
            throw new Error(`API request failed: ${error}`);
        });
};

const postClubApplyDeny = async (clubId, applyId) => {
    return await server
        .post(`${url}/${clubId}/${applyId}/deny`)
        .then((response) => response.data)
        .catch((error) => {
            throw new Error(`API request failed: ${error}`);
        });
};

export { getClubApplies, postClubApply, postClubApplyPermit, postClubApplyDeny };
