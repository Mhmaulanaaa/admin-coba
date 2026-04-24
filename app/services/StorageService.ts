export const useToken = () => {
    return useCookie<string | null>("token");
};

export const getToken = () => {
    return useToken().value;
};

export const setToken = (token: string) => {
    const cookie = useToken();
    cookie.value = token;
};

export const destroyToken = () => {
    const cookie = useToken();
    cookie.value = null;
};