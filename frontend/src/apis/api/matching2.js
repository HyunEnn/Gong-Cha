import { serverAxios } from '@/apis/util/commons';

const server = serverAxios();
const url = '/matching';

async function getMatchingList(success, fail) {
    await server.get(`${url}/matchList`).then(success).catch(fail);
}

export {
    getMatchingList,
};
