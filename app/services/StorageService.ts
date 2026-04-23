export const getToken = () => {
    return useCookie<string | null>("token").value;
};

export const setToken = (token: string) => {
    useCookie("token").value = token;
};

export const destroyToken = () => {
    useCookie("token").value = null;
};