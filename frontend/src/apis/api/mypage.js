import { serverAxios } from '@util/commons';

const server = serverAxios();

const url = '/mypage';

async function getFunc(pk, success, fail) {
    await server.get(`${url}/getFunc/${pk}`).then(success).catch(fail);
}

export { getFunc };
