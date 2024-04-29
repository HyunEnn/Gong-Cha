import { serverAxios } from '@/apis/util/commons';

const server = serverAxios();

const url = '/playschedule';

async function getPlaySchedule(key, success, fail) {
    await server.get(`${url}/somelink/${key}`).then(success).catch(fail);
}

export { getPlaySchedule };
