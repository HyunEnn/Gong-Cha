import axios from 'axios';

const { VITE_BASE_URL } = import.meta.env;

// api axios instance
function serverAxios() {
    const instance = axios.create({
        baseURL: VITE_BASE_URL,
        withCredentials: true,
        credentials: "include",
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            "Authorization": `Bearer eyJhbGciOiJIUzI1NiJ9.eyJjYXRlZ29yeSI6ImFjY2VzcyIsInVzZXJJZCI6MSwidXNlckluZm8iOiJrYWthbyAzNDgzNDI4MDE4Iiwicm9sZSI6IlJPTEVfVVNFUiIsImlhdCI6MTcxNTkyMjAwMSwiZXhwIjoxNzE1OTI1NjAxfQ.u4vkOtZzV2eqsi9yBEYm0GlYpQolsn4CWoSIo_BYAnk`,
        },
    });

    return instance;
}

export { serverAxios };
