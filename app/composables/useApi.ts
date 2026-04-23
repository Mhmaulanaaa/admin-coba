export const useApi = () => {
    const config = useRuntimeConfig();
    const token = useCookie<string | null>("token");

    const api = $fetch.create({
        baseURL: config.public.apiBase,

        // ✅ REQUEST INTERCEPTOR
        onRequest({ options }) {
            if (token.value) {
                options.headers = {
                    ...(options.headers as any),
                    Authorization: `Bearer ${token.value}`,
                    Accept: "application/json",
                };
            }
        },

        // ✅ RESPONSE SUCCESS
        onResponse({ response }) {
            return response._data; // 🔥 langsung return data (mirip axios interceptor kamu)
        },

        // ❌ ERROR HANDLING GLOBAL
        onResponseError({ response }) {
            if (response.status === 401) {
                // 🔥 token invalid / expired
                token.value = null;

                if (import.meta.client) {
                    navigateTo("/login");
                }
            }

            // lempar error biar bisa di-handle di component
            throw response._data || response;
        },
    });

    return api;
};