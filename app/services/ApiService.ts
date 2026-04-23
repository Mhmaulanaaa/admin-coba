import axios from "axios";

let unauthorizedHandler: (() => void) | null = null;

export const setUnauthorizedHandler = (handler: () => void) => {
    unauthorizedHandler = handler;
};

export const api = axios.create({
    baseURL: "",
    headers: {
        Accept: "application/json",
    },
});

// ✅ REQUEST INTERCEPTOR (token)
api.interceptors.request.use((config) => {
    // ambil token dari localStorage / cookie
    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

// ✅ RESPONSE INTERCEPTOR
api.interceptors.response.use(
    (response) => response.data, // 🔥 langsung return data
    (error) => {
        if (error.response?.status === 401 && unauthorizedHandler) {
            unauthorizedHandler();
        }

        return Promise.reject(error.response || error);
    }
);