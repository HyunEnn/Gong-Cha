import { serverAxios } from '@/apis/util/commons';

const server = serverAxios();

const url = '/users';

async function getProfileInfo(userId, success, fail) {
    await server.get(`${url}/${userId}/profile`).then(success).catch(fail);
}

async function getPlayScheduleList(userId, success, fail) {
    await server.get(`${url}/${userId}/group`).then(success).catch(fail);
}

export { getProfileInfo, getPlayScheduleList };
