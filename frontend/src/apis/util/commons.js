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
            "Authorization": `Bearer eyJhbGciOiJIUzI1NiJ9.eyJjYXRlZ29yeSI6ImFjY2VzcyIsInVzZXJJZCI6NSwidXNlckluZm8iOiJrYWthbyAzNDcyMDIxNzM3Iiwicm9sZSI6IlJPTEVfVVNFUiIsImlhdCI6MTcxNTgzNjQxNCwiZXhwIjoxNzE1ODQwMDE0fQ.d4Sza0non6Y7FGUJkWK9pIVj9VdObjMaMSXyzwVQg94`,
        },
    });

    return instance;
}

export { serverAxios };
