import axios from 'axios';

const { VITE_BASE_URL } = import.meta.env;

// api axios instance
function serverAxios() {
    const instance = axios.create({
        baseURL: VITE_BASE_URL,
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
    });

    return instance;
}

export { serverAxios };
