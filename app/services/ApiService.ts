import axios from "axios";
import { getToken, destroyToken } from "~/services/StorageService";

let unauthorizedHandler: (() => void) | null = null;

export const setUnauthorizedHandler = (handler: () => void) => {
    unauthorizedHandler = handler;
};

export const api = axios.create({
    baseURL: "http://127.0.0.1:8000/api",
    headers: {
        Accept: "application/json",
    },
});

// ✅ REQUEST INTERCEPTOR
api.interceptors.request.use((config) => {
    const token = getToken(); // 🔥 pakai cookie sekarang

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

// ✅ RESPONSE INTERCEPTOR
api.interceptors.response.use(
    (response) => response.data,
    (error) => {
        if (error.response?.status === 401) {
            destroyToken();

            if (unauthorizedHandler) {
                unauthorizedHandler();
            }
        }

        return Promise.reject(error.response || error);
    }
);