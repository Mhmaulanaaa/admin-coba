import { setToken, destroyToken } from "~/services/StorageService";

export const useAuth = () => {
    const user = useState<any>("user", () => null);

    const setAuth = (data: any) => {
        // ✅ simpan token (pastikan ini ke localStorage)
        setToken(data.token);

        // ✅ simpan user ke state
        user.value = data.user;
    };

    const logout = () => {
        destroyToken(); // hapus token dari localStorage
        user.value = null;

        // ✅ redirect
        navigateTo("/login");
    };

    return {
        user,
        setAuth,
        logout,
    };
};