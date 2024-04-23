import axios from 'axios';

// api axios instance
function serverAxios() {
    const instance = axios.create({
        baseURL: process.env.REACT_APP_BASE_URL,
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
    });

    return instance;
}

export { serverAxios };
