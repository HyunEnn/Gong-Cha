import { serverAxios } from '@/apis/util/commons';

const server = serverAxios();

async function getTeamInfo(userId, success, fail) {
    await server.get(`http://k10b306.p.ssafy.io:8081/api/team`).then(success).catch(fail);
}

async function setTeamInfo(data, success, fail) {
    await server.post(`http://k10b306.p.ssafy.io:8081/api/team`, {data}).then(success).catch(fail);
}

export { getTeamInfo, setTeamInfo };
