import { getToken, destroyToken } from "~/services/StorageService";

export const useApi = () => {
    const config = useRuntimeConfig();

    const api = $fetch.create({
        baseURL: config.public.apiBase || 'http://127.0.0.1:8000/api',

        onRequest({ options }) {
            const token = getToken();

            if (token) {
                options.headers = {
                    ...(options.headers as any),
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                };
            }
        },

        onResponseError({ response }) {
            if (response.status === 401) {
                destroyToken();

                if (import.meta.client) {
                    navigateTo("/login");
                }
            }

            throw response._data || response;
        },
    });

    return api;
};