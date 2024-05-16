import axios from 'axios';

const { VITE_BASE_URL } = import.meta.env;

// api axios instance
function serverAxios() {
    const instance = axios.create({
        baseURL: VITE_BASE_URL,
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJjYXRlZ29yeSI6ImFjY2VzcyIsInVzZXJJZCI6MywidXNlckluZm8iOiJrYWthbyAzNDgzNDI4MDE4Iiwicm9sZSI6IlJPTEVfVVNFUiIsImlhdCI6MTcxNTc4OTAzMCwiZXhwIjoxNzE1NzkyNjMwfQ.GxYbGd5JfNo5NNcEUv4-idcYv3iWm64gbNwUkR5sT2E`,
        },
    });

    return instance;
}

export { serverAxios };
